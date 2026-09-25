import { useEffect, useState } from 'react';
import { Badge, Illustration } from '../components/art/scenes';
import { Icon, Rich } from '../components/ui';
import { LESSONS, lessonById } from '../content/lessons';
import type { Card, ChoiceQuestion, Lesson, OrderQuestion, Question } from '../content/types';
import { href, navigate } from '../router';
import { todayKey, useMission, useProgress } from '../store';

export function LessonPage({ id }: { id: string }) {
  const lesson = lessonById(id);
  if (!lesson) {
    return (
      <main className="page no-nav">
        <h1 className="h2">Lição não encontrada</h1>
        <a className="btn" href={href('/aprender')}>
          Ver a trilha
        </a>
      </main>
    );
  }
  return <LessonFlow lesson={lesson} />;
}

function LessonFlow({ lesson }: { lesson: Lesson }) {
  const [progress, setProgress] = useProgress();
  const [, setMission] = useMission();
  const saved = progress[lesson.id];
  const total = lesson.cards.length;
  // Retoma do último cartão visto, a não ser que a lição já esteja concluída.
  const [step, setStep] = useState(() => (saved && !saved.done ? Math.min(Math.max(saved.card, 0), total - 1) : 0));
  const [score, setScore] = useState<{ right: number; total: number } | null>(null);

  const goTo = (s: number) => {
    setStep(s);
    window.scrollTo(0, 0);
    if (s < total) {
      setProgress((prev) => {
        const cur = prev[lesson.id] ?? { card: -1, done: false };
        return { ...prev, [lesson.id]: { ...cur, card: Math.max(cur.card, s) } };
      });
    }
  };

  // Marca o primeiro cartão como visto ao abrir
  useEffect(() => {
    setProgress((prev) => (prev[lesson.id] ? prev : { ...prev, [lesson.id]: { card: 0, done: false } }));
  }, [lesson.id, setProgress]);

  const finishQuiz = (right: number, count: number) => {
    setScore({ right, total: count });
    setProgress((prev) => ({ ...prev, [lesson.id]: { card: total - 1, done: true, score: right, total: count } }));
    setMission({ lessonId: lesson.id, date: todayKey(), checked: [] });
    setStep(total + 1);
    window.scrollTo(0, 0);
  };

  const segments = Array.from({ length: total + 1 }, (_, i) => i);

  if (step > total) {
    return <DoneView lesson={lesson} score={score} onReview={() => goTo(0)} />;
  }

  return (
    <main className="page no-nav">
      <div className="lesson-top">
        <a className="icon-btn" href={href('/aprender')} aria-label="Fechar lição">
          <Icon name="close" size={20} />
        </a>
        <div className="segments" aria-hidden="true">
          {segments.map((i) => (
            <span key={i} className={`${i === total ? 'quiz' : ''} ${i <= step ? 'on' : ''}`} />
          ))}
        </div>
        <span className="lesson-count">{step < total ? `${step + 1}/${total}` : ''}</span>
      </div>

      {step < total ? (
        <>
          <CardView lesson={lesson} card={lesson.cards[step]} key={step} />
          <div className="lesson-actions btn-row">
            {step > 0 ? (
              <button type="button" className="btn secondary" onClick={() => goTo(step - 1)}>
                Voltar
              </button>
            ) : (
              <a className="btn secondary" href={href('/aprender')}>
                Sair
              </a>
            )}
            <button type="button" className="btn grow-2" onClick={() => goTo(step + 1)}>
              {step === total - 1 ? 'Ir para as perguntas' : 'Continuar'}
            </button>
          </div>
        </>
      ) : (
        <QuizView lesson={lesson} onFinish={finishQuiz} onBack={() => goTo(total - 1)} />
      )}
    </main>
  );
}

// ---------- Cartão de conteúdo ----------

