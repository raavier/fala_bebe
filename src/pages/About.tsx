import { Icon, TopBar } from '../components/ui';
import { REFERENCES } from '../content/extras';
import { navigate } from '../router';
import { clearAll } from '../store';

export function About() {
  const reset = () => {
    if (window.confirm('Apagar o progresso, as palavras e o quadro deste aparelho? Não dá pra desfazer.')) {
      clearAll();
      navigate('/');
    }
  };

  return (
    <main className="page">
      <TopBar back="/resumo" title="Sobre o guia" />

      <section className="card">
        <p className="body-text" style={{ fontSize: 15 }}>
          O <strong>Fala, bebê!</strong> transforma o material “Estimulando a fala do bebê” num guia interativo: lições curtas, perguntas pra
          praticar e ferramentas pro dia a dia. O foco é a faixa de 1 a 3 anos, quando o entender caminha à frente do falar.
        </p>
        <p className="body-text" style={{ fontSize: 15 }}>
          Este guia <strong>não substitui</strong> a avaliação do pediatra ou do fonoaudiólogo. Se algo preocupa, leve a observação — e o quadro de
          palavras — à consulta.
        </p>
      </section>

      <section className="card tight stack">
        <h2 className="section-title">Seus dados</h2>
        <p className="body-text" style={{ fontSize: 15 }}>
          Nada sai deste aparelho: o progresso, as palavras da semana e o quadro ficam guardados só no navegador. Sem cadastro, sem servidor.
        </p>
        <button type="button" className="btn secondary small" style={{ alignSelf: 'flex-start' }} onClick={reset}>
          <Icon name="trash" size={18} />
          Apagar meus dados
        </button>
      </section>

      <section className="stack">
        <h2 className="section-title">Referências</h2>
        <ul className="ref-list">
          {REFERENCES.map((r) => (
            <li key={r.url} className="stack-sm" style={{ gap: 2 }}>
              <a href={r.url} target="_blank" rel="noopener noreferrer">
                {r.title}
                <span className="sr-only"> (abre em outra aba)</span>
              </a>
              <span className="small">{r.note}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
