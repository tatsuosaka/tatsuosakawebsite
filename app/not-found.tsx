import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center">
      <h1 className="text-6xl font-light tracking-tighter mb-4">404</h1>
      <p className="text-neutral-400 mb-8 max-w-md text-sm">
        Esta página não existe ou foi removida.
      </p>
      <Link
        href="/"
        className="text-xs uppercase tracking-widest px-6 py-3 border border-white/20 hover:border-white transition-colors"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