function CardView({ lesson, card }: { lesson: Lesson; card: Card }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="lesson-card">
      <span className="eyebrow coral">
        Lição {lesson.n} · {lesson.title}
      </span>
      {card.scene && (
        <div className="scene-box">
          <Illustration id={card.scene} />
        </div>
      )}
      <h1 className="h2">{card.title}</h1>
      {card.body?.map((p, i) => (
        <p key={i} className="body-text">
          <Rich text={p} />
        </p>
      ))}
      {card.bullets && (
        <ul className="bullets">
          {card.bullets.map((b, i) => (
            <li key={i}>
              <Rich text={b} />
            </li>
          ))}
        </ul>
      )}
      {card.chips && (
        <div className="card tight stack">
          <span style={{ fontSize: 14, fontWeight: 800 }}>{card.chips.label}</span>
          <div className="chips">
            {card.chips.items.map((c) => (
              <span key={c} className="chip">
                {c}
              </span>
            ))}
          </div>
        </div>
      )}
      {card.swap && <SwapTable swap={card.swap} />}
      {card.steps && (
        <ol className="steps">
          {card.steps.map((s, i) => (
            <li key={i}>
              <span>
                <Rich text={s} />
              </span>
            </li>
          ))}
        </ol>
      )}
      {card.table && (
        <div className="table">
          <div className="table-row head">
            <span>{card.table.head[0]}</span>
            <span>{card.table.head[1]}</span>
          </div>
          {card.table.rows.map(([k, v]) => (
            <div key={k} className="table-row">
              <span className="k">{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      )}
      {card.quote && (
        <blockquote className="quote" style={{ margin: 0 }}>
          <Rich text={card.quote} />
        </blockquote>
      )}
      {card.after?.map((p, i) => (
        <p key={i} className="body-text">
          <Rich text={p} />
        </p>
      ))}
      {card.source && <span className="source">Fonte: {card.source}</span>}
      {card.why && (
        <div className="why">
          <button type="button" aria-expanded={open} onClick={() => setOpen(!open)}>
            <Icon name="bulb" />
            <span className="label">Por que funciona?</span>
            <span className="sign" aria-hidden="true">
              {open ? '−' : '+'}
            </span>
          </button>
          {open && (
            <div className="why-body">
              {card.why.body.map((p, i) => (
                <p key={i}>
                  <Rich text={p} />
                </p>
              ))}
              {card.why.source && <span className="source">Fonte: {card.why.source}</span>}
            </div>
          )}
        </div>
      )}
      {card.link && (
        <a className="link-row sun" href={href(card.link.to)}>
          <Icon name="arrow" />
          <span className="grow">
            <strong>{card.link.label}</strong>
          </span>
          <Icon name="chevron" size={20} />
        </a>
      )}
    </article>
  );
}

export function SwapTable({ swap }: { swap: NonNullable<Card['swap']> }) {
  const [from, to] = swap.head ?? ['Em vez de', 'Diga'];
  const strike = !swap.head;
  return (
    <div className="swap">
      <div className="swap-head">
        <span className="swap-label">{from}</span>
        <span className="swap-label teal">{to}</span>
      </div>
      {swap.rows.map((r) => (
        <div key={r.from} className="swap-row">
          <span className={strike ? 'swap-from strike' : 'swap-from'}>{r.from}</span>
          <span className="swap-to">
            {r.to}
            {r.note && <small>({r.note})</small>}
          </span>
        </div>
      ))}
    </div>
  );
}

// ---------- Perguntas ----------

const KIND_LABEL: Record<Question['kind'], string> = {
  escolha: 'Escolha uma',
  cenario: 'Cenário',
  emvezde: 'Qual frase?',
  vf: 'Verdadeiro ou falso?',
  ordem: 'Ponha em ordem'
};

function QuizView({ lesson, onFinish, onBack }: { lesson: Lesson; onFinish: (right: number, total: number) => void; onBack: () => void }) {
  const [q, setQ] = useState(0);
  const [right, setRight] = useState(0);
  const [answered, setAnswered] = useState<boolean | null>(null);
  const question = lesson.quiz[q];
  const last = q === lesson.quiz.length - 1;

  const onAnswer = (correct: boolean) => {
    if (answered !== null) return;
    setAnswered(correct);
    if (correct) setRight((r) => r + 1);
  };

  const next = () => {
    if (last) {
      onFinish(right, lesson.quiz.length);
      return;
    }
    setQ(q + 1);
    setAnswered(null);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="spread">
        <span className="eyebrow teal">Hora de praticar</span>
        <span className="pill sand">
          Pergunta {q + 1} de {lesson.quiz.length}
        </span>
      </div>
      <div className="scene-box">
        <Illustration id={lesson.scene} />
      </div>
      <div className="stack-sm">
        <span className="small" style={{ fontWeight: 800 }}>
          {KIND_LABEL[question.kind]}
        </span>
        <h1 className="display" style={{ fontSize: 21, fontWeight: 600, lineHeight: 1.3 }}>
          {question.prompt}
        </h1>
      </div>
      {question.kind === 'ordem' ? (
        <OrderQuestionView key={q} question={question} onAnswer={onAnswer} />
      ) : (
        <ChoiceQuestionView key={q} question={question} onAnswer={onAnswer} />
      )}
      <div className="lesson-actions btn-row">
        {q === 0 && answered === null ? (
          <button type="button" className="btn secondary" onClick={onBack}>
            Rever cartões
          </button>
        ) : null}
        <button type="button" className="btn grow-2" disabled={answered === null} onClick={next}>
          {answered === null ? 'Escolha uma resposta' : last ? 'Ver resultado' : 'Próxima pergunta'}
        </button>
      </div>
    </>
  );
}

function ChoiceQuestionView({ question, onAnswer }: { question: ChoiceQuestion; onAnswer: (ok: boolean) => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  const ok = picked === question.correct;
  const letters = 'ABCD';
  return (
    <>
      <div className="options">
        {question.options.map((o, i) => {
          let cls = 'option';
          if (answered) {
            if (i === question.correct) cls += ' right';
            else if (i === picked) cls += ' wrong';
            else cls += ' dim';
          }
          return (
            <button
              key={i}
              type="button"
              className={cls}
              disabled={answered}
              onClick={() => {
                setPicked(i);
                onAnswer(i === question.correct);
              }}
            >
              <span className="letter">{answered && i === question.correct ? <Icon name="check" size={18} /> : letters[i]}</span>
              <span>{o.text}</span>
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className={ok ? 'feedback ok' : 'feedback bad'} role="status">
          <span className="title">{ok ? 'Isso mesmo!' : 'Quase — veja por quê'}</span>
          <p>
            <Rich text={question.options[picked].feedback} />
            {!ok && ' A melhor resposta está em verde.'}
          </p>
        </div>
      )}
    </>
  );
}

function OrderQuestionView({ question, onAnswer }: { question: OrderQuestion; onAnswer: (ok: boolean) => void }) {
  const [picked, setPicked] = useState<number[]>([]);
  const [result, setResult] = useState<boolean | null>(null);
  const remaining = question.shuffled.filter((i) => !picked.includes(i));

  const pick = (i: number) => {
    const next = [...picked, i];
    setPicked(next);
    if (next.length === question.items.length) {
      const ok = next.every((v, idx) => v === idx);
      setResult(ok);
      onAnswer(ok);
    }
  };

  return (
    <>
      <div className="order-picked" aria-live="polite">
        {picked.length === 0 && <span className="placeholder">Toque nos passos abaixo, do primeiro ao último.</span>}
        {picked.map((i, pos) => {
          const cls = result === null ? 'order-item' : i === pos ? 'order-item right' : 'order-item wrong';
          return (
            <div key={i} className={cls}>
              <span className="n">{pos + 1}</span>
              {question.items[i]}
            </div>
          );
        })}
      </div>
      {result === null && (
        <div className="options">
          {remaining.map((i) => (
            <button key={i} type="button" className="option" onClick={() => pick(i)}>
              <span className="letter">
                <Icon name="plus" size={16} />
              </span>
              <span>{question.items[i]}</span>
            </button>
          ))}
          {picked.length > 0 && (
            <button type="button" className="btn secondary small" style={{ alignSelf: 'flex-start' }} onClick={() => setPicked([])}>
              Recomeçar
            </button>
          )}
        </div>
      )}
      {result !== null && (
        <div className={result ? 'feedback ok' : 'feedback bad'} role="status">
          <span className="title">{result ? 'Isso mesmo!' : 'Quase — a ordem certa é:'}</span>
          {!result && (
            <ol style={{ margin: 0, paddingLeft: 20, fontSize: 15, lineHeight: 1.5 }}>
              {question.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ol>
          )}
          <p>{question.feedback}</p>
        </div>
      )}
    </>
  );
}

// ---------- Conclusão ----------

function DoneView({ lesson, score, onReview }: { lesson: Lesson; score: { right: number; total: number } | null; onReview: () => void }) {
  const nextLesson = LESSONS.find((l) => l.n === lesson.n + 1);
  const stars = score ? Math.max(1, Math.round((score.right / score.total) * 3)) : 3;
  return (
    <main className="page no-nav">
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <a className="icon-btn" href={href('/')} aria-label="Fechar">
          <Icon name="close" size={20} />
        </a>
      </div>
      <div className="done-head">
        <Badge />
        <h1 className="h1">Lição concluída!</h1>
        {score && (
          <span className="muted">
            {lesson.title} · {score.right} de {score.total} respostas certas
          </span>
        )}
        <div className="stars" aria-label={`${stars} de 3 estrelas`}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={i < stars ? '' : 'off'}>
              <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" fill="currentColor" />
              </svg>
            </span>
          ))}
        </div>
      </div>

      <section className="card teal">
        <span className="eyebrow" style={{ color: 'var(--teal-dark)' }}>
          Para lembrar
        </span>
        <p className="display" style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.35 }}>
          {lesson.takeaway}
        </p>
      </section>

      <section className="card">
        <div className="row">
          <span style={{ color: 'var(--coral)' }}>
            <Icon name="target" />
          </span>
          <h2 className="section-title">Missão desta semana</h2>
        </div>
        <p className="body-text" style={{ fontSize: 15 }}>
          {lesson.mission.text}
        </p>
        <div className="chips">
          {lesson.mission.checks.map((c) => (
            <span key={c} className="chip" style={{ background: 'var(--coral-tint)', color: 'var(--coral-dark)' }}>
              {c}
            </span>
          ))}
        </div>
        <span className="small">Ela já está na sua tela Início, pra você ir marcando.</span>
      </section>

      <div className="stack" style={{ marginTop: 'auto' }}>
        {nextLesson ? (
          <button type="button" className="btn block" style={{ flexDirection: 'column', gap: 2, minHeight: 60 }} onClick={() => navigate(`/aprender/${nextLesson.id}`)}>
            <span>Próxima lição</span>
            <span style={{ fontSize: 13, fontWeight: 700, opacity: 0.92 }}>
              {nextLesson.n} · {nextLesson.title}
            </span>
          </button>
        ) : (
          <a className="btn block" href={href('/praticar')}>
            Ir para as ferramentas
          </a>
        )}
        <div className="btn-row">
          <button type="button" className="btn secondary" onClick={onReview}>
            Rever a lição
          </button>
          <a className="btn secondary" href={href('/')}>
            Início
          </a>
        </div>
      </div>
    </main>
  );
}
