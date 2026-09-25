import type { ReactNode } from 'react';
import type { SceneId } from '../../content/types';
import {
  Adult,
  Apple,
  ArcArrow,
  Baby,
  Ball,
  Banana,
  Blocks,
  Board,
  Book,
  Bowl,
  Bubble,
  C,
  Clock,
  Cup,
  Dog,
  DotsBubble,
  Fan,
  HighChair,
  Lid,
  LinesBubble,
  Moon,
  Notes,
  Pan,
  PhoneOff,
  Scene,
  Shelf,
  Sparkle,
  ToyCar,
  Tray,
  Tub,
  TV,
  Waves,
  type Tone
} from './kit';

interface SceneDef {
  tone: Tone;
  label: string;
  draw: () => ReactNode;
}

const SCENES: Record<SceneId, SceneDef> = {
  vaivem: {
    tone: 'coral',
    label: 'Adulto e bebê sentados no chão, frente a frente, conversando: o adulto diz “Bola!” e o bebê responde “bo!”',
    draw: () => (
      <>
        <ArcArrow d="M180 24 Q206 2 232 22" head="M225 16 L233 23 L223 26" />
        <ArcArrow d="M228 72 Q200 94 170 74" head="M177 70 L169 75 L178 80" color={C.teal} />
        <Adult x={100} arm="reach" mouth="talk" />
        <Ball x={180} y={170} />
        <Baby x={236} arm="point" mouth="talk" />
        <Bubble x={140} y={30} text="Bola!" />
        <Bubble x={266} y={40} text="bo!" color={C.coral} />
      </>
    )
  },
  tenis: {
    tone: 'teal',
    label: 'Como numa partida de tênis: uma bola vai do adulto ao bebê e volta',
    draw: () => (
      <>
        <ArcArrow d="M136 66 Q170 -4 208 64" head="M200 59 L208 65 L210 55" />
        <ArcArrow d="M206 96 Q172 116 140 98" head="M148 94 L139 98 L147 104" color={C.teal} />
        <circle cx="171" cy="31" r="11" fill="#D8E36A" />
        <path d="M161 27 Q171 36 181 27" stroke={C.white} strokeWidth="2" fill="none" />
        <Adult x={100} arm="reach" mouth="smile" />
        <Baby x={236} arm="up" mouth="smile" />
      </>
    )
  },
  narrador: {
    tone: 'sun',
    label: 'Adulto falando sem parar, com vários balões, enquanto o bebê fica quieto olhando para baixo',
    draw: () => (
      <>
        <Adult x={100} mouth="talk" />
        <Baby x={240} mouth="flat" eye="down" />
        <LinesBubble x={150} y={28} w={72} />
        <LinesBubble x={210} y={52} w={64} />
        <LinesBubble x={278} y={26} w={64} />
      </>
    )
  },
  banho: {
    tone: 'blue',
    label: 'Hora do banho: o bebê na banheira com bolhas e o adulto dizendo “Molha!”',
    draw: () => (
      <>
        <Adult x={96} arm="reach" mouth="talk" lean={6} />
        <Baby x={236} arm="up" mouth="smile" />
        <Tub x={236} y={184} />
        <Bubble x={140} y={30} text="Molha!" />
      </>
    )
  },
  entende: {
    tone: 'teal',
    label: 'Bebê pensando em várias coisas que já entende: bola, copo e cachorro',
    draw: () => (
      <>
        <circle cx="160" cy="94" r="5" fill={C.white} />
        <circle cx="176" cy="80" r="8" fill={C.white} />
        <circle cx="206" cy="62" r="26" fill={C.white} />
        <circle cx="240" cy="46" r="30" fill={C.white} />
        <circle cx="276" cy="60" r="26" fill={C.white} />
        <circle cx="240" cy="78" r="26" fill={C.white} />
        <Ball x={210} y={64} r={11} />
        <Cup x={242} y={80} />
        <Dog x={292} y={80} s={0.33} />
        <Baby x={110} flip eye="up" mouth="smile" />
      </>
    )
  },
  intencao: {
    tone: 'coral',
    label: 'O bebê aponta a bola para mostrar ao adulto, que olha e diz “A bola!”',
    draw: () => (
      <>
        <Adult x={90} eye="down" mouth="talk" />
        <Ball x={170} y={170} r={14} />
        <Baby x={236} arm="point" mouth="o" />
        <Bubble x={130} y={30} text="A bola!" />
      </>
    )
  },
  ouvido: {
    tone: 'blue',
    label: 'O adulto chama “Oi!” e o som chega até o ouvido do bebê',
    draw: () => (
      <>
        <Adult x={90} mouth="talk" />
        <Waves x={196} y={116} color={C.teal} />
        <Baby x={250} flip mouth="o" />
        <Bubble x={130} y={30} text="Oi!" />
      </>
    )
  },
  caraacara: {
    tone: 'teal',
    label: 'Adulto inclinado, com o rosto na altura do rosto do bebê, que está na cadeira alta',
    draw: () => (
      <>
        <HighChair x={236} y={146} />
        <Adult x={100} lean={10} brows="up" mouth="smile" />
        <Baby x={236} y={146} mouth="smile" />
        <path d="M142 85 L218 75" stroke={C.teal} strokeWidth="2.5" strokeDasharray="4 6" strokeLinecap="round" />
      </>
    )
  },
  espera: {
    tone: 'teal',
    label: 'Adulto inclinado para frente, sobrancelhas erguidas, esperando em silêncio o bebê responder',
    draw: () => (
      <>
        <Clock x={176} y={52} />
        <Adult x={100} lean={8} brows="up" arm="reach" mouth="smile" />
        <Baby x={252} mouth="flat" />
        <DotsBubble x={300} y={62} />
      </>
    )
  },
  comenta: {
    tone: 'sun',
    label: 'Adulto e bebê brincando com blocos; o adulto comenta “Empilhou!”',
    draw: () => (
      <>
        <Adult x={90} arm="reach" mouth="talk" />
        <Blocks x={180} y={184} />
        <Baby x={252} arm="reach" mouth="smile" />
        <Bubble x={140} y={30} text="Empilhou!" />
      </>
    )
  },
  tampa: {
    tone: 'coral',
    label: 'O bebê segura a tampa da panela e o adulto diz “Tampa!”',
    draw: () => (
      <>
        <Adult x={90} eye="down" mouth="talk" />
        <Baby x={236} arm="hold" eye="down" mouth="o" />
        <Lid x={200} y={150} />
        <Bubble x={130} y={30} text="Tampa!" />
      </>
    )
  },
  ventilador: {
    tone: 'blue',
    label: 'O bebê olha para o ventilador de teto e o adulto aponta dizendo “Ventilador!”',
    draw: () => (
      <>
        <Fan x={236} y={22} />
        <Adult x={90} arm="point" eye="up" mouth="talk" />
        <Baby x={236} eye="up" mouth="o" />
        <Bubble x={108} y={30} text="Ventilador!" />
      </>
    )
  },
  mercado: {
    tone: 'sun',
    label: 'No mercado, o bebê aponta a prateleira e o adulto diz “Banana!”',
    draw: () => (
      <>
        <Shelf x={244} y={66} w={90}>
          <Apple x={262} y={52} />
          <Banana x={300} y={58} />
        </Shelf>
        <Shelf x={244} y={122} w={90}>
          <Banana x={266} y={114} />
          <rect x="292" y="94" width="26" height="28" rx="3" fill={C.coral} />
          <rect x="296" y="100" width="18" height="8" rx="2" fill={C.white} />
        </Shelf>
        <Adult x={78} mouth="talk" />
        <Baby x={190} flip arm="point" mouth="o" />
        <Bubble x={122} y={28} text="Banana!" />
      </>
    )
  },
  parentes: {
    tone: 'coral',
    label: 'Adulto falando com voz animada, alongando a palavra: “Ááágua!”',
    draw: () => (
      <>
        <Adult x={100} mouth="talk" brows="up" />
        <Waves x={144} y={94} />
        <Baby x={236} mouth="smile" />
        <Bubble x={150} y={30} text="Ááágua!" />
      </>
    )
  },
  cachorro: {
    tone: 'sun',
    label: 'O bebê aponta o cachorro e diz “au-au!”; o adulto completa “O cachorro!”',
    draw: () => (
      <>
        <Adult x={70} mouth="talk" />
        <Dog x={292} y={184} s={0.9} />
        <Baby x={176} flip arm="point" mouth="talk" />
        <Bubble x={100} y={26} text="O cachorro!" />
        <Bubble x={222} y={48} text="au-au!" color={C.coral} />
      </>
    )
  },
  boca: {
    tone: 'teal',
    label: 'O bebê olha fixamente para a boca do adulto, que fala devagar “Á-gua”',
    draw: () => (
      <>
        <Adult x={110} lean={10} brows="up" mouth="talk" />
        <Baby x={218} eye="up" mouth="o" />
        <path d="M203 108 L158 100" stroke={C.teal} strokeWidth="2.5" strokeDasharray="4 5" strokeLinecap="round" />
        <Bubble x={150} y={30} text="Á-gua" />
      </>
    )
  },
  toque: {
    tone: 'coral',
    label: 'O bebê encosta a mão na boca do adulto enquanto ele fala',
    draw: () => (
      <>
        <Adult x={100} lean={10} mouth="smile" />
        <Baby x={196} arm="mouth" mouth="o" />
      </>
    )
  },
  balbucio: {
    tone: 'sun',
    label: 'Brincadeira de imitar sons: o bebê diz “bababa” e o adulto devolve; a chupeta fica de lado',
    draw: () => (
      <>
        <Adult x={100} mouth="talk" />
        <Baby x={236} mouth="talk" />
        <g transform="rotate(-20 178 176)">
          <ellipse cx="178" cy="176" rx="5" ry="8" fill={C.teal} />
          <circle cx="178" cy="166" r="5" fill="none" stroke={C.teal} strokeWidth="2.2" />
        </g>
        <Bubble x={140} y={30} text="bababa!" />
        <Bubble x={270} y={42} text="bababa" color={C.coral} />
      </>
    )
  },
  prova: {
    tone: 'blue',
    label: 'Pergunta de prova: o adulto insiste “Fala bola!” e o bebê vira o rosto, desanimado',
    draw: () => (
      <>
        <Adult x={100} arm="point" mouth="talk" />
        <Ball x={184} y={170} r={14} />
        <Baby x={250} flip eye="down" mouth="sad" />
        <Bubble x={140} y={30} text="Fala bola!" />
      </>
    )
  },
  escolha: {
    tone: 'sun',
    label: 'O adulto segura uma maçã e uma banana na altura do rosto do bebê, que escolhe',
    draw: () => (
      <>
        <Adult x={86} arm="high" brows="up" mouth="smile" />
        <Apple x={152} y={96} />
        <Banana x={178} y={100} />
        <Baby x={252} arm="reach" mouth="smile" />
        <Bubble x={160} y={26} text="Qual você quer?" size={15} />
      </>
    )
  },
  livroMaca: {
    tone: 'coral',
    label: 'Adulto e bebê olhando um livro com a figura de uma maçã; o adulto diz “Maçã!”',
    draw: () => (
      <>
        <Adult x={90} arm="reach" eye="down" mouth="talk" />
        <Book x={176} y={180} picture="apple" />
        <Baby x={252} arm="point" eye="down" mouth="o" />
        <Bubble x={130} y={30} text="Maçã!" />
      </>
    )
  },
  bola: {
    tone: 'teal',
    label: 'O bebê aponta a bola e diz “bo!”; o adulto devolve maior: “A bola pulou!”',
    draw: () => (
      <>
        <Adult x={90} eye="down" mouth="talk" />
        <Ball x={176} y={170} />
        <Baby x={236} arm="point" mouth="talk" />
        <Bubble x={126} y={28} text="A bola pulou!" />
        <Bubble x={272} y={42} text="bo!" color={C.coral} />
      </>
    )
  },
  agua: {
    tone: 'blue',
    label: 'O bebê estica a mão para o copo e diz “ága”; o adulto responde “Água geladinha!”',
    draw: () => (
      <>
        <Adult x={90} arm="hold" mouth="talk" />
        <Cup x={156} y={126} />
        <Baby x={240} arm="reach" mouth="talk" />
        <Bubble x={122} y={28} text="Água geladinha!" size={15} />
        <Bubble x={280} y={44} text="ága" color={C.coral} />
      </>
    )
  },
  geladeira: {
    tone: 'sun',
    label: 'Quadro de palavras na geladeira, com as palavras do mês e as palavras da semana',
    draw: () => (
      <>
        <Board x={36} y={22} />
        <Baby x={290} arm="point" eye="up" mouth="smile" />
        <Sparkle x={236} y={40} color={C.coral} />
      </>
    )
  },
  lanche: {
    tone: 'coral',
    label: 'Hora do lanche: o adulto segura o pote fora do alcance e espera o bebê pedir',
    draw: () => (
      <>
        <HighChair x={244} y={146} />
        <Adult x={90} arm="hold" brows="up" mouth="smile" />
        <Bowl x={158} y={116} food />
        <Baby x={244} y={146} arm="point" mouth="o" />
        <Tray x={244} y={126} />
        <circle cx="222" cy="119" r="4" fill="#8BC34A" />
      </>
    )
  },
  mais: {
    tone: 'teal',
    label: 'O adulto junta as mãos no gesto de “mais” e diz “Mais!”',
    draw: () => (
      <>
        <Adult x={100} arm="together" brows="up" mouth="talk" />
        <Bowl x={176} y={182} food />
        <Baby x={240} arm="reach" mouth="smile" />
        <Bubble x={146} y={30} text="Mais!" />
      </>
    )
  },
  acabou: {
    tone: 'sun',
    label: 'O adulto abre as mãos no gesto de “acabou” e diz “Acabou!”',
    draw: () => (
      <>
        <Adult x={100} arm="open" mouth="talk" />
        <Bowl x={190} y={182} />
        <Baby x={250} arm="up" mouth="smile" />
        <Bubble x={176} y={30} text="Acabou!" />
      </>
    )
  },
  aponta: {
    tone: 'coral',
    label: 'O bebê aponta a fruteira e o adulto completa por ele: “Maçã!”',
    draw: () => (
      <>
        <Adult x={80} mouth="talk" />
        <Apple x={286} y={160} />
        <Banana x={308} y={164} />
        <Bowl x={296} y={182} />
        <Baby x={206} flip arm="point" mouth="o" />
        <Bubble x={120} y={30} text="Maçã!" />
      </>
    )
  },
  prateleira: {
    tone: 'blue',
    label: 'O carrinho favorito está na prateleira, à vista mas fora do alcance, e o bebê estica o braço pedindo',
    draw: () => (
      <>
        <Shelf x={250} y={108} w={82}>
          <ToyCar x={292} y={108} />
        </Shelf>
        <Adult x={70} mouth="smile" />
        <Baby x={196} flip arm="reach" eye="up" mouth="talk" />
        <Bubble x={222} y={48} text="ã!" color={C.coral} />
      </>
    )
  },
  cansado: {
    tone: 'blue',
    label: 'Bebê com sono, de olhos fechados, com a lua ao fundo',
    draw: () => (
      <>
        <Moon x={262} y={52} />
        <Sparkle x={70} y={40} color={C.white} />
        <Sparkle x={110} y={74} color={C.white} s={0.6} />
        <Sparkle x={300} y={100} color={C.white} s={0.7} />
        <text x="196" y="72" className="scene-text" fontSize="14" fill={C.gray}>z</text>
        <text x="208" y="56" className="scene-text" fontSize="18" fill={C.gray}>z</text>
        <text x="222" y="38" className="scene-text" fontSize="22" fill={C.gray}>z</text>
        <Baby x={170} eye="closed" mouth="flat" />
      </>
    )
  },
  livro: {
    tone: 'sun',
    label: 'Adulto segura um livro aberto e aponta a figura do cachorro; o bebê também aponta',
    draw: () => (
      <>
        <Adult x={100} arm="book" eye="down" mouth="talk" />
        <Book x={180} y={150} picture="dog" w={64} />
        <Baby x={254} arm="point" eye="down" mouth="o" />
        <Bubble x={150} y={26} text="Olha o cachorro!" size={15} />
      </>
    )
  },
  musica: {
    tone: 'coral',
    label: 'O adulto canta “nesta data…” e para; o bebê bate palmas',
    draw: () => (
      <>
        <Adult x={100} mouth="talk" />
        <Notes x={150} y={72} />
        <Notes x={196} y={44} color={C.teal} scale={0.8} />
        <Baby x={250} arm="clap" mouth="smile" />
        <Bubble x={122} y={26} text="nesta data…" />
      </>
    )
  },
  cabecaOmbro: {
    tone: 'teal',
    label: 'Cantando “Cabeça, ombro, joelho e pé”: o bebê põe as mãos na cabeça',
    draw: () => (
      <>
        <Adult x={90} mouth="talk" arm="wave" />
        <Notes x={146} y={70} />
        <Baby x={240} arm="head" mouth="smile" />
        <Bubble x={140} y={28} text="Cabeça!" />
      </>
    )
  },
  tv: {
    tone: 'blue',
    label: 'Televisão ligada na frente do bebê, que olha parado — a tela não responde a ele',
    draw: () => (
      <>
        <TV x={96} y={150} />
        <Waves x={152} y={118} color={C.gray} />
        <Baby x={244} mouth="flat" />
      </>
    )
  },
  celular: {
    tone: 'sun',
    label: 'O adulto olha o celular enquanto o bebê estica o braço chamando “ã!”',
    draw: () => (
      <>
        <Adult x={100} arm="phone" eye="down" mouth="flat" />
        <Baby x={236} arm="reach" mouth="talk" />
        <Bubble x={270} y={44} text="ã!" color={C.coral} />
      </>
    )
  },
  chao: {
    tone: 'teal',
    label: 'Bloco de chão: celular fora, adulto e bebê brincando no chão com uma panela; o adulto diz “Bateu!”',
    draw: () => (
      <>
        <PhoneOff x={36} y={36} />
        <Adult x={100} arm="reach" mouth="talk" />
        <Pan x={172} y={184} />
        <Sparkle x={200} y={150} color={C.coral} s={0.8} />
        <Baby x={262} arm="reach" mouth="smile" />
        <Bubble x={150} y={28} text="Bateu!" />
      </>
    )
  }
};

