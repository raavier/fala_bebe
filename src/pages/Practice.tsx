import { useState } from 'react';
import { Icon, type IconName } from '../components/ui';
import { MOMENTS, momentForHour } from '../content/extras';
import { href } from '../router';

const TOOLS: { path: string; title: string; desc: string; icon: IconName; tone: string }[] = [
  { path: '/praticar/espera', title: 'Treino de espera', desc: 'Calibre seus 10 segundos', icon: 'clock', tone: 'coral' },
  { path: '/praticar/palavras', title: 'Palavras da semana', desc: 'Escolha de 5 a 10 e veja como ensinar', icon: 'chat', tone: 'sun' },
  { path: '/praticar/quadro', title: 'Quadro de palavras', desc: 'O quadro da geladeira, no bolso', icon: 'board', tone: 'teal' },
  { path: '/praticar/marcos', title: 'Marcos por idade', desc: 'O que esperar — e o que pesa mais', icon: 'sprout', tone: 'navy' },
  { path: '/praticar/chao', title: 'Bloco de chão', desc: '10 a 15 min: celular fora, ele conduz', icon: 'blocks', tone: 'coral' },
  { path: '/praticar/musicas', title: 'Músicas com gesto', desc: 'Cante e pare antes da última palavra', icon: 'music', tone: 'sun' }
];

export function Practice() {
  const [moment, setMoment] = useState(() => momentForHour(new Date().getHours()));
  const current = MOMENTS.find((m) => m.id === moment) ?? MOMENTS[0];
  return (
    <main className="page">
      <header className="stack-sm">
        <h1 className="h1">Praticar</h1>
        <p className="lead" style={{ fontSize: 15 }}>
          Ferramentas pra usar no meio do dia, com o bebê por perto.
        </p>
      </header>

      <section className="card hero-teal" aria-labelledby="momento">
        <div className="row">
          <Icon name="sun" />
          <span id="momento" className="eyebrow" style={{ color: '#fff' }}>
            Nos momentos do dia · {current.label}
          </span>
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.5 }} aria-live="polite">
          {current.tip}
        </p>
        <div className="chips" role="group" aria-label="Escolha o momento">
          {MOMENTS.map((m) => (
            <button key={m.id} type="button" className="chip-btn onteal" aria-pressed={m.id === moment} onClick={() => setMoment(m.id)}>
              {m.label}
            </button>
          ))}
        </div>
      </section>

      <div className="tool-grid">
        {TOOLS.map((t) => (
          <a key={t.path} className="tool" href={href(t.path)}>
            <span className={`ico ${t.tone}`}>
              <Icon name={t.icon} size={28} />
            </span>
            <strong>{t.title}</strong>
            <span className="desc">{t.desc}</span>
          </a>
        ))}
      </div>
    </main>
  );
}
