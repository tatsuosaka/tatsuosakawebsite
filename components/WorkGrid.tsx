'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { projects, Project } from '@/lib/data';
import { ProjectCard } from './ProjectCard';
import { VideoModal } from './VideoModal';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function WorkGrid() {
  const { t } = useLanguage();
  const [shuffledProjects, setShuffledProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    // Randomize projects on client to avoid hydration mismatch
    const shuffled = [...projects].sort(() => 0.5 - Math.random());
    setTimeout(() => {
      setShuffledProjects(shuffled.slice(0, 9));
    }, 0);
  }, []);

  return (
    <>
      <section id="work" className="px-6 md:px-12 py-24 md:py-40">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8"
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

          {/* Masonry Grid via CSS columns */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 max-sm:gap-4 w-full">
            {shuffledProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
            ))}
          </div>
        </div>
      </section>
      <VideoModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
