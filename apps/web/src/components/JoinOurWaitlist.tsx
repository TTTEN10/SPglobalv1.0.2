import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import Header from './Header'
import Footer from './Footer'

interface SignupResponse {
  success: boolean
  message: string
}

const JoinOurWaitlist: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    consentGiven: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      setStatus('error')
      setMessage('Please enter your full name')
      return false
    }
    if (!formData.email.trim()) {
      setStatus('error')
      setMessage('Please enter your email address')
      return false
    }
    if (!formData.role) {
      setStatus('error')
      setMessage('Please select your role')
      return false
    }
    if (!formData.consentGiven) {
      setStatus('error')
      setMessage('You must give consent to join our waitlist')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    setStatus('idle')

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          role: formData.role,
          consentGiven: formData.consentGiven
        }),
      })

      const data: SignupResponse = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        setMessage(data.message)
        setFormData({
          fullName: '',
          email: '',
          role: '',
          consentGiven: false
        })
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
    <div className="min-h-screen flex flex-col">
      <Header showBackButton={true} />

      {/* Main Content */}
      <main className="flex-1">
        <section className="section-padding py-8 lg:py-12">
          <div className="container-max">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-heading leading-tight mb-6">
                <span className="text-[1.08em]">Join our</span>{' '}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent text-[1.2em] font-bold">
                  Waitlist
                </span>
              </h1>
              <p className="text-xl text-body leading-relaxed max-w-3xl mx-auto">
                Join our waitlist to be among the first to experience safe online-therapy.
              </p>
            </div>

            {/* Waitlist Form */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-lg border border-neutral-dark/20 dark:bg-black/30 dark:border-white/20 mb-16">
              <h2 className="text-2xl lg:text-3xl text-heading mb-8 text-center">
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Get early access and exclusive updates.
                </span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="block text-lg font-medium text-heading">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      className="w-full px-4 py-3 text-lg border-2 border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm disabled:opacity-50"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-lg font-medium text-heading">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      className="w-full px-4 py-3 text-lg border-2 border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm disabled:opacity-50"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="role" className="block text-lg font-medium text-heading">
                      I am a... *
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      className="w-full px-4 py-3 text-lg border-2 border-neutral-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm disabled:opacity-50"
                    >
                      <option value="">Select your role</option>
                      <option value="client">Client (seeking therapy)</option>
                      <option value="therapist">Therapist (providing therapy)</option>
                      <option value="partner">Partner (organization/healthcare provider)</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="consentGiven"
                        name="consentGiven"
                        checked={formData.consentGiven}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        className="mt-1 w-5 h-5 text-primary-600 border-2 border-neutral-300 rounded focus:ring-primary-500 focus:ring-2 disabled:opacity-50"
                      />
                      <label htmlFor="consentGiven" className="text-sm text-body leading-relaxed">
                        I consent to SafePsy collecting and processing my personal data for the purpose of joining the waitlist and receiving product updates. I have read and agree to the{' '}
                        <Link 
                          to="/sap-policy" 
                          className="text-primary-600 hover:text-primary-700 underline font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Security and Privacy Policy
                        </Link>
                        . *
                      </label>
                    </div>
                  </div>
                </div>

                {/* Status Message */}
                {status !== 'idle' && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`p-4 rounded-lg flex items-center gap-3 ${
                      status === 'success'
                        ? 'bg-primary-50 text-primary-800 border border-primary-200 dark:bg-primary-900/20 dark:text-primary-300 dark:border-primary-500/50'
                        : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-500/50'
                    }`}
                  >
                    {status === 'success' ? (
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    )}
                    <span className="text-sm font-medium">{message}</span>
                  </div>
                )}
                
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold text-lg px-12 py-4 rounded-xl hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-4 focus:ring-primary-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mx-auto"
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
              </form>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default JoinOurWaitlist
