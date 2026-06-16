'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { useLanguage } from '@/lib/LanguageContext';
import { projects, Project } from '@/lib/data';
import { ProjectCard } from '@/components/ProjectCard';
import { VideoModal } from '@/components/VideoModal';
import { motion } from 'motion/react';

export default function ProjectsPage() {
  const { t } = useLanguage();
  const [shuffledProjects, setShuffledProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    // Randomize projects on client to avoid hydration mismatch
    const shuffled = [...projects].sort(() => 0.5 - Math.random());
    setTimeout(() => {
      setShuffledProjects(shuffled);
    }, 0);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />
      
      <section className="px-6 md:px-12 pt-32 md:pt-48 pb-24 md:pb-40">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 md:mb-24"
          >
            <h1 className="text-4xl md:text-6xl tracking-tighter uppercase font-medium">
              {t('allProjects')}
            </h1>
          </motion.div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 max-sm:gap-4 w-full">
            {shuffledProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: (i % 10) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={project} onClick={setSelectedProject} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <VideoModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  );
}
