import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Language } from '../types'
import { t } from '../lib/translations'

const GOVERNORATES = [
  'Baghdad', 'Erbil', 'Sulaymaniyah', 'Basra', 'Mosul', 'Najaf',
  'Karbala', 'Kirkuk', 'Duhok', 'Diyala', 'Nineveh', 'Diwaniyah',
  'Hillah', 'Amarah', 'Nasiriyah', 'Samawah', 'Tikrit', 'Kut',
  'Ramadi', 'Baquba'
]

const CATEGORIES = [
  'Dining & Cuisine', 'Shopping & Retail', 'Entertainment & Events',
  'Accommodation & Stay', 'Culture & Heritage', 'Business & Services',
  'Health & Wellness', 'Transport & Mobility', 'Public & Essential',
]

interface BusinessFormProps {
  language: Language
  onClose: () => void
}

export function BusinessForm({ language, onClose }: BusinessFormProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    governorate: '',
    category: '',
    whatsapp: '',
    description: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.governorate || !form.category) return
    setSubmitting(true)
    setError(null)

    try {
      const { error: sbError } = await supabase.from('businesses').insert({
        name: form.name,
        phone: form.phone || null,
        governorate: form.governorate,
        category: form.category,
      })

      if (sbError) {
        setError(sbError.message)
      } else {
        setSuccess(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setSubmitting(false)
    }
  }

  const labelClass = "block text-sm font-medium text-white/70 mb-1"
  const inputClass = "w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder-white/30 outline-none focus:border-purple-500/50 transition-colors"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-lg rounded-2xl border border-white/10 p-6 overflow-y-auto max-h-[90vh]"
        style={{ background: '#0F1628' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">{t(language, 'listYourBusiness')}</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {success ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✅</div>
            <p className="text-white font-semibold text-lg">{t(language, 'thankYou')}</p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2 rounded-xl text-white font-semibold"
              style={{ background: 'linear-gradient(135deg, #6C63FF, #FF6B9D)' }}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>{t(language, 'businessName')} *</label>
              <input required className={inputClass} placeholder="e.g. Al-Rashid Restaurant" value={form.name} onChange={e => set('name', e.target.value)} />
            </div>

            <div>
              <label className={labelClass}>{t(language, 'phone')}</label>
              <input className={inputClass} type="tel" placeholder="+964 xxx xxx xxxx" value={form.phone} onChange={e => set('phone', e.target.value)} />
            </div>

            <div>
              <label className={labelClass}>{t(language, 'whatsapp')}</label>
              <input className={inputClass} type="tel" placeholder="+964 xxx xxx xxxx" value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} />
            </div>

            <div>
              <label className={labelClass}>{t(language, 'city')} *</label>
              <select required className={inputClass} value={form.governorate} onChange={e => set('governorate', e.target.value)} style={{ background: '#1A2035' }}>
                <option value="">{t(language, 'chooseCity')}</option>
                {GOVERNORATES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            <div>
              <label className={labelClass}>{t(language, 'category')} *</label>
              <select required className={inputClass} value={form.category} onChange={e => set('category', e.target.value)} style={{ background: '#1A2035' }}>
                <option value="">{t(language, 'filterByCategory')}</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className={labelClass}>{t(language, 'description')}</label>
              <textarea
                className={`${inputClass} resize-none`}
                rows={3}
                placeholder={language === 'ar' ? 'وصف مختصر عن عملك…' : language === 'ku' ? 'کورتەیەک دەربارەی بازرگانیەکەت…' : 'Brief description of your business…'}
                value={form.description}
                onChange={e => set('description', e.target.value)}
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl font-semibold text-white disabled:opacity-50 transition-all"
              style={{ background: 'linear-gradient(135deg, #6C63FF, #FF6B9D)' }}
            >
              {submitting ? t(language, 'loading') : t(language, 'submit')}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
