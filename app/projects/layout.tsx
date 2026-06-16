import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projetos | Tatsuo',
  description: 'Confira meu portfólio completo de edição de vídeo. Trabalhos para YouTube, Shorts, TikTok e vídeos institucionais.',
  openGraph: {
    title: 'Projetos | Tatsuo',
    description: 'Confira meu portfólio completo de edição de vídeo. Trabalhos para YouTube, Shorts, TikTok e vídeos institucionais.',
    url: 'https://tatsuosaka.com/projects',
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
