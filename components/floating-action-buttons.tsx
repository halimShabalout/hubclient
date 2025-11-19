'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from './language-provider'

export function FloatingActionButtons() {
  const [isMobile, setIsMobile] = useState(false)
  const { direction } = useLanguage()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const whatsappNumber = '966XXXXXXXXX'
  const phoneNumber = '+966XXXXXXXXX'

  return (
    <>
      {/* Call Button - Mobile Only */}
      {isMobile && (
        <a
          href={`tel:${phoneNumber}`}
          className="fixed bottom-8 left-8 z-40 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          aria-label="Call us"
          title="Call us"
        >
          <svg
            className="w-7 h-7"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap -top-12">
            {direction === 'rtl' ? 'اتصل بنا' : 'Call us'}
          </div>
        </a>
      )}

      {/* WhatsApp Button - All Devices */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed ${isMobile ? 'bottom-8 right-8' : 'bottom-8 right-8'} z-40 w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group`}
        aria-label="WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg
          className="w-8 h-8"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.537 0-2.852-.503-3.8-1.491C5.314 4.338 4.8 2.947 4.8 1.404 4.8.68 5.447 0 6.173 0h2.99c.726 0 1.308.577 1.382 1.303l.266 2.09c.053.42-.19.833-.613 1.04l-1.71.852c.403.644 1.048 1.43 2.082 2.464 1.033 1.035 1.82 1.68 2.464 2.082l.852-1.71c.207-.423.62-.666 1.04-.613l2.09.266c.726.074 1.303.656 1.303 1.382v2.99c0 .726-.577 1.373-1.303 1.373-1.543 0-2.934-.514-4.105-1.685-1.172-1.17-1.685-2.561-1.685-4.105z" />
        </svg>
        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap -top-12">
          {direction === 'rtl' ? 'واتساب' : 'WhatsApp'}
        </div>
      </a>
    </>
  )
}
