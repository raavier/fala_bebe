import { useState, type FormEvent } from 'react';
import { Icon, TopBar } from '../components/ui';
import { KIND_LABEL, guessKind } from '../content/extras';
import { href } from '../router';
import { monthKey, monthName, useBoard, useWeekWords, type BoardWord, type WordKind } from '../store';

const KINDS: WordKind[] = ['coisa', 'acao', 'social', 'pessoa', 'som'];

function capitalize(t: string): string {
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function WordBoard() {
  const [board, setBoard] = useBoard();
  const [targets, setTargets] = useWeekWords();
  const current = monthKey();
  const months = [...new Set([...board.map((w) => w.month), current])].sort();
  const [month, setMonth] = useState(current);
  const [draft, setDraft] = useState('');
  const [kind, setKind] = useState<WordKind>('coisa');
  const [once, setOnce] = useState(false);
  const [notice, setNotice] = useState('');

  const inMonth = board.filter((w) => w.month === month);
  const actions = inMonth.filter((w) => w.kind === 'acao');
  const combos = inMonth.filter((w) => w.word.includes(' '));

  const addWord = (raw: string, opts: { kind: WordKind; once: boolean; month: string }): string => {
    const word = raw.trim().toLowerCase();
    if (!word) return '';
    const existing = board.find((w) => w.word === word);
    if (existing) {
      if (existing.once && !opts.once) {
        setBoard((b) => b.map((w) => (w.id === existing.id ? { ...w, once: false } : w)));
        return `Voltou! Tirei o asterisco de “${word}”.`;
      }
      return `“${word}” já está no quadro, em ${monthName(existing.month)}.`;
    }
    setBoard((b) => [...b, { id: newId(), word, month: opts.month, once: opts.once, kind: opts.kind }]);
    return `“${word}” entrou em ${monthName(opts.month)}.`;
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setNotice(addWord(draft, { kind, once, month }));
    setDraft('');
    setOnce(false);
    setKind('coisa');
  };

  const onDraft = (v: string) => {
    setDraft(v);
    const g = guessKind(v);
    if (g) setKind(g);
  };

  const toggleOnce = (w: BoardWord) => setBoard((b) => b.map((x) => (x.id === w.id ? { ...x, once: !x.once } : x)));
  const remove = (w: BoardWord) => {
    if (window.confirm(`Tirar “${w.word}” do quadro?`)) setBoard((b) => b.filter((x) => x.id !== w.id));
  };

  const saiu = (t: string) => {
    const msg = addWord(t, { kind: guessKind(t) ?? 'coisa', once: false, month: current });
    setTargets((prev) => prev.filter((x) => x !== t));
    setMonth(current);
    setNotice(msg || `“${t}” saiu!`);
  };

  return (
    <main className="page">
      <div className="no-print stack" style={{ gap: 16 }}>
        <TopBar back="/praticar" title="Quadro de palavras" />
        <p className="body-text" style={{ fontSize: 15 }}>
          Anote as palavras conforme elas aparecem, mês a mês. Comece por <strong>tudo que ele já fala hoje</strong> — é o ponto de partida.
        </p>

        <div className="tabs" role="tablist" aria-label="Meses">
          {months.map((m) => (
            <button key={m} type="button" role="tab" aria-selected={m === month} onClick={() => setMonth(m)}>
              {capitalize(monthName(m))}
            </button>
          ))}
        </div>

        <div className="stat-grid">
          <div className="stat">
            <b>{inMonth.length}</b>
            <span>{inMonth.length === 1 ? 'palavra' : 'palavras'} em {monthName(month)}</span>
          </div>
          <div className="stat">
            <b style={{ color: 'var(--coral)' }}>{actions.length}</b>
            <span>{actions.length === 1 ? 'ação (verbo)' : 'ações (verbos)'}</span>
          </div>
          <div className="stat">
            <b style={{ color: 'var(--teal)' }}>{board.length}</b>
            <span>no total</span>
          </div>
        </div>

        <section className="word-list" aria-label={`Palavras de ${monthName(month)}`}>
          {inMonth.length === 0 ? (
            <p className="empty">Nenhuma palavra em {monthName(month)} ainda.</p>
          ) : (
            inMonth.map((w) => (
              <div key={w.id} className="word-item">
                <span className="w">
                  {w.word}
                  {w.once && <span className="star"> *</span>}
                </span>
                <span className={`kind kind-${w.kind}`}>{KIND_LABEL[w.kind]}</span>
                <button
                  type="button"
                  className="mini-btn"
                  aria-pressed={w.once}
                  aria-label={w.once ? `“${w.word}” voltou: tirar o asterisco` : `Marcar “${w.word}” como dita só uma vez`}
                  onClick={() => toggleOnce(w)}
                >
                  *
                </button>
                <button type="button" className="mini-btn" aria-label={`Tirar “${w.word}” do quadro`} onClick={() => remove(w)}>
                  <Icon name="trash" size={18} />
                </button>
              </div>
            ))
          )}
        </section>

        <form className="card stack" onSubmit={submit}>
          <h2 className="section-title">Palavra nova em {monthName(month)}</h2>
          <div className="row">
            <label className="sr-only" htmlFor="palavra">
              Palavra nova
            </label>
            <input id="palavra" className="input" value={draft} onChange={(e) => onDraft(e.target.value)} placeholder="O que ele disse…" autoComplete="off" />
            <button type="submit" className="icon-btn" style={{ width: 48, height: 48, borderRadius: 24, background: 'var(--ink)', color: '#fff', border: 0 }} aria-label="Adicionar palavra" disabled={!draft.trim()}>
              <Icon name="plus" size={22} />
            </button>
          </div>
          <div className="chips" role="group" aria-label="Tipo de palavra">
            {KINDS.map((k) => (
              <button key={k} type="button" className="chip-btn dark" style={{ minHeight: 38, fontSize: 14 }} aria-pressed={kind === k} onClick={() => setKind(k)}>
                {KIND_LABEL[k]}
              </button>
            ))}
          </div>
          <label className="check-row plain">
            <input type="checkbox" checked={once} onChange={(e) => setOnce(e.target.checked)} />
            Só apareceu uma vez (marca com *)
          </label>
          <p className="small" aria-live="polite">
            {notice}
          </p>
        </form>

        <section className="card coral">
          <div className="spread">
            <h2 className="section-title">◦ Palavras da semana</h2>
            <a href={href('/praticar/palavras')} style={{ fontWeight: 800, fontSize: 14, textDecoration: 'none' }}>
              {targets.length ? 'Trocar' : 'Escolher'}
            </a>
          </div>
          {targets.length ? (
            <>
              <div className="chips">
                {targets.map((t) => (
                  <span key={t} className="target-chip">
                    {t}
                    <button type="button" onClick={() => saiu(t)} aria-label={`“${t}” saiu: passar pro quadro`}>
                      Saiu!
                    </button>
                  </span>
                ))}
              </div>
              <span className="small" style={{ color: 'var(--coral-dark)' }}>
                Quando uma delas sair da boca dele, toque em “Saiu!” e ela passa pro mês.
              </span>
            </>
          ) : (
            <span className="small" style={{ color: 'var(--coral-dark)' }}>
              Nenhuma escolhida ainda.
            </span>
          )}
        </section>

        <section className="card teal">
          <h2 className="section-title" style={{ color: 'var(--teal-ink)' }}>
            Revisão de {monthName(month)}
          </h2>
          <ol className="steps" style={{ gap: 10 }}>
            <li>
              <span>
                Quantas palavras novas entraram? <strong>{inMonth.length}</strong>
              </span>
            </li>
            <li>
              <span>
                Apareceu algum verbo, ou ainda é só nome de coisa?{' '}
                <strong>{actions.length ? actions.map((w) => w.word).join(', ') : 'ainda não'}</strong>
              </span>
            </li>
            <li>
              <span>Aumentou a variedade de gestos — coisas novas que ele indica sem falar?</span>
            </li>
            <li>
              <span>
                Começou a juntar duas palavras? {combos.length > 0 && <strong>{combos.map((w) => `“${w.word}”`).join(', ')}</strong>}
              </span>
            </li>
          </ol>
          <span className="small" style={{ color: 'var(--teal-dark)' }}>
            O que interessa é a trajetória, não o total.
          </span>
        </section>

        <section className="card tight stack">
          <h2 className="section-title">O que conta como palavra</h2>
          <p className="body-text" style={{ fontSize: 14 }}>
            <strong>Conta:</strong> aproximações de sempre (“ága” pra água), sons com sentido (“au-au”, “brum”), palavras usadas num contexto só.
          </p>
          <p className="body-text" style={{ fontSize: 14 }}>
            <strong>Não conta:</strong> repetir logo depois de você. Precisa vir por iniciativa dele.
          </p>
          <p className="body-text" style={{ fontSize: 14 }}>
            <strong style={{ color: 'var(--coral)' }}>*</strong> apareceu uma vez e ainda não voltou — é normal sumir por semanas. Quando voltar, tire o
            asterisco.
          </p>
        </section>

        <button type="button" className="btn secondary block" onClick={() => window.print()}>
          <Icon name="print" />
          Imprimir pra geladeira ou levar à consulta
        </button>
      </div>

      <PrintBoard board={board} months={months} targets={targets} />
    </main>
  );
}

function PrintBoard({ board, months, targets }: { board: BoardWord[]; months: string[]; targets: string[] }) {
  return (
    <div className="print-only print-board">
      <h1>Palavras do bebê</h1>
      <div className="print-cols">
        {months.map((m) => (
          <div key={m}>
            <h2>{monthName(m, true)}</h2>
            <ul>
              {board
                .filter((w) => w.month === m)
                .map((w) => (
                  <li key={w.id}>
                    {w.word}
                    {w.once ? ' *' : ''}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      {targets.length > 0 && <p className="print-targets">{targets.map((t) => `◦ ${t}`).join('    ')}   ← palavras da semana</p>}
    </div>
  );
}
