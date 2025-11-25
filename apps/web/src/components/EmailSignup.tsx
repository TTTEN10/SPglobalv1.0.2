import React, { useState } from 'react'
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

interface SignupResponse {
  success: boolean
  message: string
}

const EmailSignup: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setStatus('error')
      setMessage('Enter your email address')
      return
    }

    if (!validateEmail(email)) {
      setStatus('error')
      setMessage('Enter your email address')
      return
    }

    setIsLoading(true)
    setStatus('idle')

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      })

      const data: SignupResponse = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        setMessage(data.message)
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="section-padding py-16 lg:py-20 bg-white/40 backdrop-blur-sm fade-in">
      <div className="container-max">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl text-heading stagger-item">
                Be the first to know
              </h2>
              <p className="text-xl text-body max-w-2xl mx-auto stagger-item">
                Join our waitlist to get early access to SafePsy and be part of the 
                privacy-first therapy revolution.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="space-y-4">
                <div className="relative">
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors duration-300 group-hover:text-primary-600" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="input-field pl-12 pr-4 hover:border-primary-400/50"
                      disabled={isLoading}
                      aria-describedby={status !== 'idle' ? 'status-message' : undefined}
                      aria-invalid={status === 'error'}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-transform duration-200"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Joining...
                    </>
                  ) : (
                    'Join Waitlist'
                  )}
                </button>
              </div>

              {/* Status Message */}
              {status !== 'idle' && (
                <div
                  id="status-message"
                  role="status"
                  aria-live="polite"
                  className={`mt-4 p-4 rounded-lg flex items-center gap-3 fade-in ${
                    status === 'success'
                      ? 'bg-primary-50 text-primary-800 border border-primary-200 animate-pulse'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {status === 'success' ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <span className="text-sm text-body font-medium">{message}</span>
                </div>
              )}
            </form>

            <p className="text-sm text-web-safe max-w-md mx-auto">
              We respect your privacy. Your email will only be used to notify you 
              about SafePsy updates and early access opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmailSignup
