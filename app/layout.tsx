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
  description: 'Portfólio de edição de vídeo profissional por Tatsuo. Edição cinematográfica, dinâmica e focada em retenção para YouTube, TikTok e redes sociais.',
  keywords: ['video editor', 'editor de vídeo', 'premiere pro', 'after effects', 'youtube editor', 'tiktok editor', 'tatsuo', 'audiovisual', 'retenção', 'edição cinematográfica'],
  authors: [{ name: 'Tatsuo' }],
  creator: 'Tatsuo',
  publisher: 'Tatsuo',
  openGraph: {
    title: 'Tatsuo | Video Editor',
    description: 'Portfólio de edição de vídeo profissional por Tatsuo. Edição cinematográfica, dinâmica e focada em retenção para YouTube, TikTok e redes sociais.',
    url: 'https://tatsuosaka.com',
    siteName: 'Tatsuo | Video Editor',
    images: [
      {
        url: 'https://i.ytimg.com/vi/FWU6eZ0eTso/maxresdefault.jpg', // Using one of the project thumbnails as an OG image
        width: 1280,
        height: 720,
        alt: 'Tatsuo | Video Editor',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tatsuo | Video Editor',
    description: 'Portfólio de edição de vídeo profissional. Focado em retenção para YouTube e redes sociais.',
    images: ['https://i.ytimg.com/vi/FWU6eZ0eTso/maxresdefault.jpg'],
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
