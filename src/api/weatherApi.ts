import axios from 'axios'
import type { WeatherData, DailyForecast } from '../types/weather'

const BASE_URL = ''
const API_KEY = import.meta.env.VITE_WEATHERAI_API_KEY

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapResponseToWeatherData(raw: any): WeatherData {

  const now = new Date()
  const currentHour = now.getHours()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hourly: any[] = raw.hourly ?? []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const closestHourly = hourly.find((h: any) => {
    const hour = new Date(h.time).getHours()
    return hour === currentHour
  }) ?? hourly[currentHour] ?? hourly[0] ?? {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dailyRaw: any[] = raw.daily ?? raw.forecast?.days ?? []

  const WMO_DESCRIPTIONS: Record<string, string> = {
    '0': 'Clear sky',
    '1': 'Mainly clear',
    '2': 'Partly cloudy',
    '3': 'Overcast',
    '45': 'Foggy',
    '48': 'Icy fog',
    '51': 'Light drizzle',
    '53': 'Moderate drizzle',
    '55': 'Heavy drizzle',
    '61': 'Slight rain',
    '63': 'Moderate rain',
    '65': 'Heavy rain',
    '71': 'Slight snow',
    '73': 'Moderate snow',
    '75': 'Heavy snow',
    '80': 'Slight showers',
    '81': 'Moderate showers',
    '82': 'Heavy showers',
    '95': 'Thunderstorm',
    '96': 'Thunderstorm with hail',
    '99': 'Thunderstorm with heavy hail',
  }

  const forecastDays: DailyForecast[] = dailyRaw.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (day: any, index: number) => {
      const date = new Date(day.date ?? day.time ?? Date.now())
      return {
        date: date.toISOString().split('T')[0],
        day_name:
          index === 0 ? 'Today'
          : index === 1 ? 'Tomorrow'
          : date.toLocaleDateString('en-KE', { weekday: 'short' }),
        temp_max: day.temperature_max ?? day.temp_max ?? day.temperature ?? 0,
        temp_min: day.temperature_min ?? day.temp_min ?? day.temperature ?? 0,
        description: day.description ?? day.summary ?? '',
        icon: day.icon ?? '',
        precipitation_probability:
          day.precipitation_probability_max ??
          day.precipitation_probability ??
          day.pop ??
          0,
        precipitation_mm:
          day.precipitation_sum ??
          day.precipitation_mm ??
          day.rain ??
          0,
        wind_speed:
          day.wind_speed_max ??
          day.windspeed_10m_max ??
          day.wind_speed ??
          day.windspeed ??
          0,
        humidity: day.humidity ?? closestHourly.humidity ?? 0,
      }
    }
  )

  const conditionCode = String(raw.current?.condition_code ?? '')
  const description =
    raw.current?.description ??
    WMO_DESCRIPTIONS[conditionCode] ??
    'Clear sky'

  return {
    location: {
      name:
        raw.location?.name ??
        raw.location?.city ??
        raw.city ??
        raw.name ??
        '',
      country: raw.location?.country ?? '',
      lat: raw.location?.lat ?? 0,
      lon: raw.location?.lon ?? 0,
    },
    current: {
      temp: raw.current?.temperature ?? 0,
      feels_like: closestHourly.feels_like ?? raw.current?.temperature ?? 0,
      humidity: closestHourly.humidity ?? 0,
      wind_speed: raw.current?.wind_speed ?? 0,
      wind_direction: String(raw.current?.wind_direction ?? ''),
      description,
      icon: raw.current?.icon ?? '',
      uv_index: closestHourly.uv_index ?? 0,
      visibility: raw.current?.visibility ?? closestHourly.visibility ?? 10,
      pressure: raw.current?.pressure ?? closestHourly.pressure ?? 0,
    },
    forecast: forecastDays,
    ai_summary: raw.ai_summary ?? raw.summary ?? '',
  }
}

export async function fetchWeatherByIP(
  lang: 'en' | 'sw' = 'en'
): Promise<WeatherData> {
  const response = await client.get('/v1/weather-geo', {
    params: { ip: 'auto', days: 7, ai: true, units: 'metric', lang },
  })

  const data = mapResponseToWeatherData(response.data)

  const city =
    response.headers?.['x-city'] ??
    response.headers?.['X-City'] ??
    response.data?.location?.city ??
    response.data?.city ??
    ''
  const region =
    response.headers?.['x-region'] ??
    response.headers?.['X-Region'] ??
    response.data?.location?.region ??
    ''

  if (!data.location.name) {
    data.location.name = city || region || 'Your Location'
  }

  return data
}

export async function fetchWeatherByCoords(
  lat: number,
  lon: number,
  lang: 'en' | 'sw' = 'en'
): Promise<WeatherData> {
  const response = await client.get('/v1/weather', {
    params: { lat, lon, days: 7, ai: true, units: 'metric', lang },
  })
  return mapResponseToWeatherData(response.data)
}

export async function geocodeLocation(query: string): Promise<{
  name: string
  lat: number
  lon: number
  country: string
} | null> {
  const response = await axios.get(
    'https://geocoding-api.open-meteo.com/v1/search',
    {
      params: { name: query, count: 1, language: 'en', format: 'json' },
    }
  )
  const result = response.data?.results?.[0]
  if (!result) return null
  return {
    name: result.name,
    lat: result.latitude,
    lon: result.longitude,
    country: result.country,
  }
}