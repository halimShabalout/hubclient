'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Sun, Moon, Globe } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import { useLanguage } from '@/components/language-provider'

const navLinks = [
  { key: 'home', href: '/' },
  { key: 'categories', href: '/categories' },
  { key: 'products', href: '/products' },
  { key: 'aboutus', href: '/aboutus' },
  { key: 'contact', href: '/contact' },
]

export default function Navbar() {
  const { language, direction, message, toggleLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const Logo = ({ width = 'w-42', height = 'h-12' }) => (
    <Link href={`/${language}`}>
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
        alt="Logo"
        className={`${width} ${height} object-contain`}
      />
    </Link>
  )

  const ThemeLanguageButtons = () => (
    <div className="flex items-center gap-2 md:gap-4">
      <button onClick={toggleTheme} className="p-2 hover:bg-secondary rounded-lg">
        {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
      </button>
      <button
        onClick={toggleLanguage}
        className="p-2 hover:bg-secondary rounded-lg inline-flex items-center gap-1 text-sm font-bold md:text-sm"
      >
        <Globe className="w-4 h-4 md:w-5 md:h-5" />
        <span>{language === 'en' ? (direction === 'rtl' ? 'العربية' : 'AR') : (direction === 'rtl' ? 'English' : 'EN')}</span>
      </button>
    </div>
  )

 
  const NavLinks = ({ isMobile = false, closeMobileMenu }: { isMobile?: boolean; closeMobileMenu?: () => void }) => (
    <div
      className={isMobile ? 'space-y-3' : 'hidden md:flex items-center gap-8'}
      dir={isMobile ? undefined : language === 'ar' ? 'rtl' : 'ltr'}
    >
      {navLinks.map(link => (
        <Link
          key={link.key}
          href={`/${language}/${link.href}`}
          onClick={closeMobileMenu}
          className={`
            ${isMobile ? `block px-4 py-3 text-base font-medium rounded-lg hover:bg-secondary ${direction === 'rtl' ? 'text-right' : 'text-left'}` : 'relative text-sm font-medium text-foreground group'}
          `}
        >
          {message(link.key)}
          {!isMobile && <span className="absolute bottom-0 start-0 h-0.5 w-0 bg-accent transition-all group-hover:w-full" />}
        </Link>
      ))}
    </div>
  )

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background backdrop-blur">
      <div className="container mx-auto px-4 py-4">
        {/* Small screen */}
        <div className="md:hidden flex items-center justify-between w-full relative">
          {/* List Menu*/}
          <div className="flex-1 flex justify-start">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-secondary rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo in center*/}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Logo />
          </div>

          {/* Thema and language buttons*/}
          <ThemeLanguageButtons />
        </div>

        {/* Large screen */}
        <div className={`hidden md:flex items-center justify-between ${direction === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className="flex-shrink-0">
            <Logo width="w-48" height="h-12" />
          </div>

          <NavLinks />

          <ThemeLanguageButtons />
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4">
            <NavLinks isMobile closeMobileMenu={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </nav>
  )
}
