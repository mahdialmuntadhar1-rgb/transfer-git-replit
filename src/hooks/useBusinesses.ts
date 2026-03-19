import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { Business } from '../types'

const PAGE_SIZE = 12

interface UseBusinessesOptions {
  governorate?: string
  category?: string
  search?: string
}

interface UseBusinessesResult {
  businesses: Business[]
  totalCount: number
  loading: boolean
  error: string | null
  page: number
  hasMore: boolean
  loadMore: () => void
  reset: () => void
}

export function useBusinesses({ governorate, category, search }: UseBusinessesOptions): UseBusinessesResult {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const fetchBusinesses = useCallback(async (currentPage: number, append: boolean) => {
    setLoading(true)
    setError(null)

    try {
      const from = (currentPage - 1) * PAGE_SIZE
      const to = from + PAGE_SIZE - 1

      let query = supabase
        .from('businesses')
        .select('id, name, phone, category, governorate, created_at', { count: 'exact' })

      if (governorate && governorate !== 'all') {
        query = query.eq('governorate', governorate)
      }

      if (category && category !== 'all') {
        query = query.eq('category', category)
      }

      if (search && search.trim()) {
        query = query.ilike('name', `%${search.trim()}%`)
      }

      const { data, error: sbError, count } = await query.range(from, to).order('created_at', { ascending: false })

      if (sbError) {
        setError(sbError.message)
        return
      }

      if (append) {
        setBusinesses(prev => [...prev, ...(data || [])])
      } else {
        setBusinesses(data || [])
      }

      setTotalCount(count || 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [governorate, category, search])

  useEffect(() => {
    setPage(1)
    fetchBusinesses(1, false)
  }, [governorate, category, search, fetchBusinesses])

  const loadMore = useCallback(() => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchBusinesses(nextPage, true)
  }, [page, fetchBusinesses])

  const reset = useCallback(() => {
    setPage(1)
    fetchBusinesses(1, false)
  }, [fetchBusinesses])

  const hasMore = businesses.length < totalCount

  return { businesses, totalCount, loading, error, page, hasMore, loadMore, reset }
}
