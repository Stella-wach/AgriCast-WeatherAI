import { motion } from 'framer-motion'
import { Droplets, Wind, Eye, Gauge, Sun, Thermometer } from 'lucide-react'
import type { CurrentWeather, Language } from '../types/weather'

interface CurrentConditionsProps {
  current: CurrentWeather
  language: Language
  darkMode: boolean
}

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string
  sub?: string
  darkMode: boolean
  delay?: number
}

function StatCard({ icon, label, value, sub, darkMode, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={`rounded-2xl p-4 border transition-colors duration-300
        ${darkMode
          ? 'bg-gray-900/60 border-white/10 backdrop-blur-sm'
          : 'bg-white border-gray-100 shadow-sm'
        }`}
    >
      <div className="flex items-center justify-between mb-3">
        <p className={`text-xs font-semibold uppercase tracking-wider
          ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          {label}
        </p>
        <div className={`p-2 rounded-xl
          ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
          {icon}
        </div>
      </div>
      <p className={`text-2xl font-bold
        ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {value}
      </p>
      {sub && (
        <p className={`text-xs mt-1
          ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          {sub}
        </p>
      )}
    </motion.div>
  )
}

// Weather condition → Unsplash background
function getWeatherBg(description: string): string {
  const d = description.toLowerCase()
  if (d.includes('thunder')) return 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=800&auto=format&fit=crop'
  if (d.includes('rain') || d.includes('drizzle') || d.includes('shower')) return 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=800&auto=format&fit=crop'
  if (d.includes('fog')) return 'https://images.unsplash.com/photo-1487621167305-5d248087c724?w=800&auto=format&fit=crop'
  if (d.includes('overcast') || d.includes('cloudy')) return 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&auto=format&fit=crop'
  if (d.includes('clear') || d.includes('sunny')) return 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=800&auto=format&fit=crop'
  return 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop'
}

function getWindDirection(dir: string): string {
  const deg = parseFloat(dir)
  if (isNaN(deg)) return dir || ''
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return dirs[Math.round(deg / 45) % 8]
}

function getUVLabel(uv: number, lang: Language): string {
  const labels = {
    en: ['Low', 'Low', 'Low', 'Moderate', 'Moderate', 'Moderate', 'High', 'High', 'Very High', 'Very High', 'Extreme'],
    sw: ['Chini', 'Chini', 'Chini', 'Wastani', 'Wastani', 'Wastani', 'Juu', 'Juu', 'Juu Sana', 'Juu Sana', 'Hatari'],
  }
  return labels[lang][Math.min(Math.floor(uv), 10)] ?? labels[lang][0]
}

export default function CurrentConditions({
  current,
  language,
  darkMode,
}: CurrentConditionsProps) {
  const labels = {
    en: {
      title: 'Current Conditions',
      temperature: 'Temperature',
      feelsLike: 'Feels like',
      humidity: 'Humidity',
      wind: 'Wind',
      visibility: 'Visibility',
      pressure: 'Pressure',
      uvIndex: 'UV Index',
    },
    sw: {
      title: 'Hali ya Sasa',
      temperature: 'Joto',
      feelsLike: 'Inahisi kama',
      humidity: 'Unyevu',
      wind: 'Upepo',
      visibility: 'Uwazi',
      pressure: 'Shinikizo',
      uvIndex: 'Kiwango cha UV',
    },
  }

  const t = labels[language]
  const bgImage = getWeatherBg(current.description)

  return (
    <div className="space-y-3">
      <motion.h2
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className={`text-xs font-bold uppercase tracking-widest px-1
          ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}
      >
        {t.title}
      </motion.h2>

      {/* Hero temperature card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl overflow-hidden min-h-[200px] flex items-end"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%),
            url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Glass overlay top-right */}
        <div className="absolute top-4 right-4">
          <div className="bg-black/30 backdrop-blur-md rounded-2xl px-3 py-2 border border-white/20">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-orange-300" />
              <span className="text-white text-sm font-semibold">
                {t.feelsLike} {Math.round(current.feels_like)}°C
              </span>
            </div>
          </div>
        </div>

        {/* Bottom content */}
        <div className="relative z-10 p-5 w-full">
          <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">
            {t.temperature}
          </p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-7xl font-black text-white leading-none">
                {Math.round(current.temp)}°
              </p>
              <p className="text-white/80 text-base mt-2 capitalize font-medium">
                {current.description}
              </p>
            </div>

            {/* Humidity pill */}
            <div className="flex flex-col gap-2 items-end">
              <div className="bg-blue-500/30 backdrop-blur-sm border border-blue-400/30
                              rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-blue-300" />
                <span className="text-blue-200 text-sm font-semibold">{current.humidity}%</span>
              </div>
              <div className="bg-cyan-500/30 backdrop-blur-sm border border-cyan-400/30
                              rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-cyan-300" />
                <span className="text-cyan-200 text-sm font-semibold">
                  {current.wind_speed} km/h {getWindDirection(current.wind_direction)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stat grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          icon={<Sun className="w-4 h-4 text-orange-400" />}
          label={t.uvIndex}
          value={`${current.uv_index}`}
          sub={getUVLabel(current.uv_index, language)}
          darkMode={darkMode}
          delay={0.1}
        />
        <StatCard
          icon={<Droplets className="w-4 h-4 text-blue-400" />}
          label={t.humidity}
          value={`${current.humidity}%`}
          darkMode={darkMode}
          delay={0.15}
        />
        <StatCard
          icon={<Eye className="w-4 h-4 text-purple-400" />}
          label={t.visibility}
          value={`${current.visibility} km`}
          darkMode={darkMode}
          delay={0.2}
        />
        {current.pressure > 0 && (
          <StatCard
            icon={<Gauge className="w-4 h-4 text-gray-400" />}
            label={t.pressure}
            value={`${current.pressure} hPa`}
            darkMode={darkMode}
            delay={0.25}
          />
        )}
      </div>
    </div>
  )
}