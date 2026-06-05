# AgriCast — Smart Farming Weather Assistant

A weather assistant built for smallholder farmers in Kenya and East Africa.
AgriCast translates raw weather data into actionable farming decisions 
telling farmers not just what the weather is, but what to do about it.

Live Demo: https://agricast.vercel.app
Built for: WeatherAI Developer Challenge

---

## The Problem

Most weather apps are built for urban users. Farmers across East Africa need
to know whether to plant today, not just what the temperature is. Generic
weather data without crop-specific context is useless in the field.

---

## What It Does

AgriCast answers one question every farmer asks every morning:
"Should I plant today?"

It responds with a clear Plant Today / Wait 2 Days / High Weather Risk
recommendation  backed by real-time weather, crop-specific thresholds,
and a 7-day forecast in English or Swahili.

---

## Features

- Auto-detects farmer location on load via IP geolocation
- City and region search for any location
- Current conditions: temperature, humidity, wind, UV index, visibility
- 7-day forecast strip with rainfall probability per day
- Crop selector with 8 crops: Maize, Tomatoes, Beans, Wheat, Tea, Coffee, Carrots, Apples
- Planting recommendation engine with crop-specific weather thresholds
- Planting calendar showing best months per crop for East African seasons
- After-planting maintenance guide per crop
- Crop conditions analysis: temperature, rainfall outlook, wind assessment
- Dark and light mode with theme preference saved locally
- Full English and Swahili interface
- Mobile-first responsive layout

---

## Tech Stack

- React, TypeScript, Vite
- Tailwind CSS v4
- Framer Motion
- Axios, Lucide React
- WeatherAI API
- Open-Meteo Geocoding API
- Vercel

---

## Why TypeScript

This project was built with TypeScript over plain JavaScript for two reasons.

The planting logic engine has deeply interconnected records crop profiles,
recommendation statuses, and translations. TypeScript enforced that every
new crop updated every record, catching missed entries at compile time
rather than at runtime.

Component prop contracts are also enforced at build time. When darkMode was
added across six components, TypeScript flagged every component that needed
updating turning a potential runtime bug into a straightforward checklist.

For a 48-hour project where speed matters, TypeScript's upfront investment
paid off by eliminating an entire category of bugs that would otherwise
have surfaced during manual testing.

## Getting Started

Prerequisites: Node.js 18+, a WeatherAI API key from weather-ai.co

```bash
git clone https://github.com/Stella-wach/agricast.git
cd agricast
npm install
```

Create a .env file in the project root:

```
VITE_WEATHERAI_API_KEY=wai_your_key_here
```

```bash
npm run dev
```

---

## APIs Used

## APIs Used

WeatherAI — https://api.weather-ai.co (primary API)
- GET /v1/weather-geo?ip=auto — auto-detect location and fetch weather
- GET /v1/weather?lat=&lon=&days=7 — fetch weather by coordinates

Open-Meteo Geocoding — https://geocoding-api.open-meteo.com (free, no key required)
- GET /v1/search?name=Nairobi — converts city name to coordinates
- Used as a geocoding bridge since WeatherAI accepts coordinates only

Both APIs return JSON. WeatherAI requires a Bearer token.
A Vite proxy handles CORS in development. Vercel rewrites handle it in production.

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| VITE_WEATHERAI_API_KEY | Your WeatherAI API key from weather-ai.co |

---

## Project Structure

agricast/
├── public/
│   └── favicon.svg              # Green leaf AgriCast icon
├── src/
│   ├── api/
│   │   └── weatherApi.ts        # WeatherAI + geocoding API calls
│   ├── components/
│   │   ├── SplashScreen.tsx     # Animated intro screen
│   │   ├── Header.tsx           # Nav, theme toggle, language toggle
│   │   ├── LocationSearch.tsx   # City search + IP detection
│   │   ├── CurrentConditions.tsx # Hero weather card + stat grid
│   │   ├── ForecastStrip.tsx    # 7-day horizontal forecast
│   │   ├── PlantingBadge.tsx    # Crop selector + recommendation + calendar
│   │   └── FarmingInsights.tsx  # Crop analysis + AI summary
│   ├── hooks/
│   │   └── useWeather.ts        # Central state management hook
│   ├── types/
│   │   └── weather.ts           # TypeScript interfaces
│   ├── utils/
│   │   └── plantingLogic.ts     # Crop profiles + recommendation engine
│   ├── App.tsx                  # Root component, splash + theme state
│   ├── main.tsx                 # React entry point
│   └── index.css                # Tailwind v4 import
├── vercel.json                  # Production API proxy rewrites
├── vite.config.ts               # Dev proxy + Tailwind plugin
├── .env                         # API keys (not committed)
├── .env.example                 # Template for contributors
└── README.md

##  Features to Add With More Time

### 1.  Authentication & Personalized Dashboard
Integrate Clerk or Supabase Auth to give every farmer a personalized experience.

When a new user signs up, an **onboarding flow** asks:
- What crops do you grow?
- What county/region are you in?
- What is your farm size?
- Do you want SMS weather alerts?

The dashboard then becomes fully personalized — saved crops, saved location, planting history, and recommendations tailored to their specific profile.

### 2.  Push Notifications & SMS Alerts
Using WeatherAI's SMS API (Scale plan) and Africa's Talking:
- Daily 6 AM weather briefing via SMS in Swahili
- Extreme weather alerts (heavy rain, frost, high wind)
- Planting window notifications ("Conditions ideal for your maize tomorrow")
- USSD support for farmers without smartphones

### 3.  Farm Mapping & Field Management
Inspired by the Smart Garden AI reference:
- Multiple farm fields per user
- Each field has its own crop assignment and planting date
- Track plant age, yield estimates, and health status
- Visual farm map with field boundaries

### 4.  Historical Weather & Crop Analytics
- 30/90-day weather history for the farmer's location
- Compare current season vs. historical averages
- Yield prediction model based on weather patterns
- Season performance reports

### 5.  Drone/Satellite Tree & Crop Analysis
Integrate WeatherAI's Trees & Forestry API:
- Upload drone images of farm
- Automatic tree/plant counting
- Canopy health assessment
- Density and spacing recommendations

### 6.  Offline Mode & PWA
- Progressive Web App with service workers
- Cache last weather data for offline viewing
- Background sync when connection restored
- "Add to home screen" for mobile farmers

### 7.  Community & Extension Officer Integration
- Connect farmers with local agricultural extension officers
- Share weather reports with farming groups (WhatsApp-style)
- Crowdsourced ground-truth weather reports
- Market price integration (what crops are fetching today?)

### 8.  Rate Limiting & Performance
- Client-side request debouncing on location search
- Cached weather responses (15-minute TTL)
- Request queuing to stay within WeatherAI's monthly quota
- Usage dashboard showing API consumption vs. plan limits

### 9.  Expanded Regional Coverage
- Extend crop profiles to cover Uganda, Tanzania, Rwanda crops
- Localized planting calendars per country
- More language support: Luganda, Amharic, Kigali
- Regional pest and disease calendar integration

### 10.  A/B Testing & Farmer Feedback Loop
- Simple thumbs up/down on planting recommendations
- Track recommendation accuracy vs. actual outcomes
- Improve crop threshold profiles based on real farmer data
- "Was this recommendation helpful?" feedback widget

---

##  Deployment

AgriCast is deployed on Vercel. The `vercel.json` rewrites proxy all `/v1/*` requests to the WeatherAI API server-side, solving the CORS restriction that prevents direct browser calls.