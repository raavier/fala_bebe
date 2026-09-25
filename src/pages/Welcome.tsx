import { Illustration, Logo } from '../components/art/scenes';
import { Icon } from '../components/ui';
import { navigate } from '../router';
import { useWelcomed } from '../store';

export function Welcome() {
  const [, setWelcomed] = useWelcomed();
  const start = () => {
    setWelcomed(true);
    navigate('/');
  };
  return (
    <main className="page no-nav welcome">
      <div className="brand">
        <Logo />
        Fala, bebê!
      </div>
      <div className="scene-box">
        <Illustration id="vaivem" />
      </div>
      <div className="stack">
        <h1 className="h1">Conversa de ida e volta</h1>
        <p className="lead">
          Um guia prático para estimular a fala do bebê dentro da rotina — no banho, na comida, na brincadeira. Sem hora marcada.
        </p>
      </div>
      <ul className="bullets">
        <li>16 lições curtas, com perguntas pra praticar</li>
        <li>Ferramentas pro dia a dia: palavras da semana, quadro de palavras, treino da espera</li>
        <li>Uma cola de bolso com o essencial</li>
      </ul>
      <div className="stack">
        <button type="button" className="btn block" onClick={start}>
          Começar
          <Icon name="arrow" size={20} />
        </button>
        <p className="small" style={{ textAlign: 'center' }}>
          Tudo fica salvo só neste aparelho, sem cadastro. Este guia não substitui a avaliação do pediatra ou do fonoaudiólogo.
        </p>
      </div>
    </main>
  );
}
