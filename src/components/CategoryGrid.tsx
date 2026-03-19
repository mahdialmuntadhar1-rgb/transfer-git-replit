import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Language } from '../types'
import { t } from '../lib/translations'

const CATEGORIES = [
  { id: 'Restaurant',       icon: '🍽️', label: { en: 'Restaurants',      ar: 'مطاعم',          ku: 'چێشتخانەکان' } },
  { id: 'Café',             icon: '☕', label: { en: 'Cafes',             ar: 'مقاهي',          ku: 'کافێکان' } },
  { id: 'Fast Food',        icon: '🍔', label: { en: 'Fast Food',         ar: 'وجبات سريعة',    ku: 'خواردنی خێرا' } },
  { id: 'Supermarket',      icon: '🛒', label: { en: 'Supermarkets',      ar: 'سوبرماركت',      ku: 'سوپەرمارکت' } },
  { id: 'Clothing',         icon: '👗', label: { en: 'Clothing',          ar: 'ملابس',          ku: 'جلوبەرگ' } },
  { id: 'Electronics',      icon: '📱', label: { en: 'Electronics',       ar: 'إلكترونيات',     ku: 'ئەلیکترۆنیک' } },
  { id: 'Mobile Phones',    icon: '📲', label: { en: 'Mobile Phones',     ar: 'هواتف',          ku: 'مۆبایل' } },
  { id: 'Pharmacy',         icon: '💊', label: { en: 'Pharmacies',        ar: 'صيدليات',        ku: 'دەرمانخانە' } },
  { id: 'Clinic',           icon: '🏥', label: { en: 'Clinics',           ar: 'عيادات',         ku: 'کلینیک' } },
  { id: 'Hospitality',      icon: '🏨', label: { en: 'Hotels',            ar: 'فنادق',          ku: 'ئۆتێل' } },
  { id: 'Bank',             icon: '🏦', label: { en: 'Banks',             ar: 'بنوك',           ku: 'بانک' } },
  { id: 'General Store',    icon: '🏪', label: { en: 'General Stores',    ar: 'محلات عامة',     ku: 'دوکانی گشتی' } },
  { id: 'Car',              icon: '🚗', label: { en: 'Car Services',      ar: 'خدمات السيارات', ku: 'خزمەتی ئۆتۆمبێل' } },
  { id: 'Fuel Station',     icon: '⛽', label: { en: 'Fuel Stations',     ar: 'محطات وقود',     ku: 'بنزینخانە' } },
  { id: 'School',           icon: '🎓', label: { en: 'Schools',           ar: 'مدارس',          ku: 'قوتابخانە' } },
  { id: 'Bakery',           icon: '🥐', label: { en: 'Bakeries',          ar: 'مخابز',          ku: 'نانوایی' } },
  { id: 'Beauty',           icon: '💅', label: { en: 'Beauty',            ar: 'تجميل',          ku: 'جوانکاری' } },
  { id: 'Sports',           icon: '💪', label: { en: 'Gyms & Sports',     ar: 'رياضة وصالات',   ku: 'وەرزش و جیم' } },
]

interface CategoryGridProps {
  selectedCategory: string
  selectedGovernorate: string
  language: Language
  onCategoryChange: (category: string) => void
}

export function CategoryGrid({ selectedCategory, selectedGovernorate, language, onCategoryChange }: CategoryGridProps) {
  const [counts, setCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    async function fetchCounts() {
      const results = await Promise.all(
        CATEGORIES.map(async cat => {
          let query = supabase
            .from('businesses')
            .select('*', { count: 'exact', head: true })
            .eq('category', cat.id)

          if (selectedGovernorate && selectedGovernorate !== 'all') {
            query = query.eq('governorate', selectedGovernorate)
          }

          const { count } = await query
          return { id: cat.id, count: count || 0 }
        })
      )
      const map: Record<string, number> = {}
      results.forEach(r => { map[r.id] = r.count })
      setCounts(map)
    }
    fetchCounts()
  }, [selectedGovernorate])

  return (
    <section className="px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">{t(language, 'exploreCategories')}</h2>
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id
            const label = language === 'ar' ? cat.label.ar : language === 'ku' ? cat.label.ku : cat.label.en

            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(isSelected ? 'all' : cat.id)}
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
                  {counts[cat.id] !== undefined && (
                    <p className="text-xs text-white/50 mt-1">{counts[cat.id].toLocaleString()}</p>
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
