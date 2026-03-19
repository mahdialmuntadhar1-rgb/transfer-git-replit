import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Language } from '../types'
import { t } from '../lib/translations'

const CATEGORIES = [
  { key: 'Dining & Cuisine', icon: '🍽️', en: 'Dining & Cuisine', ar: 'المطاعم والمأكولات', ku: 'چێشتخانە و خواردن' },
  { key: 'Shopping & Retail', icon: '🛍️', en: 'Shopping & Retail', ar: 'التسوق والتجزئة', ku: 'کڕین و بازاڕ' },
  { key: 'Entertainment & Events', icon: '🎭', en: 'Entertainment & Events', ar: 'الترفيه والفعاليات', ku: 'شادمانی و ڕووداوەکان' },
  { key: 'Accommodation & Stay', icon: '🏨', en: 'Accommodation & Stay', ar: 'الإقامة والفنادق', ku: 'ماندووبوون و مێوانخانە' },
  { key: 'Culture & Heritage', icon: '🏛️', en: 'Culture & Heritage', ar: 'الثقافة والتراث', ku: 'کولتوور و میراس' },
  { key: 'Business & Services', icon: '💼', en: 'Business & Services', ar: 'الأعمال والخدمات', ku: 'بازرگانی و خزمەتگوزاری' },
  { key: 'Health & Wellness', icon: '🏥', en: 'Health & Wellness', ar: 'الصحة والعافية', ku: 'تەندروستی و باشبوون' },
  { key: 'Transport & Mobility', icon: '🚗', en: 'Transport & Mobility', ar: 'النقل والتنقل', ku: 'گواستنەوە و گەیاندن' },
  { key: 'Public & Essential', icon: '🏢', en: 'Public & Essential', ar: 'الخدمات العامة', ku: 'خزمەتگوزاری گشتی' },
]

interface CategoryGridProps {
  selectedCategory: string
  language: Language
  onCategoryChange: (category: string) => void
}

export function CategoryGrid({ selectedCategory, language, onCategoryChange }: CategoryGridProps) {
  const [counts, setCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    async function fetchCounts() {
      const results = await Promise.all(
        CATEGORIES.map(async cat => {
          const { count } = await supabase
            .from('businesses')
            .select('id', { count: 'exact', head: true })
            .ilike('category', `%${cat.key.split(' & ')[0]}%`)
          return { key: cat.key, count: count || 0 }
        })
      )
      const map: Record<string, number> = {}
      results.forEach(r => { map[r.key] = r.count })
      setCounts(map)
    }
    fetchCounts()
  }, [])

  return (
    <section className="px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">{t(language, 'exploreCategories')}</h2>
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.key
            const label = language === 'ar' ? cat.ar : language === 'ku' ? cat.ku : cat.en

            return (
              <button
                key={cat.key}
                onClick={() => onCategoryChange(isSelected ? 'all' : cat.key)}
                className="group relative p-4 rounded-2xl border flex flex-col items-center gap-3 transition-all duration-200 cursor-pointer text-center"
                style={isSelected
                  ? {
                      background: 'linear-gradient(135deg, rgba(108,99,255,0.3), rgba(255,107,157,0.3))',
                      borderColor: 'rgba(108,99,255,0.6)',
                      boxShadow: '0 0 30px rgba(108,99,255,0.3)',
                    }
                  : {
                      background: 'rgba(255,255,255,0.05)',
                      borderColor: 'rgba(255,255,255,0.1)',
                    }
                }
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{cat.icon}</span>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white leading-tight">{label}</p>
                  {counts[cat.key] !== undefined && (
                    <p className="text-xs text-white/50 mt-1">{counts[cat.key].toLocaleString()}</p>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
