import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/LanguageContext';
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://tatsuosaka.com'),
  title: {
    default: 'Tatsuo - Premium Video Editor Portfolio',
    template: '%s | Tatsuo - Video Editor',
  },
  description: 'Minimal, cinematic portfolio for Tatsuo, a professional video editor specializing in commercial ads, retention-focused YouTube content, and high-impact social media shorts.',
  keywords: [
    'video editor',
    'editor de vídeo',
    'edição de vídeo',
    'comerciais',
    'commercial video editor',
    'youtube video editor',
    'editor youtube',
    'shorts editor',
    'tiktok editor',
    'motion graphics',
    'color grading',
    'sound design',
    'tatsuo',
    'tatsuo video editor',
    'audiovisual',
    'retenção youtube',
    'premiere pro',
    'after effects'
  ],
  authors: [{ name: 'Tatsuo', url: 'https://tatsuosaka.com' }],
  creator: 'Tatsuo',
  publisher: 'Tatsuo',
  alternates: {
    canonical: 'https://tatsuosaka.com',
    languages: {
      'pt-BR': 'https://tatsuosaka.com',
      'en': 'https://tatsuosaka.com',
    },
  },
  openGraph: {
    title: 'Tatsuo - Premium Video Editor Portfolio',
    description: 'Minimal, cinematic portfolio for Tatsuo, a professional video editor specializing in commercial ads, retention-focused YouTube content, and high-impact social media shorts.',
    url: 'https://tatsuosaka.com',
    siteName: 'Tatsuo | Video Editor',
    images: [
      {
        url: 'https://pbs.twimg.com/profile_banners/1725995255055388672/1736521676',
        width: 1500,
        height: 500,
        alt: 'Tatsuo - Premium Video Editor Portfolio',
      },
    ],
    locale: 'pt_BR',
    alternateLocale: ['en_US'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tatsuo - Premium Video Editor Portfolio',
    description: 'Minimal, cinematic portfolio for Tatsuo, a professional video editor specializing in commercial ads, retention-focused YouTube content, and high-impact social media shorts.',
    images: ['https://pbs.twimg.com/profile_banners/1725995255055388672/1736521676'],
    creator: '@Tatsuuo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://tatsuosaka.com/#person',
      name: 'Tatsuo',
      jobTitle: 'Video Editor & Motion Designer',
      description: 'Editor de vídeo profissional focado em anúncios comerciais, retenção para YouTube e vídeos verticais para mídias sociais.',
      url: 'https://tatsuosaka.com',
      sameAs: [
        'https://www.youtube.com/@Tatsuuo',
        'https://twitter.com/messages/compose?recipient_id=1725995255055388672',
        'https://wa.me/5519991210915'
      ],
      knowsAbout: [
        'Video Editing',
        'Commercial Advertising',
        'YouTube Retention Editing',
        'Color Grading',
        'Sound Design',
        'Motion Graphics',
        'Adobe Premiere Pro',
        'Adobe After Effects'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://tatsuosaka.com/#website',
      url: 'https://tatsuosaka.com',
      name: 'Tatsuo - Premium Video Editor Portfolio',
      description: 'Minimal, cinematic portfolio for Tatsuo, a professional video editor specializing in commercial ads, retention-focused YouTube content, and high-impact social media shorts.',
      publisher: {
        '@id': 'https://tatsuosaka.com/#person'
      },
      inLanguage: ['pt-BR', 'en']
    }
  ]
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        {/* Performance Preconnects for YouTube Assets */}
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        
        {/* Structured Data (Schema.org JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black text-white font-sans antialiased selection:bg-white selection:text-black" suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
