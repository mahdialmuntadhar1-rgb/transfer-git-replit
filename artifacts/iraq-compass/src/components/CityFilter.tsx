import { useRef } from 'react'
import { Language } from '../types'
import { t } from '../lib/translations'

const GOVERNORATES = [
  'Baghdad', 'Erbil', 'Sulaymaniyah', 'Basra', 'Mosul', 'Najaf',
  'Karbala', 'Kirkuk', 'Duhok', 'Diyala', 'Nineveh', 'Diwaniyah',
  'Hillah', 'Amarah', 'Nasiriyah', 'Samawah', 'Tikrit', 'Kut',
  'Ramadi', 'Baquba'
]

interface CityFilterProps {
  selectedCity: string
  language: Language
  onCityChange: (city: string) => void
}

export function CityFilter({ selectedCity, language, onCityChange }: CityFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const cities = ['all', ...GOVERNORATES]

  return (
    <div className="px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {cities.map(city => {
            const isSelected = selectedCity === city
            const label = city === 'all' ? t(language, 'allIraq') : city

            return (
              <button
                key={city}
                onClick={() => onCityChange(city)}
                className="flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap border"
                style={isSelected
                  ? {
                      background: 'linear-gradient(135deg, #6C63FF, #FF6B9D)',
                      border: 'none',
                      color: '#FFFFFF',
                      boxShadow: '0 0 20px rgba(108,99,255,0.4)',
                    }
                  : {
                      background: 'rgba(255,255,255,0.05)',
                      borderColor: 'rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.7)',
                    }
                }
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
