import type {
  CropType,
  PlantingRecommendation,
  PlantingStatus,
  DailyForecast,
  PlantingCalendar,
} from '../types/weather'

// ─── Crop images (Unsplash) ───────────────────────────────────────────────────
export const CROP_IMAGES: Record<CropType, string> = {
  maize:    'https://images.unsplash.com/photo-1601593346740-925612772716?w=400&auto=format&fit=crop',
  tomatoes: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&auto=format&fit=crop',
  beans:    'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?w=400&auto=format&fit=crop',
  wheat:    'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&auto=format&fit=crop',
  tea:      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop',
  coffee:   'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&auto=format&fit=crop',
  carrots:  'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&auto=format&fit=crop',
  apples:   'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&auto=format&fit=crop',
}

// ─── Crop profiles ────────────────────────────────────────────────────────────
const CROP_PROFILES: Record<
  CropType,
  {
    label: string
    ideal_temp_min: number
    ideal_temp_max: number
    danger_temp_min: number
    danger_temp_max: number
    max_safe_wind: number
    max_safe_rain_prob: number
    max_safe_rain_mm: number
    min_rain_mm: number
  }
> = {
  maize: {
    label: 'Maize',
    ideal_temp_min: 18, ideal_temp_max: 32,
    danger_temp_min: 10, danger_temp_max: 40,
    max_safe_wind: 40, max_safe_rain_prob: 70,
    max_safe_rain_mm: 20, min_rain_mm: 0,
  },
  tomatoes: {
    label: 'Tomatoes',
    ideal_temp_min: 18, ideal_temp_max: 29,
    danger_temp_min: 12, danger_temp_max: 35,
    max_safe_wind: 30, max_safe_rain_prob: 60,
    max_safe_rain_mm: 15, min_rain_mm: 0,
  },
  beans: {
    label: 'Beans',
    ideal_temp_min: 16, ideal_temp_max: 30,
    danger_temp_min: 10, danger_temp_max: 35,
    max_safe_wind: 35, max_safe_rain_prob: 65,
    max_safe_rain_mm: 18, min_rain_mm: 0,
  },
  wheat: {
    label: 'Wheat',
    ideal_temp_min: 12, ideal_temp_max: 25,
    danger_temp_min: 5, danger_temp_max: 32,
    max_safe_wind: 45, max_safe_rain_prob: 60,
    max_safe_rain_mm: 15, min_rain_mm: 0,
  },
  tea: {
    label: 'Tea',
    ideal_temp_min: 13, ideal_temp_max: 28,
    danger_temp_min: 8, danger_temp_max: 35,
    max_safe_wind: 30, max_safe_rain_prob: 75,
    max_safe_rain_mm: 25, min_rain_mm: 0,
  },
  coffee: {
    label: 'Coffee',
    ideal_temp_min: 15, ideal_temp_max: 28,
    danger_temp_min: 8, danger_temp_max: 34,
    max_safe_wind: 25, max_safe_rain_prob: 70,
    max_safe_rain_mm: 20, min_rain_mm: 0,
  },
  carrots: {
    label: 'Carrots',
    ideal_temp_min: 10, ideal_temp_max: 25,
    danger_temp_min: 4, danger_temp_max: 30,
    max_safe_wind: 30, max_safe_rain_prob: 60,
    max_safe_rain_mm: 15, min_rain_mm: 0,
  },
  apples: {
    label: 'Apples',
    ideal_temp_min: 10, ideal_temp_max: 24,
    danger_temp_min: 2, danger_temp_max: 32,
    max_safe_wind: 35, max_safe_rain_prob: 65,
    max_safe_rain_mm: 18, min_rain_mm: 0,
  },
}

// ─── Translations ─────────────────────────────────────────────────────────────
const TRANSLATIONS: Record<
  'en' | 'sw',
  {
    plant_today: string
    wait_2_days: string
    high_risk: string
    reasons: Record<string, string>
    tips: Record<CropType, string[]>
    maintenance: Record<CropType, string[]>
    planting_season: Record<CropType, string>
    best_months: Record<CropType, string[]>
  }
