import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Leaf, CloudSun } from 'lucide-react'

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2800)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,40,10,0.75) 100%),
          url(https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&auto=format&fit=crop)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={onComplete}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated background overlay pulse */}
      <motion.div
        className="absolute inset-0 bg-green-900/20"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center">

        {/* Logo icon */}
        <motion.div
          className="flex items-center justify-center w-24 h-24 rounded-3xl
                     bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
        >
          <Leaf className="w-12 h-12 text-green-400" />
        </motion.div>

        {/* App name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h1 className="text-5xl font-black text-white tracking-tight">
            AgriCast
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <CloudSun className="w-4 h-4 text-green-400" />
            <p className="text-green-300 text-sm font-medium tracking-widest uppercase">
              Smart Farming Weather
            </p>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-white/70 text-base max-w-xs leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Weather intelligence designed for the African farmer
        </motion.p>

        {/* Loading dots */}
        <motion.div
          className="flex gap-2 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>

        {/* Tap hint */}
        <motion.p
          className="text-white/40 text-xs mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Tap anywhere to continue
        </motion.p>
      </div>

      {/* Bottom credit */}
      <motion.div
        className="absolute bottom-8 text-white/30 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        Powered by WeatherAI · Built for Kenya
      </motion.div>
    </motion.div>
  )
}