import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Todos os Projetos',
  description: 'Catálogo completo de trabalhos de edição de vídeo por Tatsuo: anúncios comerciais, vídeos para YouTube e conteúdos dinâmicos de gaming.',
  alternates: {
    canonical: 'https://tatsuosaka.com/projects',
  },
  openGraph: {
    title: 'Todos os Projetos | Tatsuo - Video Editor',
    description: 'Catálogo completo de trabalhos de edição de vídeo por Tatsuo: anúncios comerciais, vídeos para YouTube e conteúdos dinâmicos de gaming.',
    url: 'https://tatsuosaka.com/projects',
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