export const SCENE_IDS = Object.keys(SCENES) as SceneId[];

export function Illustration({ id }: { id: SceneId }) {
  const s = SCENES[id];
  return (
    <Scene tone={s.tone} label={s.label}>
      {s.draw()}
    </Scene>
  );
}

// Selo de lição concluída
export function Badge() {
  return (
    <svg width="180" height="150" viewBox="0 0 180 150" role="img" aria-label="Selo de lição concluída">
      <circle cx="30" cy="30" r="5" fill={C.sun} />
      <circle cx="152" cy="24" r="4" fill={C.teal} />
      <circle cx="160" cy="98" r="5" fill={C.coralLight} />
      <circle cx="18" cy="104" r="4" fill={C.teal} />
      <rect x="140" y="56" width="10" height="4" rx="2" fill={C.sun} transform="rotate(30 145 58)" />
      <rect x="26" y="66" width="10" height="4" rx="2" fill={C.coralLight} transform="rotate(-30 31 68)" />
      <path d="M70 108 L60 146 L78 136 L88 150 L94 112 Z" fill={C.teal} />
      <path d="M110 108 L120 146 L102 136 L92 150 L86 112 Z" fill={C.tealDark} />
      <circle cx="90" cy="70" r="50" fill={C.coral} />
      <circle cx="90" cy="70" r="40" fill="none" stroke="#F8E1D8" strokeWidth="3" strokeDasharray="4 6" />
      <path d="M90 44 L97 60 L114 61 L101 72 L105 89 L90 80 L75 89 L79 72 L66 61 L83 60 Z" fill="#FCEFC7" />
    </svg>
  );
}

