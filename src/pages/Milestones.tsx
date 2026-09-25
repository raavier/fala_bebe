import { Icon, TopBar } from '../components/ui';
import { MILESTONES } from '../content/extras';
import { useMilestoneAge, useMilestoneChecks } from '../store';

export function Milestones() {
  const [age, setAge] = useMilestoneAge();
  const [checks, setChecks] = useMilestoneChecks();
  const cur = MILESTONES.find((m) => m.id === age) ?? MILESTONES[0];

  return (
    <main className="page">
      <TopBar back="/praticar" title="O que esperar" />
      <p className="body-text" style={{ fontSize: 15 }}>
        Nesta fase, o <strong>entender</strong> caminha bem à frente do <strong>falar</strong>. Entre 12 e 24 meses a variação normal é enorme.
      </p>

      <div className="chips" role="group" aria-label="Idade">
        {MILESTONES.map((m) => (
          <button key={m.id} type="button" className="chip-btn dark" aria-pressed={m.id === cur.id} onClick={() => setAge(m.id)}>
            {m.short}
          </button>
        ))}
      </div>

      <section className="card">
        <h2 className="section-title">{cur.label} — o que a maioria das crianças faz</h2>
        <span className="small">Marque o que ele já faz. Fica salvo neste aparelho.</span>
        <div className="stack-sm">
          {cur.items.map((text, i) => {
            const key = `${cur.id}-${i}`;
            const on = !!checks[key];
            return (
              <label key={key} className={on ? 'check-row on' : 'check-row'}>
                <input type="checkbox" checked={on} onChange={() => setChecks((c) => ({ ...c, [key]: !on }))} />
                <span>{text}</span>
              </label>
            );
          })}
        </div>
      </section>

      <section className="card teal">
        <h2 className="section-title">Pesa mais que contar palavras</h2>
        <ol className="steps">
          <li>
            <span>
              <strong>Ele entende?</strong> Atende instruções simples sem ninguém apontar junto.
            </span>
          </li>
          <li>
            <span>
              <strong>Se comunica com intenção?</strong> Aponta pra pedir e pra mostrar, dá objetos, busca seu olhar, puxa você até o que quer.
            </span>
          </li>
          <li>
            <span>
              <strong>Está avançando?</strong> Palavras novas continuam aparecendo ao longo das semanas.
            </span>
          </li>
        </ol>
        <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--teal-dark)' }}>Se as três estão de pé, o quadro é tranquilo — mesmo com poucas palavras.</p>
      </section>

      <section className="card sun" style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <span style={{ color: 'var(--sun-ink)', flexShrink: 0 }}>
          <Icon name="info" size={26} />
        </span>
        <div className="stack-sm">
          <p style={{ fontSize: 14, lineHeight: 1.5 }}>
            São marcos de vigilância, não de diagnóstico: descrevem o que a maioria faz, não o que toda criança precisa fazer. Se algum não estiver
            presente, leve a observação à consulta pediátrica — o quadro de palavras ajuda.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.5 }}>
            <strong>Vale fazer uma avaliação auditiva</strong>, mesmo achando que ele escuta bem: otite com líquido no ouvido é comum e passa
            despercebida.
          </p>
        </div>
      </section>

      <span className="source">Fonte: Cartilha de Desenvolvimento, Sociedade Brasileira de Pediatria.</span>
    </main>
  );
}
