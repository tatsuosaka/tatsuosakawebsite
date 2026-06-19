'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { useLanguage } from '@/lib/LanguageContext';
import { projects, Project } from '@/lib/data';
import { ProjectCard } from '@/components/ProjectCard';
import { VideoModal } from '@/components/VideoModal';
import { motion, AnimatePresence } from 'motion/react';

type FilterType = 'all' | 'gaming' | 'commercial';

export default function ProjectsPage() {
  const { t } = useLanguage();
  const [shuffledProjects, setShuffledProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    // Randomize projects on client to avoid hydration mismatch
    const shuffled = [...projects].sort(() => 0.5 - Math.random());
    setTimeout(() => {
      setShuffledProjects(shuffled);
    }, 0);
  }, []);

  const filteredProjects = shuffledProjects.filter(p => 
    filter === 'all' ? true : p.section === filter
  );

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />
      
      <section className="px-6 md:px-12 pt-32 md:pt-48 pb-24 md:pb-40">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <h1 className="text-4xl md:text-6xl tracking-tighter uppercase font-medium">
              {t('allProjects')}
            </h1>
            
            <div className="flex flex-wrap gap-2 md:gap-4">
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
          </motion.div>

          {shuffledProjects.length > 0 && (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 max-sm:gap-4 w-full">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, i) => (
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
          )}
        </div>
      </section>
      
      <VideoModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  );
}
