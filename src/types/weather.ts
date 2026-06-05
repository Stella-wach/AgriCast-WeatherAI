export interface CurrentWeather {
  temp: number
  feels_like: number
  humidity: number
  wind_speed: number
  wind_direction: string
  description: string
  icon: string
  uv_index: number
  visibility: number
  pressure: number
}

export interface DailyForecast {
  date: string
  day_name: string
  temp_max: number
  temp_min: number
  description: string
  icon: string
  precipitation_probability: number
  precipitation_mm: number
  wind_speed: number
  humidity: number
}

export interface WeatherData {
  location: {
    name: string
    country: string
    lat: number
    lon: number
  }
  current: CurrentWeather
  forecast: DailyForecast[]
  ai_summary: string
}

export type CropType =
  | 'maize'
  | 'tomatoes'
  | 'beans'
  | 'wheat'
  | 'tea'
  | 'coffee'
  | 'carrots'
  | 'apples'

export type PlantingStatus = 'plant_today' | 'wait_2_days' | 'high_risk'

export interface PlantingRecommendation {
  status: PlantingStatus
  reason: string
  tips: string[]
}

export interface PlantingCalendar {
  best_months: string[]
  planting_season: string
  maintenance_tips: string[]
}

export type Language = 'en' | 'sw'

export type ThemeMode = 'dark' | 'light'