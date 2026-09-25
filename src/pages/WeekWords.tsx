import { useState, type FormEvent } from 'react';
import { Icon, TopBar } from '../components/ui';
import { WORD_GROUPS, wordExample } from '../content/extras';
import { href } from '../router';
import { useWeekWords } from '../store';

const MAX = 10;
const SUGGESTED = new Set(WORD_GROUPS.flatMap((g) => g.words));

export function WeekWords() {
  const [words, setWords] = useWeekWords();
  const [focus, setFocus] = useState(words[0] ?? 'mais');
  const [draft, setDraft] = useState('');
  const custom = words.filter((w) => !SUGGESTED.has(w));

  const toggle = (w: string) => {
    setFocus(w);
    setWords((prev) => {
      if (prev.includes(w)) return prev.filter((x) => x !== w);
      if (prev.length >= MAX) return prev;
      return [...prev, w];
    });
  };

  const add = (e: FormEvent) => {
    e.preventDefault();
    const w = draft.trim().toLowerCase();
    if (!w) return;
    setDraft('');
    setFocus(w);
    setWords((prev) => (prev.includes(w) || prev.length >= MAX ? prev : [...prev, w]));
  };

  const n = words.length;
  const ex = wordExample(focus);
  const hint = n < 5 ? 'Escolha pelo menos 5' : n >= MAX ? 'Limite de 10 — ótimo!' : 'Entre 5 e 10 é o ideal';

  const chip = (w: string) => {
    const on = words.includes(w);
    return (
      <button key={w} type="button" className={`chip-btn word${w === focus ? ' focus' : ''}`} aria-pressed={on} onClick={() => toggle(w)}>
        {on && <Icon name="check" size={16} />}
        {w}
      </button>
    );
  };

  return (
    <main className="page">
      <TopBar back="/praticar" title="Palavras da semana" />
      <p className="body-text" style={{ fontSize: 15 }}>
        Escolha de 5 a 10 e use muitas vezes por dia, em situações variadas — sem pedir que ele repita. Verbos e palavras sociais destravam mais que
        nome de coisa.
      </p>

      <div className="row">
        <span className={n >= 5 ? 'pill' : 'pill coral'}>{n} escolhidas</span>
        <span className="small">{hint}</span>
      </div>

      {WORD_GROUPS.map((g) => (
        <div key={g.label} className="stack-sm">
          <span className="eyebrow">{g.label}</span>
          <div className="chips">{g.words.map(chip)}</div>
        </div>
      ))}
      {custom.length > 0 && (
        <div className="stack-sm">
          <span className="eyebrow">Suas palavras</span>
          <div className="chips">{custom.map(chip)}</div>
        </div>
      )}

      <form className="row" onSubmit={add}>
        <label className="sr-only" htmlFor="nova-palavra">
          Outra palavra
        </label>
        <input id="nova-palavra" className="input" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Outra palavra…" autoComplete="off" />
        <button type="submit" className="btn dark small" style={{ minHeight: 48, borderRadius: 24 }} disabled={!draft.trim() || n >= MAX}>
          Adicionar
        </button>
      </form>

      <section className="card">
        <h2 className="section-title">
          Como ensinar <span className="display" style={{ color: 'var(--coral)' }}>“{focus}”</span>
        </h2>
        <div className="swap">
          <div className="swap-row">
            <span className="swap-from">
              <span className="swap-label" style={{ padding: 0 }}>
                Em vez de
              </span>
              <span style={{ textDecoration: 'line-through', textDecorationColor: 'var(--coral)' }}>{ex.from}</span>
            </span>
            <span className="swap-to">
              <span className="swap-label teal" style={{ padding: 0, fontFamily: 'var(--body)' }}>
                Diga
              </span>
              {ex.to}
              <small>{ex.note}</small>
            </span>
          </div>
        </div>
        <ol className="steps">
          <li>
            <span>
              <strong>Ache o momento</strong> em que a palavra acontece de verdade.
            </span>
          </li>
          <li>
            <span>
              <strong>Fale como ele falaria</strong>, sozinha e no fim — não como pergunta.
            </span>
          </li>
          <li>
            <span>
              <strong>Diga logo antes de entregar.</strong> A palavra gruda no desejo atendido.
            </span>
          </li>
          <li>
            <span>
              <strong>Repita muito, sem cobrar.</strong> Ela entra primeiro na compreensão.
            </span>
          </li>
        </ol>
      </section>

      <div className="btn-row">
        <a className="btn secondary" href={href('/praticar/quadro')}>
          Ver no quadro
        </a>
        <a className="btn" href={href('/')}>
          Pronto
        </a>
      </div>
    </main>
  );
}
