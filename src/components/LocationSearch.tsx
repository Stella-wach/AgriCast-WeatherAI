import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, MapPin, Loader2 } from 'lucide-react'
import type { Language } from '../types/weather'

interface LocationSearchProps {
  language: Language
  loading: boolean
  darkMode: boolean
  onSearch: (query: string) => void
  onUseMyLocation: () => void
}

export default function LocationSearch({
  language,
  loading,
  darkMode,
  onSearch,
  onUseMyLocation,
}: LocationSearchProps) {
  const [input, setInput] = useState('')
  const [focused, setFocused] = useState(false)

  const labels = {
    en: {
      placeholder: 'Search city or region...',
      button: 'Search',
      myLocation: 'My Location',
      hint: 'Try: Nairobi, Kisumu, Eldoret, Bomet, Nakuru',
    },
    sw: {
      placeholder: 'Tafuta mji au mkoa...',
      button: 'Tafuta',
      myLocation: 'Mahali Pangu',
      hint: 'Jaribu: Nairobi, Kisumu, Eldoret, Bomet, Nakuru',
    },
  }

  const t = labels[language]

  const handleSubmit = () => {
    if (!input.trim()) return
    onSearch(input.trim())
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className={`rounded-2xl border p-3 transition-colors duration-300
        ${darkMode
          ? 'bg-gray-900/60 border-white/10 backdrop-blur-sm'
          : 'bg-white border-gray-200 shadow-sm'
        }`}
      >
        <div className="flex gap-2">

          {/* Input wrapper */}
          <motion.div
            animate={focused
              ? { boxShadow: '0 0 0 2px rgb(34 197 94 / 0.5)' }
              : { boxShadow: '0 0 0 0px transparent' }
            }
            className={`relative flex-1 rounded-xl overflow-hidden border transition-colors
              ${darkMode
                ? 'bg-gray-800 border-white/10'
                : 'bg-gray-50 border-gray-200'
              }`}
          >
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4
              ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}
            />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={t.placeholder}
              disabled={loading}
              className={`w-full pl-9 pr-8 py-2.5 text-sm bg-transparent
                          focus:outline-none disabled:opacity-50 transition-colors
                ${darkMode
                  ? 'text-white placeholder-gray-500'
                  : 'text-gray-800 placeholder-gray-400'
                }`}
            />
            <AnimatePresence>
              {input && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setInput('')}
                  className={`absolute right-2.5 top-1/2 -translate-y-1/2
                    ${darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <X className="w-3.5 h-3.5" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Search button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            disabled={loading || !input.trim()}
            className="bg-green-600 hover:bg-green-500 disabled:opacity-40
                       disabled:cursor-not-allowed text-white px-4 py-2.5
                       rounded-xl text-sm font-semibold transition-colors
                       flex items-center gap-1.5 flex-shrink-0"
          >
            {loading
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : <Search className="w-4 h-4" />
            }
            <span className="hidden sm:inline">{t.button}</span>
          </motion.button>

          {/* My location button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onUseMyLocation}
            disabled={loading}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl
                        text-sm font-semibold border transition-colors
                        disabled:opacity-40 flex-shrink-0
              ${darkMode
                ? 'bg-emerald-900/40 border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/60'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
              }`}
          >
            <MapPin className="w-4 h-4" />
            <span className="hidden sm:inline">{t.myLocation}</span>
          </motion.button>
        </div>

        {/* Hint */}
        <p className={`text-xs mt-2 pl-1
          ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
          {t.hint}
        </p>
      </div>
    </motion.div>
  )
}