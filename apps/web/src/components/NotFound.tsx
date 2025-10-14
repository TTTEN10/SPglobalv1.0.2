import React from 'react'
import { Home, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const NotFound: React.FC = () => {
  const navigate = useNavigate()

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
                  <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    404
                  </span>
                </h1>
              </div>

              {/* Error Message */}
              <div className="mb-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl text-heading mb-6">
                  Page Not Found
                </h2>
                <p className="text-xl text-body leading-relaxed max-w-2xl mx-auto">
                  The page you're looking for doesn't exist or has been moved. 
                  Let's get you back on track to finding the mental health support you need.
                </p>
              </div>


              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button 
                  onClick={() => navigate('/')}
                  className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Go Home
                </button>
                <button 
                  onClick={() => navigate(-1)}
                  className="btn-secondary text-lg px-8 py-4 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Go Back
                </button>
              </div>

              {/* Helpful Links */}
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-neutral-dark/20 dark:bg-black/30 dark:border-white/20">
                <h3 className="text-2xl text-heading mb-6">
                  <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    Popular Pages
                  </span>
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button 
                    onClick={() => navigate('/')}
                    className="text-body hover:text-primary-600 transition-colors p-3 rounded-lg hover:bg-white/50"
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => navigate('/about-us')}
                    className="text-body hover:text-primary-600 transition-colors p-3 rounded-lg hover:bg-white/50"
                  >
                    About Us
                  </button>
                  <button 
                    onClick={() => navigate('/contact-us')}
                    className="text-body hover:text-primary-600 transition-colors p-3 rounded-lg hover:bg-white/50"
                  >
                    Contact
                  </button>
                  <button 
                    onClick={() => navigate('/join-our-waitlist')}
                    className="text-body hover:text-primary-600 transition-colors p-3 rounded-lg hover:bg-white/50"
                  >
                    Join Waitlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default NotFound
