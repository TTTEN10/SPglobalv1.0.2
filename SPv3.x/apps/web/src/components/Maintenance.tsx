import React from 'react'
import { Wrench, Clock, Mail, Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Maintenance: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col">
      <Header showBackButton={false} />

      {/* Main Content */}
      <main className="flex-1">
        <section className="section-padding py-8 lg:py-12">
          <div className="container-max">
            {/* Maintenance Content */}
            <div className="text-center max-w-4xl mx-auto">
              {/* Maintenance Icon */}
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-neutral-dark/20 dark:bg-black/30 dark:border-white/20">
                  <Wrench className="w-16 h-16 text-primary-600" />
                </div>
              </div>

              {/* Maintenance Message */}
              <div className="mb-12">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl text-heading mb-6">
                  <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    We're Improving
                  </span>
                </h1>
                <h2 className="text-2xl sm:text-3xl text-heading mb-6">
                  SafePsy is temporarily under maintenance
                </h2>
                <p className="text-xl text-body leading-relaxed max-w-3xl mx-auto">
                  We're working hard to enhance your mental health experience with new features, 
                  improved security, and better performance. We'll be back online shortly.
                </p>
              </div>

              {/* Status Card */}
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-neutral-dark/20 dark:bg-black/30 dark:border-white/20 mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-primary-600" />
                  <h3 className="text-2xl text-heading">Maintenance Status</h3>
                </div>
                <div className="space-y-4 text-left max-w-2xl mx-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-body">System updates in progress</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-body">Security enhancements being applied</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-body">Performance optimizations underway</span>
                  </div>
                </div>
              </div>

              {/* What We're Working On */}
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-neutral-dark/20 dark:bg-black/30 dark:border-white/20 mb-12">
                <h3 className="text-2xl text-heading mb-6">
                  <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    What We're Working On
                  </span>
                </h3>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-heading">Enhanced Security</h4>
                    <p className="text-body">
                      Upgrading our blockchain infrastructure and encryption protocols to ensure your privacy and data security.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-heading">AI Improvements</h4>
                    <p className="text-body">
                      Enhancing our AI therapy assistant with new capabilities and more personalized support features.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-heading">User Experience</h4>
                    <p className="text-body">
                      Improving the interface and adding new features to make your therapy sessions more effective.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-heading">Global Access</h4>
                    <p className="text-body">
                      Expanding our services to reach more people worldwide who need mental health support.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-neutral-dark/20 dark:bg-black/30 dark:border-white/20 mb-12">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Heart className="w-6 h-6 text-secondary-600" />
                  <h3 className="text-2xl text-heading">Stay Connected</h3>
                </div>
                <p className="text-body mb-6 max-w-2xl mx-auto">
                  While we work on these improvements, you can still reach out to us. 
                  We're here to support your mental health journey, even during maintenance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => navigate('/contact-us')}
                    className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Contact Us
                  </button>
                  <button 
                    onClick={() => navigate('/join-our-waitlist')}
                    className="btn-secondary text-lg px-8 py-4"
                  >
                    Join Our Waitlist
                  </button>
                </div>
              </div>

              {/* Estimated Time */}
              <div className="text-center">
                <p className="text-body text-lg mb-2">
                  <strong>Estimated completion time:</strong>
                </p>
                <p className="text-primary-600 font-semibold text-xl">
                  Usually within 2-4 hours
                </p>
                <p className="text-sm text-body opacity-75 mt-4">
                  We'll notify you as soon as we're back online
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Maintenance
