'use client'

import Link from 'next/link'
import {
  SiSnapchat,
  SiTiktok,
  SiFacebook,
  SiLinkedin,
  SiInstagram,
  SiX,
  SiYoutube,
  SiWhatsapp,
} from 'react-icons/si'
import { useLanguage } from '@/components/language-provider'

const SOCIAL_ICONS = {
  Snapchat: SiSnapchat,
  Tiktok: SiTiktok,
  Facebook: SiFacebook,
  Linkedin: SiLinkedin,
  Instagram: SiInstagram,
  X: SiX,
  Youtube: SiYoutube,
  Whatsapp: SiWhatsapp,
} as const

type SocialIconName = keyof typeof SOCIAL_ICONS

interface FooterProps {
  language: 'en' | 'ar'
  contactInfo?: {
    phone?: string
    email?: string
    translated?: { address?: string }
  }
  socialLinks?: Array<{ icon: string; url: string }>
}

export default function Footer({
  contactInfo,
  socialLinks,
}: FooterProps) {
  const { language, direction, message } = useLanguage()

  const navLinks = [
    { key: 'home', href: `/${language}` },
    { key: 'categories', href: `/${language}/categories` },
    { key: 'products', href: `/${language}/products` },
    { key: 'aboutus', href: `/${language}/aboutus` },
    { key: 'contact', href: `/${language}/contact` },
  ]

  return (
    <footer
      className="bg-primary text-primary-foreground border-t border-border"
      dir={direction}
    >
      <div className="container mx-auto px-4 py-12">
        {/* Main Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 ${direction === 'rtl' ? 'text-right' : 'text-left'
            }`}
        >
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              {message('footer.company', 'Alshoaala Marble')}
            </h3>
            <p className="text-sm opacity-90">
              {message('footer.description', 'Premium marble company in Jeddah')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">
              {message('footer.quickLinks', 'Quick Links')}
            </h4>
            <ul className="space-y-2 text-sm" dir={direction}>
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {message(link.key, link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">
              {message('footer.contact', 'Contact')}
            </h4>
            <ul
              className={`space-y-2 text-sm opacity-80 ${direction === 'rtl' ? 'text-right' : 'text-left'
                }`}
            >
              {contactInfo?.phone && <li dir="ltr">{contactInfo.phone}</li>}
              {contactInfo?.email && <li>{contactInfo.email}</li>}
              {contactInfo?.translated?.address && (
                <li>{contactInfo.translated.address}</li>
              )}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">
              {message('footer.followUs', 'Follow Us')}
            </h4>
            <div
              className={`flex gap-4 ${direction === 'rtl'
                  ? 'justify-end flex-row-reverse'
                  : 'justify-start'
                }`}
            >
              {socialLinks?.map((item, idx) => {
                const Icon = SOCIAL_ICONS[item.icon as SocialIconName]
                return (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-primary-foreground hover:text-primary transition-colors"
                    aria-label={item.icon}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div
          className={"border-t border-primary-foreground/20 pt-8 text-sm opacity-80 text-center"}
        >
          © {new Date().getFullYear()}{' '}
          {message('footer.company', 'Alshoaala Marble')}.{' '}
          {message('footer.rights', 'All rights reserved')}.
        </div>
      </div>
    </footer>
  )
}
