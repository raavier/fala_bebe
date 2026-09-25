import { BabyFace } from '../components/art/scenes';
import { Icon, ProgressBar, greeting } from '../components/ui';
import { tipOfTheDay } from '../content/extras';
import { LESSONS, lessonById } from '../content/lessons';
import { href } from '../router';
import { todayKey, useMission, useProgress, useWeekWords } from '../store';

export function Home() {
  const [progress] = useProgress();
  const [mission, setMission] = useMission();
  const [words] = useWeekWords();
  const doneCount = LESSONS.filter((l) => progress[l.id]?.done).length;
  const next = LESSONS.find((l) => !progress[l.id]?.done);
  const tip = tipOfTheDay();
  const today = todayKey();

  const missionLesson = mission ? lessonById(mission.lessonId) : undefined;
  const checked = mission && mission.date === today ? mission.checked : [];
  const toggleCheck = (i: number) => {
    if (!mission) return;
    const next = checked.includes(i) ? checked.filter((c) => c !== i) : [...checked, i];
    setMission({ ...mission, date: today, checked: next });
  };

  return (
    <main className="page">
      <header className="home-head">
        <div className="stack-sm">
          <span className="small" style={{ fontWeight: 700 }}>
            {greeting()}
          </span>
          <h1 className="h2">Bora conversar com o bebê?</h1>
        </div>
        <BabyFace />
      </header>

      {next ? (
        <NextLessonCard id={next.id} />
      ) : (
        <section className="card hero-teal">
          <span className="eyebrow" style={{ color: '#fff', opacity: 0.9 }}>
            Trilha completa
          </span>
          <h2 className="h2">Você passou pelas 16 lições!</h2>
          <p>Revise quando quiser — e use a cola de bolso no dia a dia.</p>
          <a className="btn white" href={href('/aprender')}>
            Rever a trilha
          </a>
        </section>
      )}

      <section className="card">
        <div className="spread">
          <h2 className="section-title">Missão da semana</h2>
          {missionLesson && <span className="pill">{checked.length} de 3 hoje</span>}
        </div>
        {missionLesson && mission ? (
          <>
            <p className="muted" style={{ fontSize: 15, lineHeight: 1.5 }}>
              {missionLesson.mission.text}
            </p>
            <div className="check-grid">
              {missionLesson.mission.checks.map((label, i) => {
                const on = checked.includes(i);
                return (
                  <button key={label} type="button" className="check-tile" aria-pressed={on} onClick={() => toggleCheck(i)}>
                    {on ? <Icon name="check" size={24} /> : <span className="ring" />}
                    {label}
                  </button>
                );
              })}
            </div>
            <span className="small">
              Da lição “{missionLesson.title}”. As marcações recomeçam a cada dia.
            </span>
          </>
        ) : (
          <p className="muted" style={{ fontSize: 15 }}>
            Termine uma lição pra receber uma missão prática pra semana.
          </p>
        )}
      </section>

      <section className="stack">
        <div className="spread">
          <h2 className="section-title">Palavras da semana</h2>
          <a href={href('/praticar/palavras')} style={{ fontWeight: 800, fontSize: 14, textDecoration: 'none' }}>
            {words.length ? 'Editar' : 'Escolher'}
          </a>
        </div>
        {words.length ? (
          <>
            <div className="chips">
              {words.map((w) => (
                <span key={w} className="chip word">
                  <span className="dot">◦</span>
                  {w}
                </span>
              ))}
            </div>
            <span className="small">Fale do jeito que ele falaria, na hora em que acontece. Sem pedir pra repetir.</span>
          </>
        ) : (
          <a className="link-row" href={href('/praticar/palavras')}>
            <span className="ico sun" style={{ width: 40, height: 40, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="chat" />
            </span>
            <span className="grow">
              <strong>Escolha de 5 a 10 palavras</strong>
              <span className="small">Verbos e palavras sociais destravam mais</span>
            </span>
            <Icon name="chevron" size={20} />
          </a>
        )}
      </section>

      <section className="card teal" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 14 }}>
        <span style={{ width: 44, height: 44, flexShrink: 0, borderRadius: 22, background: 'var(--teal)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="bulb" />
        </span>
        <div className="stack-sm">
          <span className="eyebrow" style={{ color: 'var(--teal-dark)' }}>
            Dica do dia · {tip.topic}
          </span>
          <p style={{ fontSize: 15, lineHeight: 1.5 }}>{tip.text}</p>
        </div>
      </section>

      <a className="link-row" href={href('/aprender')}>
        <span className="grow" style={{ gap: 8 }}>
          <strong>
            Sua trilha · {doneCount} de {LESSONS.length} lições
          </strong>
          <ProgressBar value={doneCount / LESSONS.length} label="Lições concluídas" />
        </span>
        <Icon name="chevron" size={20} />
      </a>
    </main>
  );
}

function NextLessonCard({ id }: { id: string }) {
  const [progress] = useProgress();
  const lesson = lessonById(id)!;
  const seen = progress[id]?.card ?? -1;
  const started = seen >= 0;
  return (
    <section className="card hero">
      <div className="stack-sm">
        <span className="eyebrow" style={{ color: '#fff', opacity: 0.92 }}>
          {started ? 'Continuar' : 'Próxima'} · Lição {lesson.n} de {LESSONS.length}
        </span>
        <h2 className="h2">{lesson.title}</h2>
        <span style={{ fontSize: 15, lineHeight: 1.4 }}>{lesson.subtitle}</span>
      </div>
      {started && (
        <div className="row">
          <ProgressBar tone="light" value={(seen + 1) / lesson.cards.length} label="Progresso na lição" />
          <span style={{ fontSize: 13, fontWeight: 700 }}>
            {Math.min(seen + 1, lesson.cards.length)} de {lesson.cards.length} cartões
          </span>
        </div>
      )}
      <a className="btn white" href={href(`/aprender/${id}`)}>
        {started ? 'Continuar lição' : 'Começar lição'}
      </a>
    </section>
  );
}
