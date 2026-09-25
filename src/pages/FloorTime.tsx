import { useEffect, useRef, useState } from 'react';
import { Illustration } from '../components/art/scenes';
import { Icon, TopBar } from '../components/ui';

const STEPS = [
  'Celular fora da sala — não no bolso, não virado na mesa.',
  'Sente no chão, na altura dele, de frente.',
  'Deixe ele escolher o que fazer. Ele conduz.',
  'Faça junto e comente, com frases curtas: “Bateu! A panela caiu.”',
  'Pare e espere. Ele reagiu? Responda — e espere de novo.'
];

interface WakeLockLike {
  release: () => Promise<void>;
}

function fmt(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function FloorTime() {
  const [minutes, setMinutes] = useState(10);
  const [endAt, setEndAt] = useState<number | null>(null);
  const [left, setLeft] = useState(minutes * 60_000);
  const [finished, setFinished] = useState(false);
  const [checked, setChecked] = useState<number[]>([]);
  const lock = useRef<WakeLockLike | null>(null);
  const running = endAt !== null;

  useEffect(() => {
    if (endAt === null) return;
    const tick = () => {
      const remaining = endAt - Date.now();
      if (remaining <= 0) {
        setLeft(0);
        setEndAt(null);
        setFinished(true);
        navigator.vibrate?.([200, 100, 200]);
      } else {
        setLeft(remaining);
      }
    };
    tick();
    const t = window.setInterval(tick, 250);
    return () => window.clearInterval(t);
  }, [endAt]);

  // Mantém a tela acesa durante o bloco, quando o navegador permite.
  useEffect(() => {
    const nav = navigator as Navigator & { wakeLock?: { request: (t: 'screen') => Promise<WakeLockLike> } };
    if (running && nav.wakeLock) {
      nav.wakeLock
        .request('screen')
        .then((l) => {
          lock.current = l;
        })
        .catch(() => undefined);
    }
    return () => {
      lock.current?.release().catch(() => undefined);
      lock.current = null;
    };
  }, [running]);

  const choose = (m: number) => {
    if (running) return;
    setMinutes(m);
    setLeft(m * 60_000);
    setFinished(false);
  };

  const startPause = () => {
    if (running) {
      setEndAt(null);
    } else {
      if (finished || left <= 0) {
        setFinished(false);
        setEndAt(Date.now() + minutes * 60_000);
      } else {
        setEndAt(Date.now() + left);
      }
    }
  };

  const reset = () => {
    setEndAt(null);
    setLeft(minutes * 60_000);
    setFinished(false);
  };

  const fresh = !running && left === minutes * 60_000 && !finished;

  return (
    <main className="page">
      <TopBar back="/praticar" title="Bloco de chão" />
      <div className="scene-box">
        <Illustration id="chao" />
      </div>
      <p className="body-text" style={{ fontSize: 15 }}>
        O único item realmente novo — e o mais importante. Não é hora de ensinar, testar ou contar cores: é brincar do jeito dele, comentando e
        esperando.
      </p>

      <section className="card">
        <div className="chips" role="group" aria-label="Duração">
          {[10, 15].map((m) => (
            <button key={m} type="button" className="chip-btn dark" aria-pressed={minutes === m} disabled={running} onClick={() => choose(m)}>
              {m} minutos
            </button>
          ))}
        </div>
        <div className="countdown" role="timer" aria-live="off">
          {finished ? '0:00' : fmt(left)}
        </div>
        <div className="btn-row">
          <button type="button" className={running ? 'btn secondary' : 'btn teal'} onClick={startPause}>
            <Icon name={running ? 'pause' : 'play'} size={20} />
            {running ? 'Pausar' : fresh || finished ? 'Começar' : 'Continuar'}
          </button>
          {!fresh && (
            <button type="button" className="btn secondary" onClick={reset}>
              <Icon name="reset" size={20} />
              Zerar
            </button>
          )}
        </div>
        {finished && (
          <div className="feedback ok" role="status">
            <span className="title">Bloco feito!</span>
            <p>Dez minutos assim rendem mais do que uma hora com você por perto fazendo outra coisa.</p>
          </div>
        )}
      </section>

      <section className="stack">
        <h2 className="section-title">Os 5 passos</h2>
        {STEPS.map((s, i) => {
          const on = checked.includes(i);
          return (
            <label key={i} className={on ? 'check-row on' : 'check-row'}>
              <input type="checkbox" checked={on} onChange={() => setChecked((c) => (on ? c.filter((x) => x !== i) : [...c, i]))} />
              <span>{s}</span>
            </label>
          );
        })}
      </section>
    </main>
  );
}
