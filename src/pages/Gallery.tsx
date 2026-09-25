import { Illustration, SCENE_IDS } from '../components/art/scenes';

// Só em desenvolvimento (#/galeria): todas as cenas lado a lado, para revisão.
export function Gallery() {
  return (
    <main className="page no-nav">
      <h1 className="h2">Cenas ({SCENE_IDS.length})</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
        {SCENE_IDS.map((id) => (
          <figure key={id} style={{ margin: 0 }}>
            <div className="scene-box" style={{ borderRadius: 16 }}>
              <Illustration id={id} />
            </div>
            <figcaption className="small">{id}</figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}
