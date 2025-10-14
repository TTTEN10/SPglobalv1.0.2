import React from 'react'
import { Shield, Heart, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Hero: React.FC = () => {
  const navigate = useNavigate()

  return (
    <section className="section-padding py-8 lg:py-12">
      <div className="container-max">
        {/* Main Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12">
          {/* Left Column - Headline */}
          <div className="space-y-8 order-1 lg:order-1">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-heading leading-tight text-center font-normal">
                <div>Transforming</div>
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent text-[1.32em] font-bold">
                  Online-Therapy
                </div>
                <div>with Ethical AI, Secured by Blockchain</div>
              </h1>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/join-our-waitlist')}
                className="btn-primary text-lg px-8 py-4"
              >
                Join Our Waitlist
              </button>
              <button 
                onClick={() => navigate('/about-us')}
                className="btn-secondary text-lg px-8 py-4"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative order-2 lg:order-2">
            <div className="rounded-3xl overflow-hidden h-[280px] sm:h-[320px] md:h-[360px] lg:h-[450px] flex items-center justify-center">
              <img 
                src="/HeroTheme1.png" 
                alt="SafePsy Platform Interface" 
                className="w-[90%] h-[90%] object-contain rounded-3xl"
              />
            </div>
          </div>
        </div>

        {/* Mission Statement Section */}
        <div className="text-center py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-body leading-relaxed space-y-3 italic">
              <div className="text-3xl lg:text-4xl">
                "The future of mental health depends on technology
              </div>
              <div className="text-3xl lg:text-4xl">
                that is both{' '}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent font-bold">
                  safe{' '}
                </span>
                and{' '}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent font-bold">
                  user-controlled{' '}
                </span>
                ."
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="text-center py-16">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 lg:p-16 shadow-lg border border-neutral-dark/20 dark:bg-black/30 dark:border-white/20">
            <h2 className="text-4xl lg:text-5xl text-heading mb-8">
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Secure. Ethical. Human-centered.
              </span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center border border-primary-200 dark:bg-primary-900/30 dark:border-primary-700">
                  <Shield className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl text-heading">Secure</h3>
                <p className="text-body">
                  End-to-end encryption and blockchain technology ensure your privacy and data security
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-secondary-100 rounded-full flex items-center justify-center border border-secondary-200 dark:bg-secondary-900/30 dark:border-secondary-700">
                  <Heart className="w-8 h-8 text-secondary-600 dark:text-secondary-400" />
                </div>
                <h3 className="text-xl text-heading">Ethical</h3>
                <p className="text-body">
                  Compliant with APA and HIPAA guidelines, made by psychologists to protect patients
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-accent-100 rounded-full flex items-center justify-center border border-accent-200 dark:bg-accent-900/30 dark:border-accent-700">
                  <Users className="w-8 h-8 text-accent-600 dark:text-accent-400" />
                </div>
                <h3 className="text-xl text-heading">Human-centered</h3>
                <p className="text-body">
                  Enhanced interface and pricing to enable global mental health accessibility
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero
