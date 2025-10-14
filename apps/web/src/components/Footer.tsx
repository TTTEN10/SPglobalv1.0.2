import React, { useState } from 'react'
import { Mail, Instagram, Linkedin, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import CookieManager from './CookieManager'

const Footer: React.FC = () => {
  const navigate = useNavigate()
  const [isCookieManagerOpen, setIsCookieManagerOpen] = useState(false)

  return (
    <footer>
      <div className="container-max section-padding py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4 md:col-span-2">
            <a
              href="https://www.safepsy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-16 hover:drop-shadow-lg transition-all duration-200"
            >
              <img src="/LogoTransparent1.png" alt="SafePsy Logo" className="h-16" />
            </a>
            <p className="text-text-primary font-titillium font-regular text-[1.1em]">
              Safe Online-Therapy
            </p>
          </div>

          {/* Contact Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-titillium font-semibold text-text-primary dark:text-white">Contact</h4>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/contact-us')}
                className="flex items-center gap-3 text-text-primary hover:text-primary-600 transition-colors font-titillium font-regular"
                aria-label="Contact us"
              >
                <Mail className="w-5 h-5 dark:text-white" />
                <span className="text-black dark:text-white hover:text-primary-600 transition-all duration-200">
                  Contact
                </span>
              </button>
              <button
                onClick={() => navigate('/join-our-waitlist')}
                className="flex items-center gap-3 text-text-primary hover:text-primary-600 transition-colors font-titillium font-regular"
                aria-label="Join our waitlist"
              >
                <Mail className="w-5 h-5 dark:text-white" />
                <span className="text-black dark:text-white hover:text-primary-600 transition-all duration-200">
                  Join Waitlist
                </span>
              </button>
              <a
                href="https://instagram.com/safepsy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text-primary hover:text-primary-600 transition-colors font-titillium font-regular"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5 dark:text-white" />
                <span className="dark:text-white">@safepsy</span>
              </a>
              <a
                href="https://linkedin.com/company/safepsy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text-primary hover:text-primary-600 transition-colors font-titillium font-regular"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin className="w-5 h-5 dark:text-white" />
                <span className="dark:text-white">SafePsy</span>
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-titillium font-semibold text-text-primary dark:text-white">Legal</h4>
            <div className="space-y-2">
              <p className="text-text-primary font-titillium font-regular">
                © 2025 SafePsy. All rights reserved.
              </p>
              <button 
                onClick={() => navigate('/sap-policy')}
                className="text-text-primary font-titillium font-regular hover:text-primary-600 transition-colors text-left block"
              >
                <span className="text-black dark:text-white hover:text-primary-600 transition-all duration-200">
                  Security and Privacy Policy
                </span>
              </button>
              <button 
                onClick={() => navigate('/cookies')}
                className="text-text-primary font-titillium font-regular hover:text-primary-600 transition-colors text-left block"
              >
                <span className="text-black dark:text-white hover:text-primary-600 transition-all duration-200">
                  Cookie Policy
                </span>
              </button>
              <button 
                onClick={() => setIsCookieManagerOpen(true)}
                className="flex items-center gap-2 text-text-primary font-titillium font-regular hover:text-primary-600 transition-colors text-left"
              >
                <Settings className="w-4 h-4 dark:text-white" />
                <span className="text-black dark:text-white hover:text-primary-600 transition-all duration-200">
                  Cookie Preferences
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-text-primary/20 dark:border-white/20 mt-8 pt-8 text-center">
          <p className="text-text-primary text-sm font-noto font-light">
            Built with privacy, security, and human-centered design.
          </p>
        </div>
      </div>
      
      {/* Cookie Manager Modal */}
      <CookieManager 
        isOpen={isCookieManagerOpen} 
        onClose={() => setIsCookieManagerOpen(false)} 
      />
    </footer>
  )
}

export default Footer