> = {
  en: {
    plant_today: 'Plant Today',
    wait_2_days: 'Wait 2 Days',
    high_risk: 'High Weather Risk',
    reasons: {
      ideal:                'Weather conditions are ideal for planting.',
      high_rain_prob:       'High rainfall probability in the next 2 days.',
      heavy_rain:           'Heavy rain expected — risk of waterlogging.',
      high_wind:            'Wind speeds are too high for safe planting.',
      too_hot:              'Temperatures are dangerously high for this crop.',
      too_cold:             'Temperatures are too low for this crop.',
      mild_rain:            'Mild rain expected soon — consider waiting.',
      conditions_improving: 'Conditions improving after 2 days.',
    },
    tips: {
      maize:    ['Ensure soil is well-drained', 'Plant at 2.5cm depth', 'Space rows 75cm apart'],
      tomatoes: ['Stake plants early', 'Avoid overhead watering', 'Mulch to retain moisture'],
      beans:    ['Inoculate seeds with rhizobium', 'Avoid waterlogged soils', 'Plant rows 45cm apart'],
      wheat:    ['Prepare seedbed well', 'Plant at 3–5cm depth', 'Monitor for rust after rain'],
      tea:      ['Young plants need shade', 'Ensure consistent moisture', 'Prune after heavy rain'],
      coffee:   ['Plant in partial shade', 'Use well-draining loam soil', 'Mulch heavily around base'],
      carrots:  ['Loosen soil to 30cm deep', 'Thin seedlings to 5cm apart', 'Keep soil consistently moist'],
      apples:   ['Plant in full sun', 'Ensure good air circulation', 'Prune in late dry season'],
    },
    maintenance: {
      maize:    [
        'Water every 3–4 days during dry spells',
        'Apply nitrogen fertilizer at knee height',
        'Watch for stalk borer — use approved pesticide',
        'Harvest when husks are dry and brown',
      ],
      tomatoes: [
        'Water at base — never on leaves',
        'Pinch off suckers weekly for bushier growth',
        'Spray copper fungicide after rain',
        'Harvest when fully red and firm',
      ],
      beans:    [
        'Water twice weekly — avoid overwatering',
        'Apply phosphorus at flowering stage',
        'Watch for bean fly during emergence',
        'Harvest pods before they dry on vine',
      ],
      wheat:    [
        'Apply top-dressing nitrogen at tillering',
        'Scout for rust disease weekly',
        'Irrigate at heading and grain-fill stages',
        'Harvest at full maturity — golden yellow',
      ],
      tea:      [
        'Pluck every 7–14 days for quality flush',
        'Apply balanced NPK every 3 months',
        'Shade young plants from intense midday sun',
        'Prune heavily every 3–4 years',
      ],
      coffee:   [
        'Water deeply twice a week',
        'Apply mulch 10cm deep around base',
        'Prune dead wood after harvest season',
        'Pick cherries only when bright red',
      ],
      carrots:  [
        'Thin to 5cm spacing when 5cm tall',
        'Water consistently — drought causes forking',
        'Avoid fresh manure — causes hairy roots',
        'Harvest at 15–20cm length for best flavor',
      ],
      apples:   [
        'Thin fruit clusters to 1 per spur',
        'Apply dormant oil spray before bud break',
        'Water deeply once a week in dry season',
        'Harvest when fruit separates easily from branch',
      ],
    },
    planting_season: {
      maize:    'Long rains: March–May | Short rains: October–November',
      tomatoes: 'Year-round with irrigation | Best: June–August',
      beans:    'Long rains: March–April | Short rains: October',
      wheat:    'Highland areas: June–August | Cool dry season',
      tea:      'Year-round | Best establishment: April–June',
      coffee:   'Start of long rains: March–April',
      carrots:  'Cool season: June–September | Also January–February',
      apples:   'Highland Kenya: April–June planting',
    },
    best_months: {
      maize:    ['Mar', 'Apr', 'May', 'Oct', 'Nov'],
      tomatoes: ['Jan', 'Feb', 'Jun', 'Jul', 'Aug'],
      beans:    ['Mar', 'Apr', 'Oct', 'Nov'],
      wheat:    ['Jun', 'Jul', 'Aug'],
      tea:      ['Apr', 'May', 'Jun'],
      coffee:   ['Mar', 'Apr', 'May'],
      carrots:  ['Jan', 'Feb', 'Jun', 'Jul', 'Aug', 'Sep'],
      apples:   ['Apr', 'May', 'Jun'],
    },
  },

  sw: {
    plant_today: 'Panda Leo',
    wait_2_days: 'Subiri Siku 2',
    high_risk: 'Hatari ya Hali ya Hewa',
    reasons: {
      ideal:                'Hali ya hewa inafaa kupanda mazao.',
      high_rain_prob:       'Mvua nyingi inatarajiwa katika siku 2 zijazo.',
      heavy_rain:           'Mvua kubwa inatarajiwa — hatari ya maji kujaa.',
      high_wind:            'Upepo ni mkali sana kwa upandaji salama.',
      too_hot:              'Joto ni kali sana kwa zao hili.',
      too_cold:             'Joto ni chini sana kwa zao hili.',
      mild_rain:            'Mvua kidogo inatarajiwa — fikiria kusubiri.',
      conditions_improving: 'Hali itakuwa bora baada ya siku 2.',
    },
    tips: {
      maize:    ['Hakikisha udongo unaondoa maji vizuri', 'Panda kwa kina cha sm 2.5', 'Acha nafasi ya sm 75'],
      tomatoes: ['Weka nguzo mapema', 'Epuka kumwagilia juu', 'Weka matandazo kuhifadhi unyevu'],
      beans:    ['Changanua mbegu na rhizobium', 'Epuka udongo wenye maji mengi', 'Panda safu za sm 45'],
      wheat:    ['Andaa udongo vizuri', 'Panda kwa kina cha sm 3–5', 'Angalia kutu baada ya mvua'],
      tea:      ['Mimea michanga inahitaji kivuli', 'Hakikisha unyevu wa kutosha', 'Kata matawi baada ya mvua'],
      coffee:   ['Panda mahali na kivuli kidogo', 'Tumia udongo tifutifu', 'Weka matandazo mengi'],
      carrots:  ['Legeza udongo hadi sm 30', 'Acha nafasi ya sm 5', 'Hifadhi unyevu wa udongo'],
      apples:   ['Panda mahali na jua kamili', 'Hakikisha hewa inapita vizuri', 'Kata matawi msimu wa kiangazi'],
    },
    maintenance: {
      maize:    [
        'Mwagilia kila siku 3–4 wakati wa ukame',
        'Weka mbolea ya nitrojeni wakati wa ukuaji',
        'Angalia wadudu — tumia dawa iliyoidhinishwa',
        'Vuna maganda yanapokauka na kuwa kahawia',
      ],
      tomatoes: [
        'Mwagilia chini — si juu ya majani',
        'Ondoa machipuo kila wiki',
        'Piga dawa ya ukungu baada ya mvua',
        'Vuna nyanya zikiwa nyekundu na ngumu',
      ],
      beans:    [
        'Mwagilia mara mbili kwa wiki',
        'Weka mbolea ya fosforasi wakati wa maua',
        'Angalia nzi wa maharagwe wakati wa kuota',
        'Vuna maganda kabla hayajakauka',
      ],
      wheat:    [
        'Weka mbolea ya ziada wakati wa matawi',
        'Angalia ugonjwa wa kutu kila wiki',
        'Mwagilia wakati wa masuke na ujazaji',
        'Vuna ukikomaa kikamilifu — rangi ya dhahabu',
      ],
      tea:      [
        'Chuma kila siku 7–14 kwa ubora',
        'Weka mbolea ya NPK kila miezi 3',
        'Linda mimea michanga dhidi ya jua kali',
        'Kata matawi kwa nguvu kila miaka 3–4',
      ],
      coffee:   [
        'Mwagilia kwa kina mara mbili kwa wiki',
        'Weka matandazo sm 10 kuzunguka mzizi',
        'Kata matawi yaliyokufa baada ya mavuno',
        'Chuma matunda tu yaliyokomaa mekundu',
      ],
      carrots:  [
        'Nyoa hadi nafasi ya sm 5 ukiwa sm 5 juu',
        'Mwagilia mara kwa mara — ukame husababisha upotovu',
        'Epuka samadi mpya — husababisha mizizi yenye nywele',
        'Vuna urefu wa sm 15–20 kwa ladha bora',
      ],
      apples:   [
        'Nyoa matunda hadi moja kwa tawi',
        'Piga dawa ya mafuta ya kulala kabla ya chipua',
        'Mwagilia kwa kina mara moja kwa wiki',
        'Vuna matunda yanapoachana kwa urahisi',
      ],
    },
    planting_season: {
      maize:    'Mvua ndefu: Mar–Mei | Mvua fupi: Oct–Nov',
      tomatoes: 'Mwaka mzima na umwagiliaji | Bora: Jun–Ago',
      beans:    'Mvua ndefu: Mar–Apr | Mvua fupi: Oct',
      wheat:    'Maeneo ya juu: Jun–Ago | Msimu baridi kavu',
      tea:      'Mwaka mzima | Bora: Apr–Jun',
      coffee:   'Mwanzo wa mvua ndefu: Mar–Apr',
      carrots:  'Msimu baridi: Jun–Sep | Pia Jan–Feb',
      apples:   'Kenya ya juu: Upandaji Apr–Jun',
    },
    best_months: {
      maize:    ['Mar', 'Apr', 'May', 'Oct', 'Nov'],
      tomatoes: ['Jan', 'Feb', 'Jun', 'Jul', 'Aug'],
      beans:    ['Mar', 'Apr', 'Oct', 'Nov'],
      wheat:    ['Jun', 'Jul', 'Aug'],
      tea:      ['Apr', 'May', 'Jun'],
      coffee:   ['Mar', 'Apr', 'May'],
      carrots:  ['Jan', 'Feb', 'Jun', 'Jul', 'Aug', 'Sep'],
      apples:   ['Apr', 'May', 'Jun'],
    },
  },
}

