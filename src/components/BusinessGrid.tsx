import { Business } from '../types'
import { Language } from '../types'
import { BusinessCard } from './BusinessCard'
import { t } from '../lib/translations'

interface BusinessGridProps {
  businesses: Business[]
  totalCount: number
  loading: boolean
  error: string | null
  hasMore: boolean
  selectedCity: string
  language: Language
  onLoadMore: () => void
  onReset: () => void
}

function SkeletonCard() {
  return (
    <div className="p-5 rounded-2xl border border-white/10 bg-white/5 space-y-4 animate-pulse">
      <div className="h-5 bg-white/10 rounded w-3/4" />
      <div className="flex gap-2">
        <div className="h-4 bg-white/10 rounded-full w-24" />
        <div className="h-4 bg-white/10 rounded-full w-20" />
      </div>
      <div className="h-4 bg-white/10 rounded w-1/2" />
      <div className="h-9 bg-white/10 rounded-xl" />
    </div>
  )
}

export function BusinessGrid({
  businesses,
  totalCount,
  loading,
  error,
  hasMore,
  selectedCity,
  language,
  onLoadMore,
  onReset,
}: BusinessGridProps) {
  const cityLabel = selectedCity === 'all' ? t(language, 'allIraq') : selectedCity

  return (
    <section className="px-4 py-8" id="business-grid">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">{t(language, 'featuredBusinesses')}</h2>
          {!loading && !error && (
            <p className="text-sm text-white/50">
              {t(language, 'showing')} {businesses.length} / {totalCount.toLocaleString()} {t(language, 'businesses')} {t(language, 'in')} {cityLabel}
            </p>
          )}
        </div>

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">⚠️</div>
            <p className="text-white/60 mb-4">{t(language, 'error')}</p>
            <button
              onClick={onReset}
              className="px-6 py-2 rounded-xl font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #6C63FF, #FF6B9D)' }}
            >
              {t(language, 'tryAgain')}
            </button>
          </div>
        )}

        {/* Loading skeletons */}
        {loading && businesses.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && businesses.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-white/60 text-lg mb-4">{t(language, 'noResults')}</p>
            <button
              onClick={onReset}
              className="px-6 py-2 rounded-xl font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #6C63FF, #FF6B9D)' }}
            >
              {t(language, 'clearFilters')}
            </button>
          </div>
        )}

        {/* Grid */}
        {businesses.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {businesses.map(business => (
                <BusinessCard key={business.id} business={business} language={language} />
              ))}
              {/* Show skeleton cards at bottom while loading more */}
              {loading && Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={`loading-${i}`} />)}
            </div>

            {/* Load More */}
            {hasMore && !loading && (
              <div className="text-center mt-10">
                <button
                  onClick={onLoadMore}
                  className="px-8 py-3 rounded-xl font-semibold text-white border border-white/20 bg-white/5 hover:bg-white/10 transition-all"
                >
                  {t(language, 'loadMore')}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
