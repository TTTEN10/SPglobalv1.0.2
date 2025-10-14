import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-white/70 backdrop-blur-sm border border-neutral-dark/20 hover:bg-white/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-black/20 dark:border-white/20 dark:hover:bg-black/30"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-text-primary dark:text-white" />
      ) : (
        <Sun className="w-5 h-5 text-text-primary dark:text-white" />
      )}
    </button>
  )
}

export default ThemeToggle
