'use client'

import { useLanguage } from '@/components/language-provider'
import { AboutUs } from '@/lib/types/AboutUs'
import { motion, easeOut } from 'motion/react'

interface AboutUsPageProps {
  aboutUs: AboutUs
  lang: 'en' | 'ar'
}

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
      staggerChildren: 0.08,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
}

const AboutUsPage = ({ aboutUs, lang }: AboutUsPageProps) => {
  const { direction, message } = useLanguage()
  const data = aboutUs.translated

  return (
    <div dir={direction}>
      {/* Hero */}
      <section className="py-28 text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-bold"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {message('about.hero.title', 'About Our Company')}
        </motion.h1>

        <motion.p
          className="text-xl text-muted-foreground mt-6 max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {message(
            'about.hero.subtitle',
            'A legacy of excellence in marble craftsmanship'
          )}
        </motion.p>
      </section>

      {/* Story */}
      <section className="py-24 text-center max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {message('about.story.title', 'Our Story')}
        </motion.h2>

        <p>{data.story}</p>
        <p className="mt-4">{data.mission}</p>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-24 grid md:grid-cols-3 gap-8 container mx-auto">
        {[
          { title: message('about.mission.title', 'Our Mission'), content: data.mission },
          { title: message('about.vision.title', 'Our Vision'), content: data.vision },
          { title: message('about.values.title', 'Our Values'), content: data.values },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="p-8 rounded-3xl bg-card text-center"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
            <p>{item.content}</p>
          </motion.div>
        ))}
      </section>
    </div>
  )
}

export default AboutUsPage
