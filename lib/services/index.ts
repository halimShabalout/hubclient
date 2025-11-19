import type {
  Language,
  CategoriesResponse,
  ProductsResponse,
  ProductDetailsResponse,
  AboutUsResponse,
  HomeSliderResponse,
  ContactInfoResponse,
  TranslationsResponse,
} from '@/lib/types'

// Import mock data
import categoriesData from '@/lib/mock/categories.json'
import productsData from '@/lib/mock/products.json'
import homeSliderData from '@/lib/mock/home-slider.json'
import contactInfoData from '@/lib/mock/contact-info.json'
import aboutUsData from '@/lib/mock/about-us.json'
import translationsData from '@/lib/mock/translations.json'

// Simulated API delay for realistic behavior
const API_DELAY = 300

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Categories Service
 */
export async function getCategories(lang: Language): Promise<CategoriesResponse> {
  await delay(API_DELAY)
  
  return {
    ...categoriesData,
    data: categoriesData.data.map(category => ({
      ...category,
      translated: category.translated,
    })),
  } as CategoriesResponse
}

/**
 * Products Service
 */
export async function getProducts(lang: Language, categoryId?: number): Promise<ProductsResponse> {
  await delay(API_DELAY)
  
  let data = productsData.data
  
  // Filter by category if provided
  if (categoryId) {
    data = data.filter(product => product.category_id === categoryId)
  }
  
  return {
    ...productsData,
    data,
    meta: {
      ...productsData.meta,
      count: data.length,
      total: data.length,
    },
  } as ProductsResponse
}

/**
 * Product Details Service
 */
export async function getProductById(id: number, lang: Language): Promise<ProductDetailsResponse> {
  await delay(API_DELAY)
  
  const product = productsData.data.find(p => p.id === id)
  
  if (!product) {
    throw new Error(`Product with id ${id} not found`)
  }
  
  // Mock detailed product data
  const productDetail = {
    ...product,
    specifications: {
      en: {
        color: 'Pure White with Gray Veining',
        finish: 'Polished',
        dimensions: '305 x 305 x 10mm',
        durability: 'High - Suitable for high traffic areas',
      },
      ar: {
        color: 'أبيض نقي مع عروق رمادية',
        finish: 'مصقول',
        dimensions: '305 x 305 x 10ملم',
        durability: 'عالية - مناسبة للمناطق كثيفة الحركة',
      },
    },
    gallery: [
      product.translated[lang]?.image_url || '/placeholder.svg',
      '/white-marble-2.jpg',
      '/white-marble-3.jpg',
      '/white-marble-4.jpg',
    ],
    reviews: [
      {
        id: 1,
        rating: 5,
        comment: {
          en: 'Excellent quality and beautiful finish!',
          ar: 'جودة ممتازة وتشطيب جميل!',
        },
        author: 'Ahmed',
        date: '2024-01-15',
      },
      {
        id: 2,
        rating: 4,
        comment: {
          en: 'Great product, fast delivery.',
          ar: 'منتج رائع، توصيل سريع.',
        },
        author: 'Fatima',
        date: '2024-01-20',
      },
    ],
  }
  
  return {
    data: productDetail,
    message: 'successful',
    statusCode: 200,
  } as ProductDetailsResponse
}

/**
 * About Us Service
 */
export async function getAboutUs(lang: Language): Promise<AboutUsResponse> {
  await delay(API_DELAY)
  
  return aboutUsData as AboutUsResponse
}

/**
 * Home Slider Service
 */
export async function getHomeSlider(lang: Language): Promise<HomeSliderResponse> {
  await delay(API_DELAY)
  
  return homeSliderData as HomeSliderResponse
}

/**
 * Contact Info Service
 */
export async function getContactInfo(lang: Language): Promise<ContactInfoResponse> {
  await delay(API_DELAY)
  
  return contactInfoData as ContactInfoResponse
}

/**
 * Translations Service
 */
export async function getTranslations(lang: Language): Promise<TranslationsResponse> {
  await delay(API_DELAY)
  
  return translationsData as TranslationsResponse
}
