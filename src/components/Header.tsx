import { motion } from 'framer-motion'
import { Leaf, MapPin, RefreshCw, Sun, Moon, Globe } from 'lucide-react'
import type { Language } from '../types/weather'

interface HeaderProps {
  locationName: string
  country: string
  language: Language
  loading: boolean
  darkMode: boolean
  onLanguageToggle: () => void
  onRefresh: () => void
  onThemeToggle: () => void
}

export default function Header({
  locationName,
  country,
  language,
  loading,
  darkMode,
  onLanguageToggle,
  onRefresh,
  onThemeToggle,
}: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-40 backdrop-blur-md transition-colors duration-300
  ${darkMode
    ? 'bg-[#060d09]/80 border-b border-green-900/40'
    : 'bg-white/80 border-b border-gray-200'
  }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500
                         to-emerald-600 flex items-center justify-center shadow-lg"
            >
              <Leaf className="w-5 h-5 text-white" />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className={`text-lg font-black tracking-tight
                ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                AgriCast
              </h1>
              <p className={`text-xs leading-none
                ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {language === 'en' ? 'Smart Farming Weather' : 'Hali ya Hewa kwa Wakulima'}
              </p>
            </div>
          </div>

          {/* Location */}
          {locationName && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5
                          rounded-full border text-sm flex-1 max-w-xs
                ${darkMode
                  ? 'bg-white/5 border-white/10 text-gray-300'
                  : 'bg-gray-50 border-gray-200 text-gray-600'
                }`}
            >
              <MapPin className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
              <span className="truncate text-xs font-medium">
                {locationName}{country ? `, ${country}` : ''}
              </span>
            </motion.div>
          )}

          {/* Controls */}
          <div className="flex items-center gap-2">

            {/* Language toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLanguageToggle}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                          text-xs font-semibold border transition-colors
                ${darkMode
                  ? 'bg-white/10 border-white/10 text-gray-300 hover:bg-white/20'
                  : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
                }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'SW' : 'EN'}</span>
            </motion.button>

            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onThemeToggle}
              className={`p-2 rounded-xl border transition-colors
                ${darkMode
                  ? 'bg-white/10 border-white/10 text-yellow-400 hover:bg-white/20'
                  : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {darkMode
                ? <Sun className="w-4 h-4" />
                : <Moon className="w-4 h-4" />
              }
            </motion.button>

            {/* Refresh */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRefresh}
              disabled={loading}
              className={`p-2 rounded-xl border transition-colors disabled:opacity-40
                ${darkMode
                  ? 'bg-white/10 border-white/10 text-gray-300 hover:bg-white/20'
                  : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
                }`}
            >
              <motion.div
                animate={loading ? { rotate: 360 } : { rotate: 0 }}
                transition={loading
                  ? { duration: 1, repeat: Infinity, ease: 'linear' }
                  : {}
                }
              >
                <RefreshCw className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile location */}
        {locationName && (
          <div className={`flex md:hidden items-center gap-1.5 mt-2 text-xs
            ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <MapPin className="w-3 h-3 text-green-500" />
            <span className="truncate">
              {locationName}{country ? `, ${country}` : ''}
            </span>
          </div>
        )}
      </div>
    </motion.header>
  )
}