// ─── Core recommendation logic ────────────────────────────────────────────────
export function getPlantingRecommendation(
  crop: CropType,
  forecast: DailyForecast[],
  lang: 'en' | 'sw' = 'en'
): PlantingRecommendation {
  const profile = CROP_PROFILES[crop]
  const t = TRANSLATIONS[lang]
  const next2Days = forecast.slice(0, 3)
  const today = forecast[0]

  const tooDangerous = next2Days.some(
    (day) => day.temp_max >= profile.danger_temp_max || day.temp_min <= profile.danger_temp_min
  )
  const tooWindy = next2Days.some((day) => day.wind_speed >= profile.max_safe_wind)
  const heavyRain = next2Days.some((day) => day.precipitation_mm >= profile.max_safe_rain_mm)

  if (tooDangerous) {
    return {
      status: 'high_risk',
      reason: today.temp_max >= profile.danger_temp_max ? t.reasons.too_hot : t.reasons.too_cold,
      tips: t.tips[crop],
    }
  }
  if (tooWindy) return { status: 'high_risk', reason: t.reasons.high_wind, tips: t.tips[crop] }
  if (heavyRain) return { status: 'high_risk', reason: t.reasons.heavy_rain, tips: t.tips[crop] }

  const highRainProb = next2Days.some((day) => day.precipitation_probability >= profile.max_safe_rain_prob)
  const mildRainComing = !highRainProb && next2Days.some((day) => day.precipitation_probability >= 40)

  if (highRainProb) return { status: 'wait_2_days', reason: t.reasons.high_rain_prob, tips: t.tips[crop] }
  if (mildRainComing) return { status: 'wait_2_days', reason: t.reasons.mild_rain, tips: t.tips[crop] }

  return { status: 'plant_today', reason: t.reasons.ideal, tips: t.tips[crop] }
}

