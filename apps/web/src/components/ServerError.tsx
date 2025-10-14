import React from 'react'
import { Home, RefreshCw, AlertTriangle, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const ServerError: React.FC = () => {
  const navigate = useNavigate()

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header showBackButton={true} />

      {/* Main Content */}
      <main className="flex-1">
        <section className="section-padding py-8 lg:py-12">
          <div className="container-max">
            {/* Error Content */}
            <div className="text-center max-w-4xl mx-auto">
              {/* Error Code */}
              <div className="mb-8">
                <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-bold text-heading leading-none">
                  <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                    500
                  </span>
                </h1>
              </div>

              {/* Error Message */}
              <div className="mb-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl text-heading mb-6">
                  Internal Server Error
                </h2>
                <p className="text-xl text-body leading-relaxed max-w-2xl mx-auto">
                  Something went wrong on our end. We're working to fix this issue and get you back to your mental health journey as soon as possible.
                </p>
              </div>

              {/* Visual Element */}
              <div className="mb-12">
                <div className="w-32 h-32 mx-auto bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-neutral-dark/20 dark:bg-black/30 dark:border-white/20">
                  <AlertTriangle className="w-16 h-16 text-red-600" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button 
                  onClick={handleRefresh}
                  className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Try Again
                </button>
                <button 
                  onClick={() => navigate('/')}
                  className="btn-secondary text-lg px-8 py-4 flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Go Home
                </button>
              </div>

              {/* Help Section */}
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-neutral-dark/20 dark:bg-black/30 dark:border-white/20">
                <h3 className="text-2xl text-heading mb-6">
                  <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    Need Help?
                  </span>
                </h3>
                <p className="text-body mb-6 max-w-2xl mx-auto">
                  If this problem persists, please don't hesitate to reach out to our support team. 
                  We're here to help you access the mental health support you need.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => navigate('/contact-us')}
                    className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Contact Support
                  </button>
                  <button 
                    onClick={() => navigate('/join-our-waitlist')}
                    className="btn-secondary text-lg px-8 py-4"
                  >
                    Join Our Waitlist
                  </button>
                </div>
              </div>

              {/* Status Information */}
              <div className="mt-8 text-sm text-body opacity-75">
                <p>Error Code: 500 - Internal Server Error</p>
                <p>Timestamp: {new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default ServerError
