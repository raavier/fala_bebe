import { Illustration } from '../components/art/scenes';
import { Icon, TopBar } from '../components/ui';
import { SONGS } from '../content/extras';
import { href } from '../router';

export function Songs() {
  return (
    <main className="page">
      <TopBar back="/praticar" title="Músicas com gesto" />
      <div className="scene-box">
        <Illustration id="musica" />
      </div>
      <p className="body-text" style={{ fontSize: 15 }}>
        Músicas com gesto juntam as duas coisas que mais funcionam no segundo ano: gesto ligado a palavra e repetição previsível. Ele começa pelo gesto
        muito antes de dar conta da letra.
      </p>

      <section className="card">
        <h2 className="section-title">Como cantar</h2>
        <ol className="steps">
          <li>
            <span>Cante devagar, de frente pra ele, fazendo os gestos.</span>
          </li>
          <li>
            <span>
              <strong>Pare antes da palavra final</strong> e olhe pra ele com expectativa.
            </span>
          </li>
          <li>
            <span>Qualquer resposta vale — um gesto, um som, um olhar. Complete a palavra e siga cantando.</span>
          </li>
        </ol>
      </section>

      <section className="stack">
        {SONGS.map((s) => (
          <div key={s.title} className="card tight">
            <div className="row">
              <span style={{ color: 'var(--coral)' }}>
                <Icon name="music" />
              </span>
              <strong style={{ fontSize: 16 }}>{s.title}</strong>
            </div>
            <p className="body-text" style={{ fontSize: 15 }}>
              {s.gesture}
            </p>
            <p className="display" style={{ fontSize: 17, fontWeight: 600, color: 'var(--teal-dark)' }}>
              {s.pause}
            </p>
          </div>
        ))}
      </section>

      <div className="card sun">
        <p style={{ fontSize: 15, lineHeight: 1.5 }}>
          <strong>Música de fundo não conta.</strong> Tocando enquanto ele brinca sozinho, pode ser ótima pro humor da casa — só não tem ida e volta. O
          que conta é alguém cantando <em>com</em> ele. Vale também inventar gestos pras músicas que não têm.
        </p>
      </div>

      <a className="link-row" href={href('/aprender/musica')}>
        <Icon name="route" />
        <span className="grow">
          <strong>Lição 13 · Música</strong>
          <span className="small">Por que a música ajuda</span>
        </span>
        <Icon name="chevron" size={20} />
      </a>
    </main>
  );
}
