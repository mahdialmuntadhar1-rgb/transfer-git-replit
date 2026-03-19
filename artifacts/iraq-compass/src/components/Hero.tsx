import { useState, useEffect, useRef } from 'react'
import { Language } from '../types'
import { t } from '../lib/translations'

interface HeroProps {
  language: Language
  searchText: string
  onSearchChange: (text: string) => void
  onQuickFilter: (category: string) => void
}

const sloganKeys = ['hero1', 'hero2', 'hero3', 'hero4'] as const

export function Hero({ language, searchText, onSearchChange, onQuickFilter }: HeroProps) {
  const [sloganIndex, setSloganIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setSloganIndex(i => (i + 1) % sloganKeys.length)
        setVisible(true)
      }, 500)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const quickFilters = [
    { key: 'events', label: t(language, 'events'), icon: '🎉' },
    { key: 'restaurants', label: t(language, 'restaurants'), icon: '🍽️' },
    { key: 'entertainment', label: t(language, 'entertainment'), icon: '🎭' },
    { key: 'deals', label: t(language, 'deals'), icon: '🏷️' },
  ]

  const handleMicClick = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as unknown as { SpeechRecognition?: new () => SpeechRecognition; webkitSpeechRecognition?: new () => SpeechRecognition }).SpeechRecognition || (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognition }).webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.onresult = (e: SpeechRecognitionEvent) => {
          onSearchChange(e.results[0][0].transcript)
        }
        recognition.start()
      }
    }
    inputRef.current?.focus()
  }

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #6C63FF, transparent)' }} />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #FF6B9D, transparent)' }} />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Rotating slogan */}
        <div className="h-16 sm:h-20 flex items-center justify-center mb-6">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white transition-opacity duration-500"
            style={{ opacity: visible ? 1 : 0 }}
          >
            {t(language, sloganKeys[sloganIndex])}
          </h1>
        </div>

        <p className="text-white/60 text-lg mb-10">
          {language === 'en' && '6,955+ businesses across all of Iraq'}
          {language === 'ar' && 'أكثر من 6,955 عمل في جميع أنحاء العراق'}
          {language === 'ku' && 'زیاتر لە 6,955 بازرگانی لە سەرتاسەری عێراق'}
        </p>

        {/* Search bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <div className="flex items-center gap-3 bg-white/5 border border-white/15 rounded-2xl px-4 py-3 focus-within:border-purple-500/50 transition-colors">
            <svg className="w-5 h-5 text-white/40 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="search"
              value={searchText}
              onChange={e => onSearchChange(e.target.value)}
              placeholder={t(language, 'searchPlaceholder')}
              className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-base"
              dir={language === 'en' ? 'ltr' : 'rtl'}
            />
            <button
              onClick={handleMicClick}
              className="text-white/40 hover:text-white/70 transition-colors p-1"
              aria-label="Voice search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Quick filter pills */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {quickFilters.map(filter => (
            <button
              key={filter.key}
              onClick={() => onQuickFilter(filter.key)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white/80 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <span>{filter.icon}</span>
              <span>{filter.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
