import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

interface HeaderProps {
  showBackButton?: boolean
  showTagline?: boolean
}

const Header: React.FC<HeaderProps> = ({ 
  showBackButton = false, 
  showTagline = false 
}) => {
  const navigate = useNavigate()

  return (
    <header className="max-w-6xl mx-auto w-full px-6 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-heading text-lg">
          <a href="https://www.safepsy.com" target="_blank" rel="noopener noreferrer" className="h-12 transition-all duration-200">
            <img src="/LogoTransparent1.png" alt="SafePsy Logo" className="h-12 hover:drop-shadow-lg" />
          </a>
        </div>
        
        {showTagline && (
          <p className="text-[1.1em] text-web-safe hidden sm:block">
            Safe Online-Therapy
          </p>
        )}
        
        <div className="flex items-center gap-4">
          {showBackButton && (
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-[1.1em] text-web-safe hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header
