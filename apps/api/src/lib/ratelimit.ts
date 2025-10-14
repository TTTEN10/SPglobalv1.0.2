import rateLimit from 'express-rate-limit'

// General rate limiting for API endpoints
export const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
})

// Specific rate limiting for email subscription endpoint
export const subscriptionRateLimitMiddleware = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per minute
  message: {
    success: false,
    message: 'Too many subscription attempts. Please wait a minute before trying again.',
  },
  standardHeaders: true,
  legacyHeaders: false,
})
