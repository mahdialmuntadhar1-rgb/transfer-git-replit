import { useState, useRef } from 'react'
import { Language } from './types'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { CityFilter } from './components/CityFilter'
import { CategoryGrid } from './components/CategoryGrid'
import { BusinessGrid } from './components/BusinessGrid'
import { BusinessForm } from './components/BusinessForm'
import { useBusinesses } from './hooks/useBusinesses'
import { t } from './lib/translations'

const CATEGORY_KEYWORD_MAP: Record<string, string> = {
  events: 'all',
  restaurants: 'Restaurant',
  entertainment: 'all',
  deals: 'General Store',
}

export default function App() {
  const [language, setLanguage] = useState<Language>('en')
  const [selectedCity, setSelectedCity] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchText, setSearchText] = useState('')
  const [showForm, setShowForm] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  const { businesses, totalCount, loading, error, hasMore, loadMore, reset } = useBusinesses({
    governorate: selectedCity === 'all' ? undefined : selectedCity,
    category: selectedCategory === 'all' ? undefined : selectedCategory,
    search: searchText,
  })

  const handleCityChange = (city: string) => {
    setSelectedCity(city)
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleQuickFilter = (key: string) => {
    const mapped = CATEGORY_KEYWORD_MAP[key] || 'all'
    setSelectedCategory(mapped)
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleReset = () => {
    setSelectedCity('all')
    setSelectedCategory('all')
    setSearchText('')
    reset()
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: '#0A0E1A', color: '#FFFFFF', fontFamily: language === 'en' ? "'Inter', sans-serif" : "'Noto Sans Arabic', 'Inter', sans-serif" }}
      dir={language === 'en' ? 'ltr' : 'rtl'}
    >
      <Header
        language={language}
        onLanguageChange={setLanguage}
        onListBusiness={() => setShowForm(true)}
      />

      <main>
        <Hero
          language={language}
          searchText={searchText}
          onSearchChange={setSearchText}
          onQuickFilter={handleQuickFilter}
        />

        <CityFilter
          selectedCity={selectedCity}
          language={language}
          onCityChange={handleCityChange}
        />

        <CategoryGrid
          selectedCategory={selectedCategory}
          selectedGovernorate={selectedCity}
          language={language}
          onCategoryChange={handleCategoryChange}
        />

        <div ref={gridRef}>
          <BusinessGrid
            businesses={businesses}
            totalCount={totalCount}
            loading={loading}
            error={error}
            hasMore={hasMore}
            selectedCity={selectedCity}
            language={language}
            onLoadMore={loadMore}
            onReset={handleReset}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 px-4 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6C63FF, #FF6B9D)' }}>
              <span className="text-white font-bold text-xs">IC</span>
            </div>
            <span className="font-bold" style={{ background: 'linear-gradient(135deg, #6C63FF, #FF6B9D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {t(language, 'businessDirectory')}
            </span>
          </div>
          <p className="text-white/40 text-sm">{t(language, 'footerTagline')}</p>
          <p className="text-white/30 text-xs">© 2025 Iraq Compass. {t(language, 'allRightsReserved')}</p>
        </div>
      </footer>

      {showForm && (
        <BusinessForm language={language} onClose={() => setShowForm(false)} />
      )}
    </div>
  )
}
