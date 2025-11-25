import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
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
    <header className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-2 sm:py-3 fade-in">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 text-heading text-base sm:text-lg">
          <Link to="/" className="h-10 sm:h-12 transition-all duration-300 min-h-[44px] flex items-center group">
            <img src="/LogoTransparent1.png" alt="SafePsy Logo" className="h-10 sm:h-12 transition-all duration-300 group-hover:drop-shadow-lg group-hover:scale-105" />
          </Link>
        </div>
        
        {showTagline && (
          <p className="text-sm sm:text-[1.1em] text-web-safe hidden md:block fade-in">
            Safe Online-Therapy
          </p>
        )}
        
        <div className="flex items-center gap-2 sm:gap-4">
          {showBackButton && (
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-1 sm:gap-2 text-sm sm:text-[1.1em] text-web-safe hover:text-primary-600 transition-all duration-300 min-h-[44px] min-w-[44px] px-2 sm:px-0 group hover:scale-105 active:scale-95"
              aria-label="Back to Home"
            >
              <ArrowLeft className="w-4 h-4 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="hidden sm:inline">Back to Home</span>
            </button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header
