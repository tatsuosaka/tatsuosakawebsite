'use client';

import { Project } from '@/lib/data';
import { useLanguage } from '@/lib/LanguageContext';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'motion/react';

export function ProjectCard({ project, onClick }: { project: Project; onClick: (project: Project) => void }) {
  const { lang, t } = useLanguage();

  const isVertical = project.format === 'vertical';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full mb-6 max-sm:mb-4 overflow-hidden bg-neutral-900 break-inside-avoid"
    >
      <button onClick={() => onClick(project)} className="block relative w-full h-full text-left">
        <div className={`relative w-full ${isVertical ? 'aspect-[9/16]' : 'aspect-video'} overflow-hidden`}>
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Info overlay on hover */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
          <div className="flex items-center justify-between translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-300 font-medium">
                {project.category[lang]}
              </p>
            </div>
            
            <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/30 backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-colors duration-500">
              <Play className="w-4 h-4 ml-1" fill="currentColor" />
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
}
