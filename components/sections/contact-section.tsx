'use client'

import { useLanguage } from '@/components/language-provider'
import { useCreateContactRequest } from '@/lib/hooks/useContactRequest'
import { useState } from 'react'
import { ContactInfo } from '@/lib/types/ContactInfo'

interface ContactSectionProps {
  contactInfo: ContactInfo | null
  lang: 'en' | 'ar'
}

const ContactSection = ({ contactInfo, lang }: ContactSectionProps) => {
  const { direction, message } = useLanguage()
  const createContactRequest = useCreateContactRequest()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createContactRequest.mutateAsync(formData)
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (error) {
      console.error('Contact submit error:', error)
    }
  }

  const isRTL = direction === 'rtl'
  const inputFields = [
    { name: 'name', placeholder: message('contact.form.name', 'Your Name'), type: 'text', isHalfWidth: true },
    { name: 'email', placeholder: message('contact.form.email', 'Email Address'), type: 'email', isHalfWidth: true },
    { name: 'phone', placeholder: message('contact.form.phone', 'Phone Number'), type: 'tel', isHalfWidth: false },
  ]
  return (
    <section className="py-20 bg-secondary/50" dir={direction}>
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
          {message('contact.title', 'Contact Us')}
        </h2>

        <p className="text-center text-muted-foreground mb-12">
          {message(
            'contact.subtitle',
            'Have a question? We would love to hear from you.'
          )}
        </p>

        {/* Form */}
        <div className="flex flex-col">
          <h2
            className={`text-3xl font-bold mb-6 ${isRTL ? 'text-right' : 'text-left'
              }`}
          >
            {message('contact.form.title', 'Send us a Message')}
          </h2>

          {submitted && (
            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg text-center font-semibold">
              {message('contact.form.success', 'Message sent successfully!')}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 flex-1">
            {/* Half width inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inputFields.filter(f => f.isHalfWidth).map(f => (
                <input
                  key={f.name}
                  type={f.type}
                  name={f.name}
                  placeholder={f.placeholder}
                  value={formData[f.name as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border border-border
            bg-background text-foreground placeholder:text-muted-foreground
            focus:ring-2 focus:ring-accent focus:border-accent transition-all
            ${isRTL ? 'text-right' : 'text-left'}`}
                />
              ))}
            </div>

            {/* Full width inputs */}
            {inputFields.filter(f => !f.isHalfWidth).map(f => (
              <input
                key={f.name}
                type={f.type}
                name={f.name}
                placeholder={f.placeholder}
                value={formData[f.name as keyof typeof formData]}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg border border-border
          bg-background text-foreground placeholder:text-muted-foreground
          focus:ring-2 focus:ring-accent focus:border-accent transition-all
          ${isRTL ? 'text-right' : 'text-left'}`}
              />
            ))}

            {/* Message */}
            <textarea
              name="message"
              placeholder={message('contact.form.message', 'Your Message')}
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className={`w-full px-4 py-3 rounded-lg border border-border
        bg-background text-foreground placeholder:text-muted-foreground
        focus:ring-2 focus:ring-accent focus:border-accent transition-all resize-none
        ${isRTL ? 'text-right' : 'text-left'}`}
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={createContactRequest.isPending}
              className="w-full px-6 py-3 bg-primary text-primary-foreground
                 font-semibold rounded-lg hover:bg-primary/90
                 focus:ring-2 focus:ring-accent transition-all"
            >
              {createContactRequest.isPending
                ? message('contact.form.submitting', 'Submitting...')
                : message('contact.form.submit', 'Send Message')}
            </button>
          </form>
        </div>


        {/* Direct Contact Info */}
        {contactInfo && (
          <div className="mt-12 pt-12 border-t border-border">
            <p className="text-center text-muted-foreground mb-6">
              {message('contact.direct', 'Or contact us directly:')}
            </p>

            <div className={`flex flex-wrap justify-center gap-8`}>

              <div>
                <p className="font-semibold">{message('contact.phone', 'Phone')}</p>
                <p className="text-muted-foreground" dir="ltr">
                  {contactInfo.phone}
                </p>
              </div>

              <div>
                <p className="font-semibold">{message('contact.email', 'Email')}</p>
                <p className="text-muted-foreground" dir="ltr">
                  {contactInfo.email}
                </p>
              </div>

              <div>
                <p className="font-semibold">{message('contact.whatsapp', 'WhatsApp')}</p>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  className="text-accent hover:underline"
                  dir="ltr"
                >
                  {contactInfo.whatsapp}
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  )
}

export default ContactSection
