'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/components/language-provider'
import { useTheme } from '@/components/theme-provider'
import { Menu, X, Sun, Moon, Globe } from 'lucide-react'

const Navbar = () => {
  const { language, setLanguage, direction, message } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { key: 'home', href: '/' },
    { key: 'categories', href: '/categories' },
    { key: 'products', href: '/products' },
    { key: 'aboutus', href: '/aboutus' },
    { key: 'contact', href: '/contact' },
  ]

  const navigationItems = navLinks.map(link => ({
    ...link,
    label: message(link.key)
  }))

  return (
    <nav
      aria-label="Main Navigation"
      className={`sticky top-0 z-50 w-full border-b border-border bg-background backdrop-blur ${direction === 'rtl' ? 'rtl' : ''}`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 group" title="Alshoaala Marble Home">
          <img
            src={
              theme === 'dark'
                ? language === 'en'
                  ? '/light-mode-en.png'
                  : '/light-mode-ar.png'
                : language === 'en'
                  ? '/dark-mode-en.png'
                  : '/dark-mode-ar.png'
            }
            alt="Alshoaala Marble Logo"
            className="w-40 h-12 sm:w-48 sm:h-12 md:w-56 md:h-12 object-contain group-hover:scale-110 smooth-transition"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navigationItems.map(item => (
            <Link
              key={item.key}
              href={item.href}
              title={item.label}
              className="text-sm font-medium text-foreground smooth-transition relative group focus:outline-none focus:ring-2 focus:ring-accent rounded"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent group-hover:w-full smooth-transition" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            aria-label="Switch Language"
            className="p-2 hover:bg-secondary rounded-lg smooth-transition inline-flex items-center gap-1 text-sm font-medium"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">{language === 'en' ? 'EN' : 'العربية'}</span>
          </button>

          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 hover:bg-secondary rounded-lg smooth-transition"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
            className="md:hidden p-2 hover:bg-secondary rounded-lg smooth-transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navigationItems.map(item => (
              <Link
                key={item.key}
                href={item.href}
                title={item.label}
                className="block px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-lg smooth-transition focus:outline-none focus:ring-2 focus:ring-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
