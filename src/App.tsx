import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useWeather } from './hooks/useWeather'
import SplashScreen from './components/SplashScreen'
import Header from './components/Header'
import LocationSearch from './components/LocationSearch'
import CurrentConditions from './components/CurrentConditions'
import PlantingBadge from './components/PlantingBadge'
import ForecastStrip from './components/ForecastStrip'
import FarmingInsights from './components/FarmingInsights'

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('agricast-theme')
    return saved ? saved === 'dark' : true // default dark
  })

  const {
    weatherData,
    loading,
    error,
    language,
    locationQuery,
    selectedCrop,
    setSelectedCrop,
    setLanguage,
    fetchByIP,
    fetchByLocation,
    clearError,
  } = useWeather()

  // Persist theme
  useEffect(() => {
    localStorage.setItem('agricast-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'sw' : 'en')
  }

  return (
  <div className={darkMode ? 'dark' : ''}>
    <div
      className={`min-h-screen transition-colors duration-300 relative overflow-x-hidden
        ${darkMode ? 'text-white' : 'bg-gray-50 text-gray-900'}`}
      style={darkMode ? { backgroundColor: '#060d09' } : {}}
    >

      {/* ── Strategic glow layers (dark mode only) ── */}
      {darkMode && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

          {/* Top-left — primary green source */}
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              left: '-5%',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(22,101,52,0.22) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Top-right — faint emerald */}
          <div
            style={{
              position: 'absolute',
              top: '5%',
              right: '-10%',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          {/* Mid-page — center dim glow between sections */}
          <div
            style={{
              position: 'absolute',
              top: '45%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '700px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(22,101,52,0.10) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />

          {/* Bottom-right — warm exit glow */}
          <div
            style={{
              position: 'absolute',
              bottom: '0%',
              right: '5%',
              width: '500px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(22,101,52,0.15) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
          />

          {/* Bottom-left — faint anchor */}
          <div
            style={{
              position: 'absolute',
              bottom: '10%',
              left: '-5%',
              width: '350px',
              height: '350px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
          />
        </div>
      )}

      {/* ── Splash ── */}
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {/* ── Main app ── */}
      {!showSplash && (
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Header
            locationName={weatherData?.location.name ?? locationQuery}
            country={weatherData?.location.country ?? ''}
            language={language}
            loading={loading}
            darkMode={darkMode}
            onLanguageToggle={handleLanguageToggle}
            onRefresh={fetchByIP}
            onThemeToggle={() => setDarkMode(!darkMode)}
          />

          <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">

            {/* Section divider utility — reuse between sections */}
            <LocationSearch
              language={language}
              loading={loading}
              darkMode={darkMode}
              onSearch={fetchByLocation}
              onUseMyLocation={fetchByIP}
            />

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl p-4 flex items-center justify-between
                  ${darkMode
                    ? 'bg-red-900/30 border border-red-500/30 text-red-300'
                    : 'bg-red-50 border border-red-200 text-red-700'
                  }`}
              >
                <p className="text-sm">{error}</p>
                <button
                  onClick={clearError}
                  className="ml-4 text-lg opacity-60 hover:opacity-100"
                >×</button>
              </motion.div>
            )}

            {loading && (
              <div className="text-center py-16">
                <motion.div
                  className="inline-block w-10 h-10 border-4 border-green-500
                             border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <p className={`text-sm mt-4
                  ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {language === 'en'
                    ? 'Fetching weather data...'
                    : 'Inapata data ya hali ya hewa...'}
                </p>
              </div>
            )}

            {weatherData && !loading && (
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <CurrentConditions
                      current={weatherData.current}
                      language={language}
                      darkMode={darkMode}
                    />
                  </div>
                  <div>
                    <PlantingBadge
                      selectedCrop={selectedCrop}
                      forecast={weatherData.forecast}
                      language={language}
                      darkMode={darkMode}
                      onCropChange={setSelectedCrop}
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className={`h-px w-full
                  ${darkMode
                    ? 'bg-gradient-to-r from-transparent via-green-900/60 to-transparent'
                    : 'bg-gradient-to-r from-transparent via-gray-200 to-transparent'
                  }`}
                />

                {/* Row 2 */}
                <ForecastStrip
                  forecast={weatherData.forecast}
                  language={language}
                  darkMode={darkMode}
                />

                {/* Divider */}
                <div className={`h-px w-full
                  ${darkMode
                    ? 'bg-gradient-to-r from-transparent via-green-900/60 to-transparent'
                    : 'bg-gradient-to-r from-transparent via-gray-200 to-transparent'
                  }`}
                />

                {/* Row 3 */}
                <FarmingInsights
                  weatherData={weatherData}
                  selectedCrop={selectedCrop}
                  language={language}
                  darkMode={darkMode}
                />

                {/* Bottom spacer */}
                <div className="pb-8" />
              </motion.div>
            )}
          </main>
        </motion.div>
      )}
    </div>
  </div>
)
}

export default App