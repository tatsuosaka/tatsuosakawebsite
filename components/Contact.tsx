'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export function Contact() {
  const { t } = useLanguage();

  return (
    <section className="px-6 md:px-12 py-32 md:py-60 min-h-[80svh] flex flex-col justify-center border-t border-neutral-900">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start max-w-4xl"
        >
          <h2 className="text-[10vw] md:text-[8vw] leading-[0.9] tracking-tighter uppercase font-medium mb-12 md:mb-20 whitespace-pre-line">
            {t('contactTitle')}
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="https://wa.me/5519991210915"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex border border-neutral-800 hover:border-white transition-colors duration-500 rounded-full pl-8 pr-2 py-2 items-center gap-6 bg-black"
            >
              <span className="text-sm md:text-base uppercase tracking-widest font-medium group-hover:text-neutral-300 transition-colors duration-500">
                {t('contactCTA')}
              </span>
              <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-95 group-hover:bg-neutral-200 transition-all duration-500">
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-12 transition-transform duration-500" />
              </div>
            </a>

            <a 
              href="https://twitter.com/messages/compose?recipient_id=1725995255055388672"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex border border-neutral-800 hover:border-white transition-colors duration-500 rounded-full pl-8 pr-2 py-2 items-center gap-6 bg-black"
            >
              <span className="text-sm md:text-base uppercase tracking-widest font-medium group-hover:text-neutral-300 transition-colors duration-500">
                {t('contactTwitter')}
              </span>
              <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-95 group-hover:bg-neutral-200 transition-all duration-500">
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-12 transition-transform duration-500" />
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
