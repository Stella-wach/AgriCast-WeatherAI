// api/weather.ts  ← root directory, NOT src/
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const API_KEY = process.env.VITE_WEATHERAI_API_KEY

  if (!API_KEY) {
    res.status(500).json({ error: 'Missing API key' })
    return
  }

  // Strip the /api/weather prefix to get the real path
  // e.g. /api/weather/v1/weather-geo → /v1/weather-geo
  const path = (req.url ?? '').replace(/^\/api\/weather/, '') || '/v1/weather'
  const queryString = new URLSearchParams(
    req.query as Record<string, string>
  ).toString()

  const url = `https://api.weather-ai.co${path}${queryString ? `?${queryString}` : ''}`

  console.log('[AgriCast proxy] →', url)

  try {
    const upstream = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await upstream.json()

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.status(upstream.status).json(data)
  } catch (err) {
    console.error('[AgriCast proxy] error:', err)
    res.status(500).json({ error: 'Proxy fetch failed', detail: String(err) })
  }
}