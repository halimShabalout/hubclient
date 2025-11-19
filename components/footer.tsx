'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/language-provider'
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'

export function Footer() {
  const { language, direction } = useLanguage()

  const navLinks = [
    { key: 'home', href: '/' },
    { key: 'categories', href: '/categories' },
    { key: 'products', href: '/products' },
    { key: 'aboutus', href: '/aboutus' },
    { key: 'contact', href: '/contact' },
  ]

  const navigationLabels = {
    en: ['Home', 'Categories', 'Products', 'About Us', 'Contact'],
    ar: ['الرئيسية', 'الفئات', 'المنتجات', 'معلومات عنا', 'اتصل بنا'],
  }

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
  ]

  return (
    <footer className={`bg-primary text-primary-foreground border-t border-border ${direction === 'rtl' ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              {language === 'en' ? 'Elegant Torch' : 'مؤسسة الشعلة الراقية'}
            </h3>
            <p className="text-sm opacity-90">
              {language === 'en'
                ? 'Premium marble and stone products for your home and business'
                : 'منتجات رخام وحجر فاخرة لمنزلك وعملك'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">
              {language === 'en' ? 'Quick Links' : 'روابط سريعة'}
            </h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link, idx) => (
                <li key={link.href}>
                  <Link href={link.href} className="opacity-80 hover:opacity-100 smooth-transition">
                    {navigationLabels[language][idx]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">
              {language === 'en' ? 'Contact' : 'اتصل'}
            </h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>+1 (555) 123-4567</li>
              <li>info@marblecompany.com</li>
              <li>123 Stone Street, City, State</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">
              {language === 'en' ? 'Follow Us' : 'تابعنا'}
            </h4>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon }, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="p-2 hover:bg-primary-foreground hover:text-primary rounded-lg smooth-transition"
                  aria-label="Social link"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
          <p>
            {language === 'en'
              ? `© ${new Date().getFullYear()} Elegant Torch. All rights reserved.`
              : `© ${new Date().getFullYear()} جميع الحقوق محفوظة , مؤسسة الشعلة الراقية.`}
          </p>
        </div>
      </div>
    </footer>
  )
}