// Rostinho do bebê (avatar da tela Início)
export function BabyFace({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" aria-hidden="true">
      <circle cx="28" cy="28" r="28" fill="#DCE7F5" />
      <circle cx="28" cy="31" r="17" fill={C.skinB} />
      <path d="M25 15 C28 8 36 10 33 17" stroke={C.hair} strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <circle cx="22" cy="30" r="2.2" fill={C.ink} />
      <circle cx="34" cy="30" r="2.2" fill={C.ink} />
      <path d="M23 37 Q28 41 33 37" stroke={C.mouth} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <circle cx="19" cy="35" r="3" fill={C.coralLight} opacity="0.5" />
      <circle cx="37" cy="35" r="3" fill={C.coralLight} opacity="0.5" />
      <path d="M11 50 Q28 40 45 50" stroke={C.blue} strokeWidth="8" fill="none" />
    </svg>
  );
}

// Logotipo: dois balões de conversa
export function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" aria-hidden="true">
      <rect x="1" y="3" width="18" height="14" rx="7" fill={C.coral} />
      <path d="M5 16 L4 21 L10 17 Z" fill={C.coral} />
      <rect x="11" y="11" width="18" height="14" rx="7" fill={C.teal} />
      <path d="M25 24 L26 29 L20 25 Z" fill={C.teal} />
    </svg>
  );
}
