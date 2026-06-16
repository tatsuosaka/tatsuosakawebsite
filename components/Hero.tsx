'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'motion/react';

export function Hero() {
  const { t } = useLanguage();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center px-6 md:px-12 pt-20">
      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show"
        className="max-w-7xl mx-auto w-full flex flex-col items-start"
      >
        <motion.p variants={item} className="uppercase tracking-widest text-sm md:text-base text-neutral-400 mb-6 md:mb-8 font-medium">
          {t('heroSubtitle')}
        </motion.p>
        
        <motion.h1 
          variants={item} 
          className="text-[15vw] md:text-[12vw] leading-[0.85] tracking-tighter uppercase font-medium -ml-[0.04em]"
        >
          {t('heroTitle')}
        </motion.h1>

        <div className="mt-12 md:mt-24 grid grid-cols-1 md:grid-cols-2 w-full gap-8 md:gap-0">
          <motion.p variants={item} className="text-lg md:text-xl text-neutral-400 max-w-sm md:max-w-md font-light leading-relaxed">
            {t('heroDesc')}
          </motion.p>
          
          <motion.div variants={item} className="flex md:justify-end items-end">
            <button 
              onClick={scrollToWork}
              className="group flex items-center gap-4 text-sm uppercase tracking-widest hover:text-neutral-400 transition-colors"
            >
              <span>{t('heroCTA')}</span>
              <div className="w-8 h-[1px] bg-white group-hover:bg-neutral-400 transition-colors group-hover:w-12 duration-300 ease-out" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
