import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sprout, Calendar, ChevronDown, CheckCircle2 } from 'lucide-react'
import {
  getAllCrops,
  getBadgeConfig,
  getPlantingRecommendation,
  getPlantingCalendar,
  CROP_IMAGES,
} from '../utils/plantingLogic'
import type { CropType, DailyForecast, Language } from '../types/weather'

interface PlantingBadgeProps {
  selectedCrop: CropType
  forecast: DailyForecast[]
  language: Language
  darkMode: boolean
  onCropChange: (crop: CropType) => void
}

export default function PlantingBadge({
  selectedCrop,
  forecast,
  language,
  darkMode,
  onCropChange,
}: PlantingBadgeProps) {
  const [showCalendar, setShowCalendar] = useState(false)
  const crops = getAllCrops()
  const recommendation = getPlantingRecommendation(selectedCrop, forecast, language)
  const badge = getBadgeConfig(recommendation.status, language)
  const calendar = getPlantingCalendar(selectedCrop, language)

  const ALL_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const labels = {
    en: {
      title: 'Planting Guide',
      selectCrop: 'Select Your Crop',
      tips: 'Planting Tips',
      maintenance: 'After Planting',
      season: 'Best Season',
      bestMonths: 'Best Months to Plant',
      viewCalendar: 'View Planting Calendar',
      hideCalendar: 'Hide Calendar',
    },
    sw: {
      title: 'Mwongozo wa Kupanda',
      selectCrop: 'Chagua Zao Lako',
      tips: 'Vidokezo vya Kupanda',
      maintenance: 'Baada ya Kupanda',
      season: 'Msimu Bora',
      bestMonths: 'Miezi Bora ya Kupanda',
      viewCalendar: 'Angalia Kalenda ya Kupanda',
      hideCalendar: 'Ficha Kalenda',
    },
  }

  const t = labels[language]

  const badgeColors = {
    plant_today: 'from-green-500 to-emerald-600',
    wait_2_days: 'from-yellow-500 to-amber-600',
    high_risk:   'from-red-500 to-rose-600',
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-3xl border overflow-hidden transition-colors duration-300
        ${darkMode
          ? 'bg-gray-900/60 border-white/10 backdrop-blur-sm'
          : 'bg-white border-gray-100 shadow-sm'
        }`}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-green-500/20 flex items-center justify-center">
            <Sprout className="w-4 h-4 text-green-500" />
          </div>
          <h2 className={`text-xs font-bold uppercase tracking-widest
            ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {t.title}
          </h2>
        </div>

        {/* Crop selector */}
        <p className={`text-xs font-semibold mb-3
          ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          {t.selectCrop}
        </p>

        <div className="grid grid-cols-4 gap-2">
          {crops.map((crop, i) => (
            <motion.button
              key={crop.value}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCropChange(crop.value)}
              className={`relative flex flex-col items-center gap-1.5 p-2
                          rounded-2xl border-2 transition-all duration-200
                ${selectedCrop === crop.value
                  ? 'border-green-500 shadow-lg shadow-green-500/20'
                  : darkMode
                    ? 'border-white/5 hover:border-white/20'
                    : 'border-gray-100 hover:border-gray-200'
                }`}
            >
              {/* Crop image */}
              <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={CROP_IMAGES[crop.value]}
                  alt={crop.label}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              <span className={`text-xs font-medium leading-tight text-center
                ${selectedCrop === crop.value
                  ? 'text-green-500'
                  : darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                {crop.label}
              </span>

              {/* Selected indicator */}
              {selectedCrop === crop.value && (
                <motion.div
                  layoutId="cropSelected"
                  className="absolute -top-1 -right-1 w-4 h-4 bg-green-500
                             rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Badge */}
      <div className="px-5 pb-4">
        <motion.div
          key={recommendation.status}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`relative rounded-2xl p-4 overflow-hidden
            bg-gradient-to-r ${badgeColors[recommendation.status]}`}
        >
          {/* Decorative circles */}
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full" />
          <div className="absolute -right-2 -bottom-6 w-16 h-16 bg-white/10 rounded-full" />

          <div className="relative z-10 flex items-start gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center
                            justify-center flex-shrink-0 backdrop-blur-sm">
              <span className="text-xl">
                {recommendation.status === 'plant_today' ? '🌱'
                  : recommendation.status === 'wait_2_days' ? '⏳'
                  : '⚠️'}
              </span>
            </div>
            <div>
              <p className="text-white font-black text-base leading-tight">
                {badge.label}
              </p>
              <p className="text-white/80 text-xs mt-1 leading-relaxed">
                {recommendation.reason}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tips */}
      <div className={`px-5 pb-4 border-t
        ${darkMode ? 'border-white/5' : 'border-gray-50'}`}>
        <p className={`text-xs font-bold uppercase tracking-widest mt-4 mb-3
          ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          {t.tips}
        </p>
        <div className="space-y-2">
          {recommendation.tips.map((tip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-2"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className={`text-xs leading-relaxed
                ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {tip}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Planting calendar toggle */}
      <div className={`border-t ${darkMode ? 'border-white/5' : 'border-gray-50'}`}>
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className={`w-full flex items-center justify-between px-5 py-3
                      text-xs font-semibold transition-colors
            ${darkMode
              ? 'text-green-400 hover:bg-white/5'
              : 'text-green-600 hover:bg-green-50'
            }`}
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>{showCalendar ? t.hideCalendar : t.viewCalendar}</span>
          </div>
          <motion.div
            animate={{ rotate: showCalendar ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.div>
        </button>

        <AnimatePresence>
          {showCalendar && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className={`px-5 pb-5 space-y-4 border-t
                ${darkMode ? 'border-white/5' : 'border-gray-50'}`}>

                {/* Season info */}
                <div className="pt-3">
                  <p className={`text-xs font-bold uppercase tracking-widest mb-2
                    ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {t.season}
                  </p>
                  <p className={`text-xs leading-relaxed
                    ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {calendar.planting_season}
                  </p>
                </div>

                {/* Month grid */}
                <div>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-3
                    ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {t.bestMonths}
                  </p>
                  <div className="grid grid-cols-6 gap-1.5">
                    {ALL_MONTHS.map((month) => {
                      const isBest = calendar.best_months.includes(month)
                      return (
                        <motion.div
                          key={month}
                          whileHover={{ scale: 1.1 }}
                          className={`rounded-lg py-1.5 text-center text-xs font-semibold
                            transition-colors
                            ${isBest
                              ? 'bg-green-500 text-white shadow-sm shadow-green-500/30'
                              : darkMode
                                ? 'bg-white/5 text-gray-600'
                                : 'bg-gray-100 text-gray-300'
                            }`}
                        >
                          {month}
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* Maintenance tips */}
                <div>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-3
                    ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {t.maintenance}
                  </p>
                  <div className="space-y-2">
                    {calendar.maintenance_tips.map((tip, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className={`flex items-start gap-2 p-2.5 rounded-xl
                          ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}
                      >
                        <span className={`text-xs font-black w-5 h-5 rounded-full
                                          flex items-center justify-center flex-shrink-0
                                          bg-green-500/20 text-green-500`}>
                          {i + 1}
                        </span>
                        <span className={`text-xs leading-relaxed
                          ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {tip}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}