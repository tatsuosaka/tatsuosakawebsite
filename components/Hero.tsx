'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'motion/react';
import { useState, useCallback, useEffect, useRef } from 'react';
import { projects } from '@/lib/data';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';
const commercialProjects = projects.filter(p => p.section === 'commercial');
const verticalCommercials = commercialProjects.filter(p => p.format === 'vertical');

type VideoConfig = {
  isVertical: boolean;
  id: string;
  start: number;
  secondaryId?: string;
  secondaryStart?: number;
};

function ScrambleText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplayText(prev => 
        prev.split('')
          .map((char, index) => {
            if (index < iteration / 2) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );
      
      if (iteration >= text.length * 2) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
      
      iteration += 1;
    }, 30);
  }, [text, isScrambling]);

  useEffect(() => {
    const interval = setInterval(() => {
      scramble();
    }, 6000);
    return () => clearInterval(interval);
  }, [scramble]);

  return (
    <span onMouseEnter={scramble} className="inline-block" style={{ width: '100%' }}>
      {displayText}
    </span>
  );
}

export function Hero() {
  const { t } = useLanguage();
  const [videoConfig, setVideoConfig] = useState<VideoConfig>({
    id: '0J7jIAEmg6I',
    start: 0,
    isVertical: false,
  });
  const [isVideoReady, setIsVideoReady] = useState(false);
  const iframe1Ref = useRef<HTMLIFrameElement>(null);
  const iframe2Ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (commercialProjects.length === 0) return;
    const timer = setTimeout(() => {
      const randomProject = commercialProjects[Math.floor(Math.random() * commercialProjects.length)];
      const isVertical = randomProject.format === 'vertical';

      if (isVertical) {
        const remainingVerticals = verticalCommercials.filter(p => p.youtubeId !== randomProject.youtubeId);
        const secondProject = remainingVerticals.length > 0
          ? remainingVerticals[Math.floor(Math.random() * remainingVerticals.length)]
          : randomProject;

        setVideoConfig({
          isVertical: true,
          id: randomProject.youtubeId,
          start: Math.floor(Math.random() * 8),
          secondaryId: secondProject.youtubeId,
          secondaryStart: Math.floor(Math.random() * 8),
        });
      } else {
        setVideoConfig({
          isVertical: false,
          id: randomProject.youtubeId,
          start: Math.floor(Math.random() * 50) + 10,
        });
      }
      setIsVideoReady(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const disableCaptionsAndSeek = useCallback(() => {
    [iframe1Ref.current, iframe2Ref.current].forEach((iframe) => {
      if (!iframe || !iframe.contentWindow) return;
      try {
        iframe.contentWindow.postMessage(JSON.stringify({ event: 'listening' }), '*');
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'unloadModule', args: ['captions'] }),
          '*'
        );
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'unloadModule', args: ['cc'] }),
          '*'
        );
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'setOption', args: ['captions', 'track', {}] }),
          '*'
        );
      } catch {
        // ignore
      }
    });
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        // playerState 1 = PLAYING (video has started playback, safe to reveal)
        if (data?.event === 'infoDelivery' && data?.info?.playerState === 1) {
          setIsVideoReady(true);
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener('message', handleMessage);

    // Fallback: fade-in after 1.2s to hide the initial YouTube play button flash
    const fallbackTimer = setTimeout(() => {
      setIsVideoReady(true);
    }, 1200);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(fallbackTimer);
    };
  }, [videoConfig.id, videoConfig.secondaryId]);

  useEffect(() => {
    const timers = [
      setTimeout(disableCaptionsAndSeek, 500),
      setTimeout(disableCaptionsAndSeek, 1200),
      setTimeout(disableCaptionsAndSeek, 2500),
      setTimeout(disableCaptionsAndSeek, 4500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [videoConfig.id, videoConfig.secondaryId, disableCaptionsAndSeek]);

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
    <section className="relative min-h-[100svh] flex flex-col justify-center px-6 md:px-12 pt-20 overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {videoConfig.isVertical && videoConfig.secondaryId ? (
          /* Single vertical video on mobile, two vertical videos side-by-side on desktop */
          <div className="absolute inset-0 flex w-full h-full">
            {/* Left Video (full width on mobile, half on desktop) */}
            <div className="relative flex-1 w-full h-full overflow-hidden">
              <div 
                className={`absolute inset-0 bg-cover bg-center blur-[3px] scale-110 md:scale-[1.75] transition-opacity duration-1000 ${
                  isVideoReady ? 'opacity-30' : 'opacity-60'
                }`}
                style={{ backgroundImage: `url(https://i.ytimg.com/vi/${videoConfig.id}/hqdefault.jpg)` }}
              />
              <iframe
                ref={iframe1Ref}
                key={`v1-${videoConfig.id}-${videoConfig.start}`}
                onLoad={disableCaptionsAndSeek}
                loading="eager"
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-full min-w-full min-h-[56.25vw] pointer-events-none border-0 blur-[3px] scale-110 md:scale-[1.75] transition-opacity duration-1000 ease-out ${
                  isVideoReady ? 'opacity-100' : 'opacity-0'
                }`}
                src={`https://www.youtube.com/embed/${videoConfig.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoConfig.id}&start=${videoConfig.start}&playsinline=1&rel=0&showinfo=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&cc_load_policy=0&cc_lang_pref=off&enablejsapi=1`}
                title="Hero vertical video 1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                tabIndex={-1}
              />
            </div>

            {/* Right Video (hidden on mobile, visible on md+) */}
            <div className="relative hidden md:block flex-1 h-full overflow-hidden">
              <div 
                className={`absolute inset-0 bg-cover bg-center blur-[3px] scale-[1.75] transition-opacity duration-1000 ${
                  isVideoReady ? 'opacity-30' : 'opacity-60'
                }`}
                style={{ backgroundImage: `url(https://i.ytimg.com/vi/${videoConfig.secondaryId}/hqdefault.jpg)` }}
              />
              <iframe
                ref={iframe2Ref}
                key={`v2-${videoConfig.secondaryId}-${videoConfig.secondaryStart}`}
                onLoad={disableCaptionsAndSeek}
                loading="eager"
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-full min-w-full min-h-[56.25vw] pointer-events-none border-0 blur-[3px] scale-[1.75] transition-opacity duration-1000 ease-out ${
                  isVideoReady ? 'opacity-100' : 'opacity-0'
                }`}
                src={`https://www.youtube.com/embed/${videoConfig.secondaryId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoConfig.secondaryId}&start=${videoConfig.secondaryStart}&playsinline=1&rel=0&showinfo=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&cc_load_policy=0&cc_lang_pref=off&enablejsapi=1`}
                title="Hero vertical video 2"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                tabIndex={-1}
              />
            </div>
          </div>
        ) : (
          /* Single horizontal video */
          <>
            <div 
              className={`absolute inset-0 bg-cover bg-center blur-[3px] scale-120 transition-opacity duration-1000 ${
                isVideoReady ? 'opacity-30' : 'opacity-60'
              }`}
              style={{ backgroundImage: `url(https://i.ytimg.com/vi/${videoConfig.id}/hqdefault.jpg)` }}
            />
            <iframe
              ref={iframe1Ref}
              key={`h-${videoConfig.id}-${videoConfig.start}`}
              onLoad={disableCaptionsAndSeek}
              loading="eager"
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-full min-w-[177.78vh] scale-120 pointer-events-none border-0 blur-[3px] transition-opacity duration-1000 ease-out ${
                isVideoReady ? 'opacity-100' : 'opacity-0'
              }`}
              src={`https://www.youtube.com/embed/${videoConfig.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoConfig.id}&start=${videoConfig.start}&playsinline=1&rel=0&showinfo=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&cc_load_policy=0&cc_lang_pref=off&enablejsapi=1`}
              title="Hero background video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              tabIndex={-1}
            />
          </>
        )}

        {/* Subtle dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none z-[1]" />

        {/* Smooth bottom gradient transitioning to work section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-[2]" />
      </div>

      {/* Hero Content with Difference Blend Mode */}
      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show"
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-start mix-blend-difference text-white"
      >
        <motion.p 
          variants={item} 
          className="uppercase tracking-widest text-sm md:text-base text-neutral-200 mb-6 md:mb-8 font-medium mix-blend-difference"
        >
          {t('heroSubtitle')}
        </motion.p>
        
        <motion.h1 
          variants={item} 
          className="text-[15vw] md:text-[12vw] leading-[0.85] tracking-tighter uppercase font-medium -ml-[0.04em] mix-blend-difference text-white select-none"
        >
          <ScrambleText text={t('heroTitle')} />
        </motion.h1>

        <div className="mt-12 md:mt-24 grid grid-cols-1 md:grid-cols-2 w-full gap-8 md:gap-0">
          <motion.p 
            variants={item} 
            className="text-lg md:text-xl text-neutral-200 max-w-sm md:max-w-md font-light leading-relaxed mix-blend-difference"
          >
            {t('heroDesc')}
          </motion.p>
          
          <motion.div variants={item} className="flex md:justify-end items-end">
            <button 
              onClick={scrollToWork}
              className="group flex items-center gap-4 text-sm uppercase tracking-widest text-white hover:opacity-80 transition-opacity mix-blend-difference cursor-pointer"
            >
              <span>{t('heroCTA')}</span>
              <div className="w-8 h-[1px] bg-white group-hover:w-12 transition-all duration-300 ease-out" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
