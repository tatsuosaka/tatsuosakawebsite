'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { projects, Project } from '@/lib/data';
import { ProjectCard } from './ProjectCard';
import { VideoModal } from './VideoModal';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type FilterType = 'all' | 'gaming' | 'commercial';

export function WorkGrid() {
  const { t } = useLanguage();
  const [shuffledProjects, setShuffledProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    // Randomize projects on client to avoid hydration mismatch
    const shuffled = [...projects].sort(() => 0.5 - Math.random());
    setShuffledProjects(shuffled);
  }, []);

  const filteredProjects = shuffledProjects
    .filter(p => filter === 'all' ? true : p.section === filter)
    .slice(0, 9);

  return (
    <>
      <section id="work" className="px-6 md:px-12 py-24 md:py-40">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-8"
          >
            <h2 className="text-4xl md:text-6xl tracking-tighter uppercase font-medium">
              {t('selectedWork')}
            </h2>
            <Link 
              href="/projects"
              className="group flex items-center gap-4 text-sm uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
            >
              {t('viewAll')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="flex flex-wrap gap-2 md:gap-4 mb-8 md:mb-12">
            {(['all', 'gaming', 'commercial'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-full text-sm md:text-base uppercase tracking-widest font-medium transition-all duration-300 ${
                  filter === f 
                    ? 'bg-white text-black' 
                    : 'border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-500'
                }`}
              >
                {t(f as 'all' | 'gaming' | 'commercial')}
              </button>
            ))}
          </div>

          {/* Masonry Grid via CSS columns */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 max-sm:gap-4 w-full">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectCard project={project} onClick={setSelectedProject} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
      <VideoModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
