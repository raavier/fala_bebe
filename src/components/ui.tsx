import { Fragment, type ReactNode } from 'react';
import { href } from '../router';

// ---------- Ícones (traço, 24 × 24) ----------

const ICONS: Record<string, ReactNode> = {
  home: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />,
  route: (
    <>
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="5" r="2" />
      <path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
    </>
  ),
  bookmark: <path d="M6 3h12v18l-6-4-6 4z" />,
  back: <path d="m15 6-6 6 6 6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="m5 12 5 5 9-10" />,
  plus: <path d="M12 5v14M5 12h14" />,
  chevron: <path d="m9 6 6 6-6 6" />,
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2.5 2" />
      <path d="M10 2h4" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 7.5v.5" />
    </>
  ),
  print: (
    <>
      <path d="M7 9V3h10v6" />
      <rect x="3" y="9" width="18" height="8" rx="2" />
      <path d="M7 14h10v7H7z" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16" />
      <path d="M9 7V4h6v3" />
      <path d="M6 7l1 13h10l1-13" />
    </>
  ),
  play: <path d="M8 5v14l11-7z" />,
  pause: <path d="M8 5v14M16 5v14" />,
  reset: (
    <>
      <path d="M4 12a8 8 0 1 0 2.4-5.7" />
      <path d="M4 4v4h4" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V6l11-2v12" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="17.5" cy="16" r="2.5" />
    </>
  ),
  blocks: (
    <>
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" />
      <rect x="8" y="4" width="8" height="8" rx="1.5" />
    </>
  ),
  sprout: (
    <>
      <path d="M12 21V11" />
      <path d="M12 11c0-4 3-6 7-6 0 4-3 6-7 6z" />
      <path d="M12 14c0-3-2-5-6-5 0 3 2 5 6 5z" />
    </>
  ),
  chat: (
    <>
      <path d="M4 6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-6l-5 4v-4H7a3 3 0 0 1-3-3z" />
      <path d="M9 9.5h.01M15 9.5h.01" />
    </>
  ),
  board: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M12 4v16" />
      <path d="M6 9h3M6 13h3M15 9h3" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  smile: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 14.5s1.3 1.5 3.5 1.5 3.5-1.5 3.5-1.5" />
      <path d="M9 9.5h.01M15 9.5h.01" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </>
  ),
  star: <path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" />
};

export type IconName = keyof typeof ICONS;

export function Icon({ name, size = 24, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

// ---------- Texto com **negrito** e *itálico* ----------

export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>;
        if (p.startsWith('*') && p.endsWith('*') && p.length > 2) return <em key={i}>{p.slice(1, -1)}</em>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

// ---------- Estrutura ----------

export function TopBar({ back, title, right }: { back: string; title?: string; right?: ReactNode }) {
  return (
    <div className="topbar">
      <a className="icon-btn" href={href(back)} aria-label="Voltar">
        <Icon name="back" size={20} />
      </a>
      {title && <h1 className="topbar-title">{title}</h1>}
      {right}
    </div>
  );
}

const TABS: { path: string; label: string; icon: IconName; match: (p: string) => boolean }[] = [
  { path: '/', label: 'Início', icon: 'home', match: (p) => p === '/' },
  { path: '/aprender', label: 'Aprender', icon: 'route', match: (p) => p.startsWith('/aprender') },
  { path: '/praticar', label: 'Praticar', icon: 'grid', match: (p) => p.startsWith('/praticar') },
  { path: '/resumo', label: 'Resumo', icon: 'bookmark', match: (p) => p.startsWith('/resumo') || p.startsWith('/sobre') }
];

export function BottomNav({ path }: { path: string }) {
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      {TABS.map((t) => {
        const active = t.match(path);
        return (
          <a key={t.path} href={href(t.path)} className={active ? 'tab active' : 'tab'} aria-current={active ? 'page' : undefined}>
            <Icon name={t.icon} />
            {t.label}
          </a>
        );
      })}
    </nav>
  );
}

export function ProgressBar({ value, label, tone = 'teal' }: { value: number; label?: string; tone?: 'teal' | 'coral' | 'light' }) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100);
  return (
    <div className={`progress progress-${tone}`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={label}>
      <div style={{ width: `${pct}%` }} />
    </div>
  );
}

export function greeting(d = new Date()): string {
  const h = d.getHours();
  if (h >= 5 && h < 12) return 'Bom dia!';
  if (h >= 12 && h < 18) return 'Boa tarde!';
  return 'Boa noite!';
}
