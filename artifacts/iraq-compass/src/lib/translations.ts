import { Language } from '../types'

type Translations = {
  searchPlaceholder: string
  exploreCategories: string
  featuredBusinesses: string
  allIraq: string
  viewDetails: string
  businessDirectory: string
  noResults: string
  clearFilters: string
  chooseCity: string
  listYourBusiness: string
  loading: string
  error: string
  showing: string
  businesses: string
  in: string
  loadMore: string
  contactUnavailable: string
  phone: string
  category: string
  city: string
  whatsapp: string
  description: string
  businessName: string
  submit: string
  thankYou: string
  sponsored: string
  tryAgain: string
  filterByCategory: string
  filterByCity: string
  searchResults: string
  hero1: string
  hero2: string
  hero3: string
  hero4: string
  footerTagline: string
  allRightsReserved: string
  events: string
  restaurants: string
  entertainment: string
  deals: string
}

const translations: Record<Language, Translations> = {
  en: {
    searchPlaceholder: 'Search businesses, restaurants, services…',
    exploreCategories: 'Explore Categories',
    featuredBusinesses: 'Featured Businesses',
    allIraq: 'All Iraq',
    viewDetails: 'View Details',
    businessDirectory: 'Iraq Compass',
    noResults: 'No businesses found',
    clearFilters: 'Clear Filters',
    chooseCity: 'Choose a city',
    listYourBusiness: 'List Your Business',
    loading: 'Loading…',
    error: 'Something went wrong. Please try again.',
    showing: 'Showing',
    businesses: 'businesses',
    in: 'in',
    loadMore: 'Load More',
    contactUnavailable: 'Contact unavailable',
    phone: 'Phone',
    category: 'Category',
    city: 'City',
    whatsapp: 'WhatsApp',
    description: 'Description',
    businessName: 'Business Name',
    submit: 'Submit Listing',
    thankYou: "Thank you! We'll review your listing.",
    sponsored: 'Sponsored',
    tryAgain: 'Try Again',
    filterByCategory: 'Filter by category',
    filterByCity: 'Filter by city',
    searchResults: 'Search results',
    hero1: 'Your City Guide — Everything You Need',
    hero2: 'The First Iraqi Business Directory',
    hero3: "What's Happening in Your City Tonight?",
    hero4: 'Find the Best Businesses Across Iraq',
    footerTagline: 'Connecting Iraq, one business at a time.',
    allRightsReserved: 'All rights reserved.',
    events: 'Events',
    restaurants: 'Restaurants',
    entertainment: 'Entertainment',
    deals: 'Deals',
  },
  ar: {
    searchPlaceholder: 'ابحث عن الأعمال، المطاعم، الخدمات…',
    exploreCategories: 'استكشف الفئات',
    featuredBusinesses: 'الأعمال المميزة',
    allIraq: 'كل العراق',
    viewDetails: 'عرض التفاصيل',
    businessDirectory: 'بوصلة العراق',
    noResults: 'لم يتم العثور على أعمال',
    clearFilters: 'مسح الفلاتر',
    chooseCity: 'اختر مدينة',
    listYourBusiness: 'أضف عملك',
    loading: 'جاري التحميل…',
    error: 'حدث خطأ. يرجى المحاولة مرة أخرى.',
    showing: 'عرض',
    businesses: 'أعمال',
    in: 'في',
    loadMore: 'تحميل المزيد',
    contactUnavailable: 'التواصل غير متاح',
    phone: 'الهاتف',
    category: 'الفئة',
    city: 'المدينة',
    whatsapp: 'واتساب',
    description: 'الوصف',
    businessName: 'اسم العمل',
    submit: 'إرسال القائمة',
    thankYou: 'شكراً! سنراجع قائمتك قريباً.',
    sponsored: 'ممول',
    tryAgain: 'حاول مجدداً',
    filterByCategory: 'تصفية حسب الفئة',
    filterByCity: 'تصفية حسب المدينة',
    searchResults: 'نتائج البحث',
    hero1: 'دليلك في المدينة — كل شيء تحتاجه',
    hero2: 'أول دليل أعمال عراقي شامل',
    hero3: 'ماذا يحدث في مدينتك الليلة؟',
    hero4: 'اعثر على أفضل الأعمال في كل العراق',
    footerTagline: 'نربط العراق، عمل تلو الآخر.',
    allRightsReserved: 'جميع الحقوق محفوظة.',
    events: 'الفعاليات',
    restaurants: 'المطاعم',
    entertainment: 'الترفيه',
    deals: 'العروض',
  },
  ku: {
    searchPlaceholder: 'گەڕان بۆ بازرگانی، چێشتخانە، خزمەتگوزاری…',
    exploreCategories: 'دۆخەکان بگەڕێ',
    featuredBusinesses: 'بازرگانیە تایبەتەکان',
    allIraq: 'هەموو عێراق',
    viewDetails: 'وردەکاری ببینە',
    businessDirectory: 'کومپاسی عێراق',
    noResults: 'هیچ بازرگانیەک نەدۆزرایەوە',
    clearFilters: 'فلتەرەکان پاک بکەرەوە',
    chooseCity: 'شارێک هەڵبژێرە',
    listYourBusiness: 'بازرگانیەکەت تۆمار بکە',
    loading: 'چاوەڕوان بە…',
    error: 'هەڵەیەک ڕوویدا. تکایە دووبارە هەوڵ بدەرەوە.',
    showing: 'پیشاندانی',
    businesses: 'بازرگانی',
    in: 'لە',
    loadMore: 'زیاتر بار بکە',
    contactUnavailable: 'پەیوەندی بەردەست نییە',
    phone: 'تەلەفۆن',
    category: 'دۆخ',
    city: 'شار',
    whatsapp: 'واتساپ',
    description: 'وەسف',
    businessName: 'ناوی بازرگانی',
    submit: 'تۆمار بکە',
    thankYou: 'سوپاس! لیستەکەت بررسی دەکەین.',
    sponsored: 'پشتگیری کراو',
    tryAgain: 'دووبارە هەوڵ بدەرەوە',
    filterByCategory: 'فلتەر بە دۆخ',
    filterByCity: 'فلتەر بە شار',
    searchResults: 'ئەنجامەکانی گەڕان',
    hero1: 'ڕێنماکەت لە شار — هەموو ئەوەی پێویستتە',
    hero2: 'یەکەم ڕێنمای بازرگانی عێراقی',
    hero3: 'ئەمشەو چی بۆ شارەکەت ڕوودەدات؟',
    hero4: 'باشترین بازرگانیەکان لە سەرتاسەری عێراق بدۆزەرەوە',
    footerTagline: 'عێراق بە یەک بازرگانی بە یەک بازرگانی دەبەستینەوە.',
    allRightsReserved: 'هەموو مافەکان پارێزراون.',
    events: 'ڕووداوەکان',
    restaurants: 'چێشتخانەکان',
    entertainment: 'شادمانی',
    deals: 'پێشکەشکراوەکان',
  },
}

export function t(lang: Language, key: keyof Translations): string {
  return translations[lang][key]
}

export default translations
