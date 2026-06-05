import { motion } from 'framer-motion'
import { Lightbulb, CloudRain, Thermometer, Wind, TrendingUp } from 'lucide-react'
import type { Language, WeatherData, CropType } from '../types/weather'
import { getCropProfile } from '../utils/plantingLogic'

interface FarmingInsightsProps {
  weatherData: WeatherData
  selectedCrop: CropType
  language: Language
  darkMode: boolean
}

export default function FarmingInsights({
  weatherData,
  selectedCrop,
  language,
  darkMode,
}: FarmingInsightsProps) {
  const profile = getCropProfile(selectedCrop)
  const { current, forecast, ai_summary } = weatherData

  const labels = {
    en: {
      title: 'Farming Insights',
      aiSummary: 'AI Weather Summary',
      cropAnalysis: 'Crop Conditions Analysis',
      temperature: 'Temperature',
      rainfall: 'Rainfall Outlook',
      wind: 'Wind Conditions',
      ideal: 'Ideal',
      caution: 'Caution',
      warning: 'Warning',
      next7: 'Next 7 days',
      avgRain: 'Avg. rain probability',
      maxWind: 'Max wind speed',
      noSummary: 'AI summary not available on current plan.',
    },
    sw: {
      title: 'Maarifa ya Kilimo',
      aiSummary: 'Muhtasari wa AI',
      cropAnalysis: 'Uchambuzi wa Hali kwa Mazao',
      temperature: 'Joto',
      rainfall: 'Matarajio ya Mvua',
      wind: 'Hali ya Upepo',
      ideal: 'Bora',
      caution: 'Tahadhari',
      warning: 'Onyo',
      next7: 'Siku 7 zijazo',
      avgRain: 'Uwezekano wa wastani wa mvua',
      maxWind: 'Kasi ya juu ya upepo',
      noSummary: 'Muhtasari wa AI haupatikani.',
    },
  }

  const t = labels[language]

  // ── Status helpers ────────────────────────────────────────────────────────
  const getTempStatus = () => {
    if (current.temp > profile.ideal_temp_max)
      return { level: 'warning', label: t.warning,
        message: `${current.temp}°C — above ideal max of ${profile.ideal_temp_max}°C` }
    if (current.temp < profile.ideal_temp_min)
      return { level: 'caution', label: t.caution,
        message: `${current.temp}°C — below ideal min of ${profile.ideal_temp_min}°C` }
    return { level: 'ideal', label: t.ideal,
      message: `${current.temp}°C — within ideal range` }
  }

  const avgRainProb = Math.round(
    forecast.reduce((s, d) => s + d.precipitation_probability, 0) / forecast.length
  )

  const getRainStatus = () => {
    if (avgRainProb >= 70) return { level: 'warning', label: t.warning, message: `${avgRainProb}% · ${t.next7}` }
    if (avgRainProb >= 40) return { level: 'caution', label: t.caution, message: `${avgRainProb}% · ${t.next7}` }
    return { level: 'ideal', label: t.ideal, message: `${avgRainProb}% · ${t.next7}` }
  }

  const maxWind = Math.max(...forecast.map((d) => d.wind_speed), current.wind_speed)

  const getWindStatus = () => {
    if (maxWind >= profile.max_safe_wind)
      return { level: 'warning', label: t.warning, message: `${Math.round(maxWind)} km/h max` }
    if (maxWind >= profile.max_safe_wind * 0.75)
      return { level: 'caution', label: t.caution, message: `${Math.round(maxWind)} km/h max` }
    return { level: 'ideal', label: t.ideal, message: `${Math.round(maxWind)} km/h max` }
  }

  const tempStatus = getTempStatus()
  const rainStatus = getRainStatus()
  const windStatus = getWindStatus()

  const getStatusColors = (level: string) => {
    if (level === 'ideal') return {
      bg: darkMode ? 'bg-green-900/20 border-green-500/20' : 'bg-green-50 border-green-200',
      icon: 'text-green-500',
      badge: 'bg-green-500/20 text-green-400',
      message: darkMode ? 'text-green-400' : 'text-green-700',
    }
    if (level === 'caution') return {
      bg: darkMode ? 'bg-yellow-900/20 border-yellow-500/20' : 'bg-yellow-50 border-yellow-200',
      icon: 'text-yellow-500',
      badge: 'bg-yellow-500/20 text-yellow-400',
      message: darkMode ? 'text-yellow-400' : 'text-yellow-700',
    }
    return {
      bg: darkMode ? 'bg-red-900/20 border-red-500/20' : 'bg-red-50 border-red-200',
      icon: 'text-red-500',
      badge: 'bg-red-500/20 text-red-400',
      message: darkMode ? 'text-red-400' : 'text-red-700',
    }
  }

  const insights = [
    { icon: Thermometer, label: t.temperature, status: tempStatus },
    { icon: CloudRain,   label: t.rainfall,    status: rainStatus },
    { icon: Wind,        label: t.wind,        status: windStatus },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="space-y-4"
    >
      <h2 className={`text-xs font-bold uppercase tracking-widest px-1
        ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
        {t.title}
      </h2>

      {/* AI Summary */}
      {ai_summary ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`rounded-2xl border p-5 relative overflow-hidden
            ${darkMode
              ? 'bg-emerald-900/20 border-emerald-500/20'
              : 'bg-emerald-50 border-emerald-200'
            }`}
        >
          <div className="absolute -right-6 -top-6 w-24 h-24
                          bg-emerald-500/10 rounded-full" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className={`p-1.5 rounded-lg
                ${darkMode ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
                <Lightbulb className="w-4 h-4 text-emerald-500" />
              </div>
              <p className={`text-xs font-bold uppercase tracking-wider
                ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                {t.aiSummary}
              </p>
            </div>
            <p className={`text-sm leading-relaxed
              ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
              {ai_summary}
            </p>
          </div>
        </motion.div>
      ) : (
        <div className={`rounded-2xl border p-4 flex items-center gap-3
          ${darkMode
            ? 'bg-gray-900/40 border-white/5'
            : 'bg-gray-50 border-gray-100'
          }`}
        >
          <Lightbulb className={darkMode ? 'w-4 h-4 text-gray-600' : 'w-4 h-4 text-gray-300'} />
          <p className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
            {t.noSummary}
          </p>
        </div>
      )}

      {/* Crop analysis */}
      <div className={`rounded-2xl border overflow-hidden transition-colors
        ${darkMode
          ? 'bg-gray-900/60 border-white/10'
          : 'bg-white border-gray-100 shadow-sm'
        }`}
      >
        <div className={`px-5 py-4 border-b flex items-center gap-2
          ${darkMode ? 'border-white/5' : 'border-gray-50'}`}>
          <TrendingUp className="w-4 h-4 text-green-500" />
          <p className={`text-xs font-bold uppercase tracking-wider
            ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {t.cropAnalysis}
          </p>
        </div>

        <div className="p-4 space-y-3">
          {insights.map(({ icon: Icon, label, status }, i) => {
            const colors = getStatusColors(status.level)
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-3 p-3.5 rounded-xl border
                  ${colors.bg}`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${colors.icon}`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold
                    ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {label}
                  </p>
                  <p className={`text-xs mt-0.5 ${colors.message}`}>
                    {status.message}
                  </p>
                </div>
                <span className={`text-xs font-black px-2.5 py-1 rounded-lg flex-shrink-0
                  ${colors.badge}`}>
                  {status.label}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}