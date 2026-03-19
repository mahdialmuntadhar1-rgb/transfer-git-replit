import { useState } from 'react'
import { Language } from '../types'
import { t } from '../lib/translations'

interface HeaderProps {
  language: Language
  onLanguageChange: (lang: Language) => void
  onListBusiness: () => void
}

export function Header({ language, onLanguageChange, onListBusiness }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLangChange = (lang: Language) => {
    onLanguageChange(lang)
    document.dir = lang === 'en' ? 'ltr' : 'rtl'
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0A0E1A]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6C63FF, #FF6B9D)' }}>
            <span className="text-white font-bold text-sm">IC</span>
          </div>
          <span className="text-xl font-bold" style={{ background: 'linear-gradient(135deg, #6C63FF, #FF6B9D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {t(language, 'businessDirectory')}
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4">
          {/* Language toggle */}
          <div className="flex items-center gap-1 bg-white/5 rounded-2xl p-1 border border-white/10">
            {(['en', 'ar', 'ku'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLangChange(lang)}
                className={`px-3 py-1 rounded-xl text-sm font-medium transition-all ${
                  language === lang
                    ? 'text-white'
                    : 'text-white/60 hover:text-white/80'
                }`}
                style={language === lang ? { background: 'linear-gradient(135deg, #6C63FF, #FF6B9D)' } : {}}
              >
                {lang === 'en' ? 'EN' : lang === 'ar' ? 'العربية' : 'کوردی'}
              </button>
            ))}
          </div>

          <button
            onClick={onListBusiness}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 transition-all"
          >
            {t(language, 'listYourBusiness')}
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/80 hover:text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 space-y-1">
            <span className={`block h-0.5 bg-current transition-all ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0A0E1A] px-4 pb-4 pt-3 space-y-3">
          <div className="flex items-center gap-2">
            {(['en', 'ar', 'ku'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLangChange(lang)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all border ${
                  language === lang
                    ? 'text-white border-transparent'
                    : 'text-white/60 border-white/10 hover:text-white/80'
                }`}
                style={language === lang ? { background: 'linear-gradient(135deg, #6C63FF, #FF6B9D)' } : {}}
              >
                {lang === 'en' ? 'EN' : lang === 'ar' ? 'العربية' : 'کوردی'}
              </button>
            ))}
          </div>
          <button
            onClick={() => { onListBusiness(); setMobileOpen(false) }}
            className="w-full py-2 rounded-xl text-sm font-semibold text-white border border-white/20 bg-white/5"
          >
            {t(language, 'listYourBusiness')}
          </button>
        </div>
      )}
    </header>
  )
}
