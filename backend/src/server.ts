import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import Joi from 'joi'
import path from 'path'

// Load environment variables
dotenv.config()

const app = express()
const prisma = new PrismaClient()

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))

// Rate limiting for general API endpoints
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
})

// Specific rate limiting for email subscription endpoint
const subscriptionLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per minute
  message: {
    success: false,
    message: 'Too many subscription attempts. Please wait a minute before trying again.',
  },
  standardHeaders: true,
  legacyHeaders: false,
})

app.use('/api', generalLimiter)
app.use('/api/subscribe', subscriptionLimiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Static file serving
app.use(express.static(path.join(__dirname, '../public')))

// Waitlist validation schema
const waitlistSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
  fullName: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.min': 'Full name must be at least 2 characters',
      'string.max': 'Full name must be less than 100 characters',
      'any.required': 'Full name is required',
    }),
  role: Joi.string()
    .valid('client', 'therapist', 'partner')
    .required()
    .messages({
      'any.only': 'Role must be one of: client, therapist, partner',
      'any.required': 'Role is required',
    }),
  consentGiven: Joi.boolean()
    .valid(true)
    .required()
    .messages({
      'any.only': 'You must give consent to join our waitlist',
      'any.required': 'Consent is required',
    }),
})

// Contact form validation schema
const contactSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
  fullName: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.min': 'Full name must be at least 2 characters',
      'string.max': 'Full name must be less than 100 characters',
      'any.required': 'Full name is required',
    }),
  subject: Joi.string()
    .min(5)
    .max(200)
    .required()
    .messages({
      'string.min': 'Subject must be at least 5 characters',
      'string.max': 'Subject must be less than 200 characters',
      'any.required': 'Subject is required',
    }),
  message: Joi.string()
    .min(10)
    .max(2000)
    .required()
    .messages({
      'string.min': 'Message must be at least 10 characters',
      'string.max': 'Message must be less than 2000 characters',
      'any.required': 'Message is required',
    }),
})

// IP hashing utility with privacy by design (default OFF)
const hashIP = (ip: string): string => {
  const enabled = process.env.IP_HASHING_ENABLED === 'true'
  const salt = process.env.IP_SALT || 'default-privacy-salt-change-in-production'
  
  // If IP hashing is disabled (default), return a placeholder
  if (!enabled) {
    return 'IP_HASHING_DISABLED'
  }
  
  return crypto.createHash('sha256').update(ip + salt).digest('hex')
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Favicon endpoint
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/HeadsOnlyTransparent.png'))
})

// Subscribe endpoint
app.post('/api/subscribe', async (req, res) => {
  try {
    // Validate request body
    const { error, value } = waitlistSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      })
    }

    const { email, fullName, role, consentGiven } = value
    const clientIP = req.ip || req.connection.remoteAddress || 'unknown'
    const ipHash = hashIP(clientIP)
    const consentTimestamp = new Date()

    // Check if email already exists
    const existingSubscription = await prisma.emailSubscription.findUnique({
      where: { email },
    })

    if (existingSubscription) {
      return res.status(409).json({
        success: false,
        message: 'This email is already on our waitlist',
      })
    }

    // Create new subscription
    await prisma.emailSubscription.create({
      data: {
        email,
        fullName,
        role,
        ipHash,
        consentGiven,
        consentTimestamp,
      },
    })

    res.json({
      success: true,
      message: 'Thanks! We\'ll email you product updates.',
    })
  } catch (error) {
    console.error('Subscription error:', error)
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    })
  }
})

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  try {
    // Validate request body
    const { error, value } = contactSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      })
    }

    const { email, fullName, subject, message } = value
    const clientIP = req.ip || req.connection.remoteAddress || 'unknown'
    const ipHash = hashIP(clientIP)

    // Create new contact message
    await prisma.contactMessage.create({
      data: {
        email,
        fullName,
        subject,
        message,
        ipHash,
      },
    })

    res.json({
      success: true,
      message: 'Thank you for your message! We\'ll get back to you soon.',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    })
  }
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err)
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  })
})

const PORT = process.env.PORT || 3001

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...')
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...')
  await prisma.$disconnect()
  process.exit(0)
})

app.listen(PORT, () => {
  console.log(`🚀 SafePsy backend server running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
})

export default app
