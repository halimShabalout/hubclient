export type Language = 'en' | 'ar'

export interface TranslatedContent {
  name: string
  description: string
  image_url?: string
}

export interface ApiLinks {
  self: string
  edit: string
  delete: string
}

export interface ApiMeta {
  total: number
  count: number
  page: number
  limit: number
}

export interface ApiPaginationLinks {
  self: string
  next: string | null
  prev: string | null
}

// Category Types
export interface Category {
  id: number
  createdAt: string
  updatedAt: string
  translated: Record<Language, TranslatedContent>
  _links: ApiLinks
}

export interface CategoriesResponse {
  data: Category[]
  meta: ApiMeta
  links: ApiPaginationLinks
  message: string
  statusCode: number
}

// Product Types
export interface Product {
  id: number
  category_id: number
  createdAt: string
  updatedAt: string
  price: number
  rating: number
  translated: Record<Language, TranslatedContent>
  _links: ApiLinks
}

export interface ProductsResponse {
  data: Product[]
  meta: ApiMeta
  links: ApiPaginationLinks
  message: string
  statusCode: number
}

// Product Details Types
export interface ProductDetail extends Product {
  specifications: Record<Language, {
    color: string
    finish: string
    dimensions: string
    durability: string
  }>
  gallery: string[]
  reviews: Array<{
    id: number
    rating: number
    comment: Record<Language, string>
    author: string
    date: string
  }>
}

export interface ProductDetailsResponse {
  data: ProductDetail
  message: string
  statusCode: number
}

// About Us Types
export interface AboutUs {
  id: number
  createdAt: string
  updatedAt: string
  translated: Record<Language, {
    story: string
    mission: string
    vision: string
    values: string
  }>
  statistics: Array<{
    label: Record<Language, string>
    value: string
  }>
  team: Array<{
    id: number
    name: string
    role: Record<Language, string>
    image_url: string
  }>
  _links: ApiLinks
}

export interface AboutUsResponse {
  data: AboutUs
  message: string
  statusCode: number
}

// Home Slider Types
export interface SliderImage {
  id: number
  image_url: string
  title: Record<Language, string>
  subtitle: Record<Language, string>
  cta_text: Record<Language, string>
  cta_link: string
}

export interface HomeSliderResponse {
  data: SliderImage[]
  message: string
  statusCode: number
}

// Contact Info Types
export interface ContactInfo {
  id: number
  createdAt: string
  updatedAt: string
  phone: string
  whatsapp: string
  email: string
  address: Record<Language, string>
  hours: Record<Language, string>
  social_links: {
    facebook: string
    instagram: string
    twitter: string
  }
  _links: ApiLinks
}

export interface ContactInfoResponse {
  data: ContactInfo
  message: string
  statusCode: number
}

// Translations Types
export interface TranslationStrings extends Record<string, string> {}

export interface TranslationsResponse {
  data: Record<Language, TranslationStrings>
  message: string
  statusCode: number
}
