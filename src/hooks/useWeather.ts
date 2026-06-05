import { useState, useCallback, useEffect } from 'react'
import type { WeatherData, CropType, Language } from '../types/weather'
import {
  fetchWeatherByIP,
  fetchWeatherByCoords,
  geocodeLocation,
} from '../api/weatherApi'

interface UseWeatherReturn {
  weatherData: WeatherData | null
  loading: boolean
  error: string | null
  selectedCrop: CropType
  language: Language
  locationQuery: string
  setSelectedCrop: (crop: CropType) => void
  setLanguage: (lang: Language) => void
  fetchByIP: () => Promise<void>
  fetchByLocation: (query: string) => Promise<void>
  clearError: () => void
}

export function useWeather(): UseWeatherReturn {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedCrop, setSelectedCrop] = useState<CropType>('maize')
  const [language, setLanguage] = useState<Language>('en')
  const [locationQuery, setLocationQuery] = useState<string>('')

  const fetchByIP = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchWeatherByIP(language)
      setWeatherData(data)
      setLocationQuery(data.location.name)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to fetch weather data. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }, [language])

  const fetchByLocation = useCallback(
    async (query: string) => {
      if (!query.trim()) return
      setLoading(true)
      setError(null)
      try {
        const geo = await geocodeLocation(query.trim())
        if (!geo) {
          setError(`Location "${query}" not found. Try a different city name.`)
          setLoading(false)
          return
        }
        const data = await fetchWeatherByCoords(geo.lat, geo.lon, language)
        if (!data.location.name || data.location.name === '') {
          data.location.name = geo.name
          data.location.country = geo.country
        }
        setWeatherData(data)
        setLocationQuery(geo.name)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to fetch weather data. Please try again.'
        )
      } finally {
        setLoading(false)
      }
    },
    [language]
  )

  useEffect(() => {
    if (weatherData) {
      const { lat, lon } = weatherData.location
      if (lat && lon) {
        fetchWeatherByCoords(lat, lon, language)
          .then(setWeatherData)
          .catch(() => {})
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  useEffect(() => {
    let cancelled = false
    const init = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchWeatherByIP(language)
        if (!cancelled) {
          setWeatherData(data)
          setLocationQuery(data.location.name)
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'Failed to fetch weather data. Please try again.'
          )
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    init()
    return () => { cancelled = true }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const clearError = useCallback(() => setError(null), [])

  return {
    weatherData,
    loading,
    error,
    selectedCrop,
    language,
    locationQuery,
    setSelectedCrop,
    setLanguage,
    fetchByIP,
    fetchByLocation,
    clearError,
  }
}