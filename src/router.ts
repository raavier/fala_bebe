import { useEffect, useSyncExternalStore } from 'react';

// Roteamento por hash (#/aprender): funciona no GitHub Pages sem configuração
// de servidor e continua funcionando ao recarregar a página.

function currentPath(): string {
  const raw = window.location.hash.replace(/^#/, '');
  return raw.startsWith('/') ? raw : '/';
}

function subscribe(fn: () => void): () => void {
  window.addEventListener('hashchange', fn);
  return () => window.removeEventListener('hashchange', fn);
}

export function usePath(): string {
  const path = useSyncExternalStore(subscribe, currentPath);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);
  return path;
}

export function navigate(path: string): void {
  window.location.hash = path;
}

export function href(path: string): string {
  return `#${path}`;
}
