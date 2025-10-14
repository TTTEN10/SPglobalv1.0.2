import React from 'react'
import { Shield, Heart, Users, Brain, Lock, Globe } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const AboutUs: React.FC = () => {
  const navigate = useNavigate()
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
                <span className="text-[1.08em]">About</span>{' '}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent text-[1.2em] font-bold">
                  SafePsy
                </span>
              </h1>
            </div>

            {/* Mission Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 lg:p-16 shadow-lg border border-neutral-dark/20 dark:bg-black/30 dark:border-white/20 mb-16">
              <h2 className="text-3xl lg:text-4xl text-heading mb-8 text-center">
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Our Mission
                </span>
              </h2>
              <p className="text-xl text-body leading-relaxed text-center max-w-4xl mx-auto whitespace-nowrap">
                Safepsy is building a global ecosystem of safe mental health care compliant with APA and HIPAA standards.
              </p>
              <p className="text-xl text-body leading-relaxed text-center max-w-4xl mx-auto whitespace-nowrap">
                We aim to make psychotherapy accessible to everyone, everywhere, without compromising on privacy or quality.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center border border-primary-200 dark:bg-primary-900/30 dark:border-primary-700">
                  <Shield className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl text-heading">Secure</h3>
                <p className="text-body">
                  Security is the foundation of SafePsy's ecosystem: Every session, transaction, and data exchange is encrypted and verified. Users maintain full control of their personal information, no third party can access private data.
                </p>
              </div>
              
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 mx-auto bg-secondary-100 rounded-full flex items-center justify-center border border-secondary-200 dark:bg-secondary-900/30 dark:border-secondary-700">
                  <Heart className="w-8 h-8 text-secondary-600 dark:text-secondary-400" />
                </div>
                <h3 className="text-xl text-heading">Ethical</h3>
                <p className="text-body">
                  In adequacy with APA guidelines and psychologists deontology, we uphold the highest standards of professional ethics in mental health online services.
                </p>
              </div>
              
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 mx-auto bg-accent-100 rounded-full flex items-center justify-center border border-accent-200 dark:bg-accent-900/30 dark:border-accent-700">
                  <Users className="w-8 h-8 text-accent-600 dark:text-accent-400" />
                </div>
                <h3 className="text-xl text-heading">Human-centered</h3>
                <p className="text-body">
                  At SafePsy, technology serves people, not the other way around. Human dignity and care are at the heart of everything we build.
                </p>
              </div>
            </div>

            {/* Technology Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 lg:p-16 shadow-lg border border-neutral-dark/20 dark:bg-black/30 dark:border-white/20 mb-16">
              <h2 className="text-3xl lg:text-4xl text-heading mb-12 text-center">
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Our Technology
                </span>
              </h2>
              <p className="text-lg text-body leading-relaxed text-center max-w-4xl mx-auto mb-12">
                SafePsy integrates artificial intelligence, blockchain, and secure digital identity to transform the way therapy and mental health support are delivered worldwide. Users control their own data through decentralized identity, verified directly on the blockchain, ensuring privacy and compliance at every step. An AI-powered therapy assistant provides immediate support, helping users prepare for sessions, reflect between appointments, and access guidance in moments of need.
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-4 text-center">
                  <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center border border-primary-200 dark:bg-primary-900/30 dark:border-primary-700">
                    <Brain className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl text-heading">AI-Powered</h3>
                  <p className="text-body">
                    Our AI assistant don't use your data for training, it evolves through psychology-informed training. It helps users prepare, reflect, and complement human psychologists.
                  </p>
                </div>
                
                <div className="space-y-4 text-center">
                  <div className="w-16 h-16 mx-auto bg-secondary-100 rounded-full flex items-center justify-center border border-secondary-200 dark:bg-secondary-900/30 dark:border-secondary-700">
                    <Lock className="w-8 h-8 text-secondary-600 dark:text-secondary-400" />
                  </div>
                  <h3 className="text-xl text-heading">Blockchain Security</h3>
                  <p className="text-body">
                    The backbone of our security: it guarantees transparency and trust with Decentralized identity and ensures users own and control their data.
                  </p>
                </div>
                
                <div className="space-y-4 text-center">
                  <div className="w-16 h-16 mx-auto bg-accent-100 rounded-full flex items-center justify-center border border-accent-200 dark:bg-accent-900/30 dark:border-accent-700">
                    <Globe className="w-8 h-8 text-accent-600 dark:text-accent-400" />
                  </div>
                  <h3 className="text-xl text-heading">Global Access</h3>
                  <p className="text-body">
                    Both psychologists and patients can use the platform from anywhere in the world with our accessible pricing.
                  </p>
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 lg:p-16 shadow-lg border border-neutral-dark/20 dark:bg-black/30 dark:border-white/20 mb-16">
              <h2 className="text-3xl lg:text-4xl text-heading mb-8 text-center">
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Our Team
                </span>
              </h2>
              <p className="text-lg text-body leading-relaxed text-center max-w-4xl mx-auto mb-12">
                Safepsy's team gather professionals with a shared purpose: to redefine mental health care for the digital era in a safe and adequate environment.
              </p>
              
              {/* Team Members */}
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Co-Founder 1 */}
                <div className="text-center space-y-4">
                  <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden">
                    <img 
                      src="/ManAvatar.png" 
                      alt="Co-Founder, CEO & CTO" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-heading">
                    Thibaut TENENBAUM
                  </h3>
                  <p className="text-body">
                    Ergonomist & Work Psychologist
                  </p>
                  <p className="text-body italic">
                    Specialized in work systems, blockchain & AI.
                  </p>
                </div>
                
                {/* Co-Founder 2 */}
                <div className="text-center space-y-4">
                  <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden">
                    <img 
                      src="/WomanAvatar.png" 
                      alt="Co-Founder, CMO, CPRO" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-heading">
                    Polina TENENBAUM
                  </h3>
                  <p className="text-body">
                    Work Psychologist & Ergonomist
                  </p>
                  <p className="text-body italic">
                    Specialized in psychometric assessments & counsel.
                  </p>
                </div>
              </div>
            </div>


            {/* Call to Action */}
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl text-heading mb-6">
                Ready to Experience the Future of Mental Health Care?
              </h2>
              <p className="text-lg text-body mb-8 max-w-2xl mx-auto">
                Join our waitlist to be among the first to experience safe online-therapy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => navigate('/')}
                  className="btn-primary text-lg px-8 py-4"
                >
                  Join Our Waitlist
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default AboutUs
