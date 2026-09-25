import { Icon, ProgressBar } from '../components/ui';
import { LESSONS, PARTS, lessonMinutes } from '../content/lessons';
import { href } from '../router';
import { useProgress } from '../store';

export function Learn() {
  const [progress] = useProgress();
  const doneCount = LESSONS.filter((l) => progress[l.id]?.done).length;
  const next = LESSONS.find((l) => !progress[l.id]?.done);

  return (
    <main className="page">
      <header className="stack">
        <h1 className="h1">Aprender</h1>
        <p className="lead" style={{ fontSize: 15 }}>
          Do porquê ao como: {LESSONS.length} lições curtas, de 3 a 5 minutos. A ordem é uma sugestão — pode pular.
        </p>
        <div className="row">
          <ProgressBar value={doneCount / LESSONS.length} label="Lições concluídas" />
          <span className="pill">
            {doneCount} de {LESSONS.length}
          </span>
        </div>
      </header>

      {PARTS.map((part) => (
        <section key={part.id} className="part">
          <h2 className="eyebrow" style={{ marginBottom: 4 }}>
            {part.label}
          </h2>
          <div className="part-list">
            {LESSONS.filter((l) => l.part === part.id).map((l) => {
              const p = progress[l.id];
              const done = !!p?.done;
              const current = next?.id === l.id;
              const started = (p?.card ?? -1) >= 0;
              return (
                <a key={l.id} href={href(`/aprender/${l.id}`)} className={current ? 'lesson-row current' : 'lesson-row'}>
                  <span className={done ? 'node done' : current ? 'node current' : 'node'}>
                    {done ? <Icon name="check" size={20} /> : l.n}
                  </span>
                  <span className="text">
                    <span className="title">{l.title}</span>
                    <span className="sub">{l.subtitle}</span>
                  </span>
                  {done ? (
                    <span className="pill">Feita</span>
                  ) : current ? (
                    <span className="pill coral">{started ? 'Em andamento' : 'Próxima'}</span>
                  ) : (
                    <span className="pill sand">{lessonMinutes(l)} min</span>
                  )}
                </a>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}
