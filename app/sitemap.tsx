import { MetadataRoute } from "next"
import { fetchAllProductsByLanguage } from "@/lib/services/productService"
import { fetchAllCategories } from "@/lib/services/categoriesService"

export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://alshoaala-marble.com"
    const languages: Array<"en" | "ar"> = ["en", "ar"]

    // Static routes
    const staticRoutes = languages.flatMap((lang) =>
        [
            "/",           // home
            "/aboutus",    // about us
            "/categories", // categories
            "/contact",    // contact
            "/products",   // products
        ].map((route) => ({
            url: `${baseUrl}/${lang}${route === "/" ? "" : route}`,
            lastModified: new Date(),
            changeFrequency: "daily" as const,
            priority: 1,
        }))
    )

    try {
        // Fetch dynamic products
        const productRoutes = await Promise.all(
            languages.map(async (lang) => {
                const productsResponse = await fetchAllProductsByLanguage(lang)
                const products = productsResponse.data || []
                return products.map((product) => ({
                    url: `${baseUrl}/${lang}/products/${product.id}`,
                    lastModified: product.updatedAt
                        ? new Date(product.updatedAt)
                        : new Date(),
                    changeFrequency: "weekly" as const,
                    priority: 0.8,
                }))
            })
        )

        // Fetch dynamic categories
        const categoryRoutes = await Promise.all(
            languages.map(async (lang) => {
                const categoriesResponse = await fetchAllCategories(lang)
                const categories = categoriesResponse.data || []
                return categories.map((category) => ({
                    url: `${baseUrl}/${lang}/categories/${category.id}`,
                    lastModified: category.updatedAt
                        ? new Date(category.updatedAt)
                        : new Date(),
                    changeFrequency: "weekly" as const,
                    priority: 0.7,
                }))
            })
        )

        // Flatten arrays
        const flatProductRoutes = productRoutes.flat()
        const flatCategoryRoutes = categoryRoutes.flat()

        return [...staticRoutes, ...flatProductRoutes, ...flatCategoryRoutes]
    } catch (error) {
        console.error("Failed to generate sitemap:", error)
        return staticRoutes
    }
}
