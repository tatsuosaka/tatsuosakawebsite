'use client';

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const links = [
  {
    title: 'Contato',
    url: 'https://api.whatsapp.com/send/?phone=5519991210915&text=Eai+Tatsuo%2C+vi+seu+trabalho+e+gostaria+de+conversar%21&type=phone_number&app_absent=0',
  },
  {
    title: 'Portfolio',
    url: 'https://www.tatsuosaka.com/',
  },
  {
    title: 'Canal do YouTube',
    url: 'https://www.youtube.com/@Tatsuuo',
  }
];

export default function LinksPage() {
  return (
    <main className="min-h-[100svh] bg-black text-white flex flex-col items-center justify-center py-20 px-6 relative selection:bg-white selection:text-black">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[400px] w-full flex flex-col items-center"
      >
        <h1 className="text-6xl tracking-tighter uppercase font-medium mb-3 leading-none">
          Tatsuo
        </h1>
        <p className="text-neutral-400 text-xs md:text-sm tracking-widest uppercase mb-16">
          Video Editor
        </p>

        <div className="w-full flex flex-col gap-5">
          {links.map((link, i) => (
            <motion.a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 + 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group flex border border-neutral-800 hover:border-white transition-colors duration-500 rounded-full pl-8 pr-2 py-2 items-center justify-between w-full bg-black relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-neutral-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
              <span className="relative z-10 text-xs md:text-sm uppercase tracking-widest font-medium text-white transition-colors duration-500">
                {link.title}
              </span>
              <div className="relative z-10 w-10 md:w-12 h-10 md:h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-95 transition-all duration-500 shrink-0">
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform duration-500" />
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
