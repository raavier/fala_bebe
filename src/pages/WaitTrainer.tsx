import { useRef, useState } from 'react';
import { Icon, TopBar } from '../components/ui';
import { useWaitHistory } from '../store';

function fmt(s: number): string {
  return s.toFixed(1).replace('.', ',') + ' s';
}

function verdict(s: number): { cls: string; title: string; text: string } {
  if (s < 8) {
    return {
      cls: 'bad',
      title: 'Ainda curtinho',
      text: `Seus 10 segundos duraram ${fmt(s)}. Tente de novo, contando bem devagar: “um elefante, dois elefantes…”.`
    };
  }
  if (s <= 12) {
    return { cls: 'ok', title: 'Na medida!', text: 'É essa a espera. Parece longa pra você — e é o tempo que ele precisa pra organizar uma resposta.' };
  }
  return { cls: 'sun', title: 'Paciência de sobra', text: 'Passou dos 10 segundos. Ótimo treino — mas lembre: a espera termina no primeiro sinal dele.' };
}

export function WaitTrainer() {
  const [history, setHistory] = useWaitHistory();
  const [running, setRunning] = useState(false);
  const [last, setLast] = useState<number | null>(null);
  const start = useRef(0);

  const tap = () => {
    if (running) {
      const secs = (performance.now() - start.current) / 1000;
      setRunning(false);
      setLast(secs);
      setHistory((h) => [secs, ...h].slice(0, 8));
    } else {
      start.current = performance.now();
      setRunning(true);
    }
  };

  const v = last !== null ? verdict(last) : null;
  const done = !running && last !== null;

  return (
    <main className="page">
      <TopBar back="/praticar" title="Treino de espera" />
      <p className="body-text">
        Quase todo mundo espera 2 ou 3 segundos e acha que esperou bastante. Toque em <strong>Começar</strong>, conte até 10 de cabeça e toque de
        novo. Sem olhar o relógio.
      </p>

      <div className="timer-wrap">
        <button type="button" className={`timer-btn${running ? ' running' : done ? ' done' : ''}`} onClick={tap}>
          <span className={done ? 'big result' : 'big'}>{running ? 'Pronto' : done ? fmt(last!) : 'Começar'}</span>
          <span className="hint">
            {running ? 'Contando… toque quando chegar no 10' : done ? 'Toque pra tentar de novo' : 'Depois, conte até 10 de cabeça'}
          </span>
        </button>
      </div>

      <div aria-live="polite">
        {v && !running && (
          <div className={v.cls === 'sun' ? 'card sun' : `feedback ${v.cls}`}>
            <span className="title" style={{ fontSize: 16, fontWeight: 800 }}>
              {v.title}
            </span>
            <p style={{ fontSize: 15, lineHeight: 1.5 }}>{v.text}</p>
          </div>
        )}
      </div>

      {history.length > 0 && (
        <section className="stack">
          <div className="spread">
            <h2 className="section-title">Suas tentativas</h2>
            <button type="button" className="btn secondary small" onClick={() => setHistory([])}>
              Limpar
            </button>
          </div>
          <div className="chips">
            {history.map((s, i) => {
              const good = s >= 8 && s <= 12;
              return (
                <span key={i} className="pill" style={good ? undefined : { background: 'var(--sand)', color: 'var(--muted)' }}>
                  {fmt(s)}
                </span>
              );
            })}
          </div>
        </section>
      )}

      <div className="card tight" style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <span style={{ color: 'var(--teal)' }}>
          <Icon name="smile" size={26} />
        </span>
        <p className="body-text" style={{ fontSize: 15 }}>
          Na hora de verdade: sobrancelha erguida, sorriso, corpo inclinado pra frente. Olhe pra ele, não pro relógio. Qualquer olhar, gesto ou
          som já é a vez dele.
        </p>
      </div>
    </main>
  );
}
