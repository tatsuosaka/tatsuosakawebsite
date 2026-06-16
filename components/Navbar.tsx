'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'motion/react';
import Link from 'next/link';

export function Navbar() {
  const { lang, setLang } = useLanguage();

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-8 md:px-12 md:py-12 flex justify-between items-center mix-blend-difference text-white uppercase text-sm font-medium tracking-widest"
    >
      <Link href="/" className="hover:opacity-60 transition-opacity">
        Tatsuo
      </Link>
      <div className="flex gap-2">
        <button 
          onClick={() => setLang('en')}
          className={`transition-opacity ${lang === 'en' ? 'opacity-100' : 'opacity-40 hover:opacity-80'}`}
        >
          EN
        </button>
        <span className="opacity-40">|</span>
        <button 
          onClick={() => setLang('pt')}
          className={`transition-opacity ${lang === 'pt' ? 'opacity-100' : 'opacity-40 hover:opacity-80'}`}
        >
          PT-BR
        </button>
      </div>
    </motion.nav>
  );
}
