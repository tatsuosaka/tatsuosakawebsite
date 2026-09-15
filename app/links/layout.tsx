import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Links & Contato Direto',
  description: 'Acesse os canais oficiais e entre em contato direto com Tatsuo para projetos audiovisuais e orçamentos.',
  alternates: {
    canonical: 'https://tatsuosaka.com/links',
  },
  openGraph: {
    title: 'Links & Contato | Tatsuo - Video Editor',
    description: 'Acesse os canais oficiais e entre em contato direto com Tatsuo para projetos audiovisuais e orçamentos.',
    url: 'https://tatsuosaka.com/links',
  },
};

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
