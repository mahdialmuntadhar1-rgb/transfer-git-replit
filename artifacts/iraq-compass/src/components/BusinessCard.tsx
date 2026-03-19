import { Business } from '../types'
import { Language } from '../types'
import { t } from '../lib/translations'

interface BusinessCardProps {
  business: Business
  language: Language
  sponsored?: boolean
}

export function BusinessCard({ business, language, sponsored }: BusinessCardProps) {
  return (
    <div
      className="relative group p-5 rounded-2xl border transition-all duration-300 flex flex-col gap-4"
      style={{
        background: 'rgba(255,255,255,0.05)',
        borderColor: 'rgba(255,255,255,0.1)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(108,99,255,0.3)'
        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(108,99,255,0.4)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = ''
        ;(e.currentTarget as HTMLElement).style.boxShadow = ''
        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'
      }}
    >
      {sponsored && (
        <div
          className="absolute top-3 end-3 px-2 py-0.5 rounded-full text-xs font-bold"
          style={{ background: '#F6C90E', color: '#000' }}
        >
          {t(language, 'sponsored')}
        </div>
      )}

      <div className="flex-1">
        <h3 className="font-semibold text-white text-base leading-tight mb-2 line-clamp-2">
          {business.name}
        </h3>

        <div className="flex flex-wrap gap-2 mb-3">
          <span
            className="px-2 py-0.5 rounded-full text-xs font-medium"
            style={{
              background: 'rgba(108,99,255,0.2)',
              color: 'rgba(180,170,255,1)',
              border: '1px solid rgba(108,99,255,0.3)',
            }}
          >
            {business.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-white/50">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {business.governorate}
          </span>
        </div>

        <div className="text-sm">
          {business.phone ? (
            <a
              href={`tel:${business.phone}`}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="truncate">{business.phone}</span>
            </a>
          ) : (
            <span className="text-white/30 text-xs">{t(language, 'contactUnavailable')}</span>
          )}
        </div>
      </div>

      <button
        className="w-full py-2 px-4 rounded-xl text-sm font-semibold text-white transition-all"
        style={{ background: 'linear-gradient(135deg, #6C63FF, #FF6B9D)' }}
      >
        {t(language, 'viewDetails')}
      </button>
    </div>
  )
}
