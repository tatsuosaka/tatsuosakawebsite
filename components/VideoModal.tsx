'use client';

import { Project } from '@/lib/data';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useEffect } from 'react';

export function VideoModal({ 
  project, 
  onClose 
}: { 
  project: Project | null; 
  onClose: () => void 
}) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-12"
          onClick={onClose}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 md:top-12 md:right-12 z-[110] p-4 text-white hover:text-neutral-400 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className={`relative w-full max-h-full ${project.format === 'vertical' ? 'max-w-md aspect-[9/16]' : 'max-w-6xl aspect-video'} bg-black overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0`}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
