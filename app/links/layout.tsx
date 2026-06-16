import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Links | Tatsuo',
  description: 'Links para minhas redes sociais, contato no WhatsApp e portfólio completo.',
  openGraph: {
    title: 'Links | Tatsuo',
    description: 'Links para minhas redes sociais, contato no WhatsApp e portfólio completo.',
    url: 'https://tatsuosaka.com/links',
  },
};

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
