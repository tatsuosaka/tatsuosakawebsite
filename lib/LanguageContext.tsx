'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'pt';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

const translations = {
  en: {
    heroTitle: 'Tatsuo',
    heroSubtitle: 'Video Editor',
    heroDesc: 'Over 5 years of experience creating videos for streamers, YouTubers, influencers, and companies.',
    heroCTA: 'View Work',
    selectedWork: 'Selected Work',
    viewAll: 'View All Projects',
    contactTitle: "Let's create\nsomething\ntogether.",
    contactCTA: 'Contact me on WhatsApp',
    contactTwitter: 'Contact me on Twitter',
    allProjects: 'All Projects',
    backHome: 'Back to Home',
    watch: 'Watch',
  },
  pt: {
    heroTitle: 'Tatsuo',
    heroSubtitle: 'Editor de Vídeo',
    heroDesc: 'Mais de 5 anos de experiência criando vídeos para streamers, YouTubers, influenciadores e empresas.',
    heroCTA: 'Ver Projetos',
    selectedWork: 'Projetos Selecionados',
    viewAll: 'Ver Todos os Projetos',
    contactTitle: "Vamos criar\nalgo\njuntos.",
    contactCTA: 'Contate-me no WhatsApp',
    contactTwitter: 'Contate-me no Twitter',
    allProjects: 'Todos os Projetos',
    backHome: 'Voltar ao Início',
    watch: 'Assistir',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  const t = (key: keyof typeof translations.en) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
