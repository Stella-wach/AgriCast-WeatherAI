import { motion } from 'framer-motion'
import { Droplets, Wind } from 'lucide-react'
import type { DailyForecast, Language } from '../types/weather'

interface ForecastStripProps {
  forecast: DailyForecast[]
  language: Language
  darkMode: boolean
}

const WMO_EMOJI: Record<string, string> = {
  'Clear sky': '☀️',
  'Mainly clear': '🌤️',
  'Partly cloudy': '⛅',
  'Overcast': '☁️',
  'Foggy': '🌫️',
  'Icy fog': '🌫️',
  'Light drizzle': '🌦️',
  'Moderate drizzle': '🌦️',
  'Heavy drizzle': '🌧️',
  'Slight rain': '🌧️',
  'Moderate rain': '🌧️',
  'Heavy rain': '🌧️',
  'Slight snow': '🌨️',
  'Moderate snow': '🌨️',
  'Heavy snow': '❄️',
  'Slight showers': '🌦️',
  'Moderate showers': '🌧️',
  'Heavy showers': '⛈️',
  'Thunderstorm': '⛈️',
  'Thunderstorm with hail': '⛈️',
  'Thunderstorm with heavy hail': '⛈️',
}

function getEmoji(description: string): string {
  return WMO_EMOJI[description] ?? '🌤️'
}

function getRainColor(prob: number, darkMode: boolean): string {
  if (prob >= 70) return darkMode ? 'text-blue-400 font-bold' : 'text-blue-600 font-bold'
  if (prob >= 40) return darkMode ? 'text-blue-500' : 'text-blue-400'
  return darkMode ? 'text-gray-600' : 'text-gray-300'
}

export default function ForecastStrip({
  forecast,
  language,
  darkMode,
}: ForecastStripProps) {
  const labels = {
    en: { title: '7-Day Forecast' },
    sw: { title: 'Utabiri wa Siku 7' },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-3"
    >
      <h2 className={`text-xs font-bold uppercase tracking-widest px-1
        ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
        {labels[language].title}
      </h2>

      {/* Scrollable strip */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide
                      -mx-4 px-4 sm:mx-0 sm:px-0">
        {forecast.map((day, index) => (
          <motion.div
            key={day.date}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`flex-shrink-0 rounded-2xl border p-4 min-w-[100px]
                        flex flex-col items-center gap-2 transition-all duration-300
              ${index === 0
                ? darkMode
                  ? 'bg-green-900/40 border-green-500/40 shadow-lg shadow-green-900/20'
                  : 'bg-green-50 border-green-300 shadow-md shadow-green-100'
                : darkMode
                  ? 'bg-gray-900/60 border-white/8 backdrop-blur-sm hover:border-white/20'
                  : 'bg-white border-gray-100 shadow-sm hover:shadow-md'
              }`}
          >
            {/* Day name */}
            <p className={`text-xs font-black uppercase tracking-wider
              ${index === 0
                ? 'text-green-500'
                : darkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
              {day.day_name}
            </p>

            {/* Weather emoji */}
            <motion.span
              className="text-3xl leading-none"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
            >
              {getEmoji(day.description)}
            </motion.span>

            {/* Temp range */}
            <div className="text-center">
              <p className={`text-base font-black
                ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {Math.round(day.temp_max)}°
              </p>
              <p className={`text-xs font-medium
                ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>
                {Math.round(day.temp_min)}°
              </p>
            </div>

            {/* Rain probability */}
            <div className={`flex items-center gap-1 text-xs
              ${getRainColor(day.precipitation_probability, darkMode)}`}>
              <Droplets className="w-3 h-3" />
              <span>{Math.round(day.precipitation_probability)}%</span>
            </div>

            {/* Wind */}
            {day.wind_speed > 0 && (
              <div className={`flex items-center gap-1 text-xs
                ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>
                <Wind className="w-3 h-3" />
                <span>{Math.round(day.wind_speed)}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}