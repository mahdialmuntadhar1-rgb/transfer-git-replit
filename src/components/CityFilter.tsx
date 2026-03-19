import { useRef } from 'react'
import { Language } from '../types'
import { t } from '../lib/translations'

const GOVERNORATES = [
  { id: 'all',            en: 'All Iraq',       ar: 'كل العراق',    ku: 'هەموو عێراق' },
  { id: 'Baghdad',        en: 'Baghdad',        ar: 'بغداد',        ku: 'بەغدا' },
  { id: 'Basra',          en: 'Basra',          ar: 'البصرة',       ku: 'بەسرە' },
  { id: 'Nineveh',        en: 'Nineveh',        ar: 'نينوى',        ku: 'نینەوا' },
  { id: 'Erbil',          en: 'Erbil',          ar: 'أربيل',        ku: 'هەولێر' },
  { id: 'Sulaymaniyah',   en: 'Sulaymaniyah',   ar: 'السليمانية',   ku: 'سلێمانی' },
  { id: 'Duhok',          en: 'Duhok',          ar: 'دهوك',         ku: 'دهۆک' },
  { id: 'Kirkuk',         en: 'Kirkuk',         ar: 'كركوك',        ku: 'کەرکوک' },
  { id: 'Anbar',          en: 'Anbar',          ar: 'الأنبار',      ku: 'ئەنبار' },
  { id: 'Diyala',         en: 'Diyala',         ar: 'ديالى',        ku: 'دیاڵە' },
  { id: 'Najaf',          en: 'Najaf',          ar: 'النجف',        ku: 'نەجەف' },
  { id: 'Karbala',        en: 'Karbala',        ar: 'كربلاء',       ku: 'کەربەلا' },
  { id: 'Wasit',          en: 'Wasit',          ar: 'واسط',         ku: 'واسیت' },
  { id: 'Qadisiyyah',     en: 'Qadisiyyah',     ar: 'القادسية',     ku: 'قادسیە' },
  { id: 'Babylon',        en: 'Babylon',        ar: 'بابل',         ku: 'بابل' },
  { id: 'Maysan',         en: 'Maysan',         ar: 'ميسان',        ku: 'مەیسان' },
  { id: 'Dhi Qar',        en: 'Dhi Qar',        ar: 'ذي قار',       ku: 'ژی قار' },
  { id: 'Muthanna',       en: 'Muthanna',       ar: 'المثنى',       ku: 'موسەنا' },
]

interface CityFilterProps {
  selectedCity: string
  language: Language
  onCityChange: (city: string) => void
}

export function CityFilter({ selectedCity, language, onCityChange }: CityFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className="px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {GOVERNORATES.map(gov => {
            const isSelected = selectedCity === gov.id
            const label = language === 'ar' ? gov.ar : language === 'ku' ? gov.ku : gov.en

            return (
              <button
                key={gov.id}
                onClick={() => onCityChange(gov.id)}
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