// ─── Planting calendar ────────────────────────────────────────────────────────
export function getPlantingCalendar(
  crop: CropType,
  lang: 'en' | 'sw' = 'en'
): PlantingCalendar {
  const t = TRANSLATIONS[lang]
  return {
    best_months:      t.best_months[crop],
    planting_season:  t.planting_season[crop],
    maintenance_tips: t.maintenance[crop],
  }
}

// ─── Helper exports ───────────────────────────────────────────────────────────
export function getCropProfile(crop: CropType) {
  return CROP_PROFILES[crop]
}

export function getAllCrops(): { value: CropType; label: string; image: string }[] {
  return (Object.keys(CROP_PROFILES) as CropType[]).map((key) => ({
    value: key,
    label: CROP_PROFILES[key].label,
    image: CROP_IMAGES[key],
  }))
}

export function getBadgeConfig(
  status: PlantingStatus,
  lang: 'en' | 'sw' = 'en'
): { label: string; color: string; bg: string; dot: string; darkBg: string } {
  const t = TRANSLATIONS[lang]
  const configs = {
    plant_today: {
      label: t.plant_today,
      color: 'text-green-700',
      bg: 'bg-green-100 border-green-300',
      darkBg: 'bg-green-900/30 border-green-500/50',
      dot: 'bg-green-500',
    },
    wait_2_days: {
      label: t.wait_2_days,
      color: 'text-yellow-700',
      bg: 'bg-yellow-100 border-yellow-300',
      darkBg: 'bg-yellow-900/30 border-yellow-500/50',
      dot: 'bg-yellow-500',
    },
    high_risk: {
      label: t.high_risk,
      color: 'text-red-700',
      bg: 'bg-red-100 border-red-300',
      darkBg: 'bg-red-900/30 border-red-500/50',
      dot: 'bg-red-500',
    },
  }
  return configs[status]
}