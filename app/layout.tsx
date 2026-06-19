import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles
import { LanguageProvider } from '@/lib/LanguageContext';
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Tatsuo | Video Editor',
  description: 'Professional video editing portfolio featuring ads, podcasts, influencers, and branded content.',
  keywords: ['video editor', 'editor de vídeo', 'premiere pro', 'after effects', 'youtube editor', 'tiktok editor', 'tatsuo', 'audiovisual', 'retenção', 'edição cinematográfica'],
  authors: [{ name: 'Tatsuo' }],
  creator: 'Tatsuo',
  publisher: 'Tatsuo',
  openGraph: {
    title: 'Tatsuo | Video Editor',
    description: 'Professional video editing portfolio featuring ads, podcasts, influencers, and branded content.',
    url: 'https://www.tatsuosaka.com/',
    siteName: 'Tatsuo | Video Editor',
    images: [
      {
        url: '/og-image.jpg', // Replace with your image URL when ready
        width: 1200,
        height: 630,
        alt: 'Tatsuo | Video Editor',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tatsuo | Video Editor',
    description: 'Professional video editing portfolio featuring ads, podcasts, influencers, and branded content.',
    images: ['/og-image.jpg'], // Replace with your image URL when ready
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

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-black text-white font-sans antialiased selection:bg-white selection:text-black" suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
