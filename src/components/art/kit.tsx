import type { ReactNode } from 'react';

// Kit de ilustração: personagens e objetos em SVG, no estilo do protótipo aprovado.
// Todas as cenas usam viewBox 340 × 200 com o chão em y = 184.

export const C = {
  ink: '#2A2733',
  gray: '#6F6878',
  skinA: '#E3A77F',
  skinAShade: '#D9976D',
  hair: '#3B2A2A',
  teal: '#2F7A72',
  tealDark: '#1F5A54',
  navy: '#3E4A6B',
  coral: '#B84A33',
  coralLight: '#E58E73',
  skinB: '#F1C3A0',
  skinBEar: '#E8B592',
  sun: '#F2C14E',
  mouth: '#8F3624',
  white: '#FFFFFF',
  wood: '#C8905A',
  woodDark: '#A0703F',
  metal: '#A9A3B0',
  blue: '#5B8FC7',
  blueDark: '#3F6FA3'
};

export const FLOOR = 184;

export type Tone = 'coral' | 'teal' | 'sun' | 'blue';

const TONES: Record<Tone, { bg: string; ground: string }> = {
  coral: { bg: '#F8E1D8', ground: '#F1CDBF' },
  teal: { bg: '#DCEEEA', ground: '#C7E3DD' },
  sun: { bg: '#FCEFC7', ground: '#F6E2A6' },
  blue: { bg: '#E4E7F0', ground: '#D3D8E6' }
};

export function Scene({ tone, label, children }: { tone: Tone; label: string; children: ReactNode }) {
  const t = TONES[tone];
  return (
    <svg className="scene" viewBox="0 0 340 200" role="img" aria-label={label} preserveAspectRatio="xMidYMid slice">
      <rect width="340" height="200" fill={t.bg} />
      <ellipse cx="170" cy="222" rx="210" ry="58" fill={t.ground} />
      {children}
    </svg>
  );
}

// ---------- Adulto (olha para a direita; flip espelha) ----------

export type AdultArm = 'rest' | 'reach' | 'point' | 'hold' | 'high' | 'together' | 'open' | 'phone' | 'book' | 'wave';

interface AdultProps {
  x: number;
  y?: number;
  flip?: boolean;
  arm?: AdultArm;
  mouth?: 'smile' | 'talk' | 'o' | 'flat';
  brows?: 'normal' | 'up';
  eye?: 'ahead' | 'down' | 'up';
  lean?: number;
}

function Arm({ d, hand, color = C.teal, width = 14, r = 7 }: { d: string; hand: [number, number]; color?: string; width?: number; r?: number }) {
  return (
    <g>
      <path d={d} stroke={color} strokeWidth={width} strokeLinecap="round" fill="none" />
      <circle cx={hand[0]} cy={hand[1]} r={r} fill={C.skinA} />
    </g>
  );
}

const ADULT_BACK_ARM: Partial<Record<AdultArm, ReactNode>> = {
  high: <Arm d="M-4 -60 C18 -70 40 -76 62 -78" hand={[64, -79]} color={C.tealDark} />,
  together: <Arm d="M-4 -60 C12 -58 26 -62 38 -68" hand={[40, -70]} color={C.tealDark} />,
  open: <Arm d="M-10 -60 C-26 -70 -34 -82 -40 -92" hand={[-42, -96]} color={C.tealDark} />
};

const ADULT_FRONT_ARM: Record<AdultArm, ReactNode> = {
  rest: <Arm d="M18 -58 C30 -44 32 -34 36 -26" hand={[37, -24]} />,
  reach: <Arm d="M18 -58 C38 -50 52 -46 70 -48" hand={[74, -48]} />,
  point: <Arm d="M18 -58 C34 -66 46 -78 56 -90" hand={[58, -93]} r={6.5} />,
  hold: <Arm d="M18 -58 C34 -60 48 -64 62 -68" hand={[66, -69]} />,
  high: <Arm d="M18 -58 C40 -64 64 -72 84 -80" hand={[86, -81]} />,
  together: <Arm d="M18 -58 C30 -56 38 -60 44 -66" hand={[46, -68]} />,
  open: (
    <g>
      <path d="M18 -58 C32 -66 42 -80 50 -92" stroke={C.teal} strokeWidth={14} strokeLinecap="round" fill="none" />
      <ellipse cx="52" cy="-98" rx="6.5" ry="9" fill={C.skinA} transform="rotate(20 52 -98)" />
    </g>
  ),
  phone: (
    <g>
      <path d="M18 -58 C32 -68 34 -82 34 -92" stroke={C.teal} strokeWidth={14} strokeLinecap="round" fill="none" />
      <circle cx="34" cy="-96" r="7" fill={C.skinA} />
      <rect x="30" y="-122" width="16" height="26" rx="3" fill={C.ink} />
      <rect x="32" y="-119" width="12" height="18" rx="1.5" fill="#8FB8E8" />
    </g>
  ),
  book: <Arm d="M18 -58 C34 -52 44 -48 54 -46" hand={[56, -45]} />,
  wave: (
    <g>
      <path d="M18 -58 C30 -72 34 -88 36 -100" stroke={C.teal} strokeWidth={14} strokeLinecap="round" fill="none" />
      <ellipse cx="37" cy="-106" rx="6.5" ry="9" fill={C.skinA} />
    </g>
  )
};

export function Adult({ x, y = FLOOR, flip = false, arm = 'rest', mouth = 'smile', brows = 'normal', eye = 'ahead', lean = 0 }: AdultProps) {
  const eyeY = eye === 'down' ? -100 : eye === 'up' ? -106 : -103;
  return (
    <g transform={`translate(${x} ${y})${flip ? ' scale(-1 1)' : ''}`}>
      <path d="M-64 0 C-64 -20 -34 -28 6 -26 C36 -24 56 -16 56 0 Z" fill={C.navy} />
      <g transform={`rotate(${lean} 0 -20)`}>
        {ADULT_BACK_ARM[arm]}
        <path d="M-36 -20 C-38 -56 -24 -76 -2 -78 C20 -80 34 -62 36 -20 Z" fill={C.teal} />
        <rect x="2" y="-90" width="12" height="16" rx="5" fill={C.skinAShade} />
        <circle cx="10" cy="-102" r="24" fill={C.skinA} />
        <path d="M-14 -102 C-18 -126 0 -134 16 -130 C30 -128 36 -118 34 -110 C26 -118 10 -118 -2 -112 C-6 -110 -10 -106 -14 -102 Z" fill={C.hair} />
        <circle cx="-10" cy="-120" r="9" fill={C.hair} />
        <circle cx={eye === 'down' ? 22 : 21} cy={eyeY} r="2.6" fill={C.ink} />
        <path
          d={brows === 'up' ? 'M16 -112 Q21 -117 27 -114' : 'M16 -111 Q21 -113 26 -111'}
          stroke={C.ink}
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
        {mouth === 'smile' && <path d="M21 -92 Q27 -87 32 -93" stroke={C.mouth} strokeWidth="2.4" fill="none" strokeLinecap="round" />}
        {mouth === 'talk' && <ellipse cx="28" cy="-91" rx="4" ry="4.5" fill={C.mouth} />}
        {mouth === 'o' && <ellipse cx="29" cy="-92" rx="3" ry="3.5" fill={C.mouth} />}
        {mouth === 'flat' && <path d="M22 -91 L31 -91" stroke={C.mouth} strokeWidth="2.4" strokeLinecap="round" />}
        <circle cx="14" cy="-94" r="4" fill={C.coralLight} opacity="0.55" />
        {ADULT_FRONT_ARM[arm]}
      </g>
    </g>
  );
}

// ---------- Bebê (olha para a esquerda; flip espelha) ----------

export type BabyArm = 'rest' | 'point' | 'reach' | 'up' | 'head' | 'clap' | 'mouth' | 'hold';

interface BabyProps {
  x: number;
  y?: number;
  flip?: boolean;
  arm?: BabyArm;
  mouth?: 'o' | 'smile' | 'talk' | 'flat' | 'sad';
  eye?: 'ahead' | 'up' | 'down' | 'closed';
  outfit?: string;
  pacifier?: boolean;
  hideBody?: boolean;
}

function BArm({ d, hand, color }: { d: string; hand: [number, number]; color: string }) {
  return (
    <g>
      <path d={d} stroke={color} strokeWidth={11} strokeLinecap="round" fill="none" />
      <circle cx={hand[0]} cy={hand[1]} r={5.5} fill={C.skinB} />
    </g>
  );
}

export function Baby({ x, y = FLOOR, flip = false, arm = 'rest', mouth = 'smile', eye = 'ahead', outfit = C.blue, pacifier = false, hideBody = false }: BabyProps) {
  const shade = outfit === C.sun ? '#DDA93A' : outfit === C.coralLight ? '#D07A60' : C.blueDark;
  const back: Partial<Record<BabyArm, ReactNode>> = {
    up: <BArm d="M10 -38 C16 -52 18 -62 20 -72" hand={[21, -75]} color={shade} />,
    clap: <BArm d="M8 -38 C-4 -46 -14 -52 -22 -56" hand={[-23, -57]} color={shade} />
  };
  const front: Record<BabyArm, ReactNode> = {
    rest: <BArm d="M-8 -32 C-14 -22 -16 -16 -18 -10" hand={[-19, -8]} color={outfit} />,
    point: <BArm d="M-10 -34 C-22 -32 -32 -34 -40 -40" hand={[-42, -41]} color={outfit} />,
    reach: <BArm d="M-10 -36 C-22 -44 -32 -52 -42 -60" hand={[-44, -62]} color={outfit} />,
    up: <BArm d="M-8 -38 C-16 -52 -18 -62 -22 -72" hand={[-23, -75]} color={outfit} />,
    head: (
      <g>
        <BArm d="M12 -40 C28 -52 32 -72 24 -88" hand={[22, -91]} color={shade} />
        <BArm d="M-12 -40 C-28 -52 -32 -72 -24 -88" hand={[-22, -91]} color={outfit} />
      </g>
    ),
    clap: <BArm d="M-8 -36 C-18 -40 -24 -46 -28 -52" hand={[-29, -54]} color={outfit} />,
    mouth: <BArm d="M-10 -38 C-26 -52 -40 -66 -54 -76" hand={[-57, -78]} color={outfit} />,
    hold: <BArm d="M-10 -34 C-18 -34 -26 -34 -32 -34" hand={[-34, -34]} color={outfit} />
  };
  const eyePos: Record<string, [number, number]> = { ahead: [-12, -72], up: [-12, -75], down: [-13, -69] };
  return (
    <g transform={`translate(${x} ${y})${flip ? ' scale(-1 1)' : ''}`}>
      {!hideBody && (
        <>
          {back[arm]}
          <ellipse cx="-30" cy="-3" rx="13" ry="7" fill={outfit} />
          <path d="M-22 0 C-32 -2 -34 -28 -22 -42 C-12 -54 14 -54 22 -40 C32 -24 28 -2 18 0 Z" fill={outfit} />
        </>
      )}
      <circle cx="0" cy="-70" r="26" fill={C.skinB} />
      <circle cx="15" cy="-68" r="5" fill={C.skinBEar} />
      <path d="M-4 -95 C0 -104 11 -102 8 -93" stroke={C.hair} strokeWidth="3" fill="none" strokeLinecap="round" />
      {eye === 'closed' ? (
        <path d="M-17 -71 Q-12 -67 -7 -71" stroke={C.ink} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      ) : (
        <circle cx={eyePos[eye][0]} cy={eyePos[eye][1]} r="2.6" fill={C.ink} />
      )}
      {mouth === 'o' && <ellipse cx="-15" cy="-59" rx="3" ry="3.6" fill={C.mouth} />}
      {mouth === 'talk' && <ellipse cx="-15" cy="-59" rx="4" ry="4.6" fill={C.mouth} />}
      {mouth === 'smile' && <path d="M-21 -62 Q-15 -55 -9 -61" stroke={C.mouth} strokeWidth="2.4" fill="none" strokeLinecap="round" />}
      {mouth === 'flat' && <path d="M-19 -59 Q-15 -58 -11 -59" stroke={C.mouth} strokeWidth="2.4" fill="none" strokeLinecap="round" />}
      {mouth === 'sad' && <path d="M-20 -57 Q-15 -61 -10 -57" stroke={C.mouth} strokeWidth="2.4" fill="none" strokeLinecap="round" />}
      <circle cx="-5" cy="-62" r="4.5" fill={C.coralLight} opacity="0.55" />
      {pacifier && (
        <g>
          <ellipse cx="-24" cy="-59" rx="4" ry="7" fill={C.teal} />
          <circle cx="-29" cy="-59" r="4" fill="none" stroke={C.teal} strokeWidth="2" />
        </g>
      )}
      {!hideBody && front[arm]}
    </g>
  );
}

// ---------- Balões e marcas ----------

export function Bubble({ x, y, text, w, tail = 'left', color = C.ink, size = 16 }: { x: number; y: number; text: string; w?: number; tail?: 'left' | 'right' | 'none'; color?: string; size?: number }) {
  const width = w ?? Math.max(48, text.length * (size * 0.58) + 28);
  const left = x - width / 2;
  return (
    <g>
      <rect x={left} y={y - 17} width={width} height="34" rx="17" fill={C.white} />
      {tail === 'left' && <path d={`M${left + 18} ${y + 14} L${left + 10} ${y + 28} L${left + 30} ${y + 15} Z`} fill={C.white} />}
      {tail === 'right' && <path d={`M${left + width - 18} ${y + 14} L${left + width - 10} ${y + 28} L${left + width - 30} ${y + 15} Z`} fill={C.white} />}
      <text x={x} y={y + size * 0.36} textAnchor="middle" className="scene-text" fontSize={size} fill={color}>
        {text}
      </text>
    </g>
  );
}

export function DotsBubble({ x, y, tail = 'left' }: { x: number; y: number; tail?: 'left' | 'right' }) {
  return (
    <g>
      <rect x={x - 29} y={y - 15} width="58" height="30" rx="15" fill={C.white} />
      {tail === 'left' ? (
        <path d={`M${x - 21} ${y + 13} L${x - 27} ${y + 23} L${x - 11} ${y + 14} Z`} fill={C.white} />
      ) : (
        <path d={`M${x + 21} ${y + 13} L${x + 27} ${y + 23} L${x + 11} ${y + 14} Z`} fill={C.white} />
      )}
      <circle cx={x - 13} cy={y} r="3.5" fill={C.gray} />
      <circle cx={x} cy={y} r="3.5" fill={C.gray} />
      <circle cx={x + 13} cy={y} r="3.5" fill={C.gray} />
    </g>
  );
}

export function LinesBubble({ x, y, w = 64 }: { x: number; y: number; w?: number }) {
  return (
    <g>
      <rect x={x - w / 2} y={y - 15} width={w} height="30" rx="15" fill={C.white} />
      <path d={`M${x - w / 2 + 16} ${y + 13} L${x - w / 2 + 9} ${y + 24} L${x - w / 2 + 27} ${y + 14} Z`} fill={C.white} />
      <path d={`M${x - w / 2 + 14} ${y - 4} H${x + w / 2 - 14}`} stroke="#D3CCD8" strokeWidth="4" strokeLinecap="round" />
      <path d={`M${x - w / 2 + 14} ${y + 5} H${x + w / 2 - 26}`} stroke="#D3CCD8" strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

export function ArcArrow({ d, head, color = C.coral }: { d: string; head: string; color?: string }) {
  return (
    <g>
      <path d={d} stroke={color} strokeWidth="2.5" strokeDasharray="5 6" fill="none" strokeLinecap="round" />
      <path d={head} stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

export function Clock({ x, y, text = '10 s', r = 32 }: { x: number; y: number; text?: string; r?: number }) {
  const circ = 2 * Math.PI * r;
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={C.white} />
      <circle
        cx={x}
        cy={y}
        r={r}
        fill="none"
        stroke={C.teal}
        strokeWidth="5"
        strokeDasharray={`${circ * 0.75} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${x} ${y})`}
      />
      <text x={x} y={y + 7} textAnchor="middle" className="scene-text" fontSize="20" fill={C.ink}>
        {text}
      </text>
    </g>
  );
}

export function Notes({ x, y, color = C.coral, scale = 1 }: { x: number; y: number; color?: string; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill={color} stroke={color}>
      <path d="M0 0 V-22 L16 -26 V-4" strokeWidth="2.6" fill="none" />
      <ellipse cx="-3" cy="1" rx="5" ry="4" stroke="none" />
      <ellipse cx="13" cy="-3" rx="5" ry="4" stroke="none" />
      <path d="M30 -8 V-28" strokeWidth="2.6" fill="none" />
      <ellipse cx="27" cy="-7" rx="5" ry="4" stroke="none" />
      <path d="M30 -28 Q36 -24 38 -18" strokeWidth="2.6" fill="none" />
    </g>
  );
}

export function Waves({ x, y, dir = 1, color = C.coral }: { x: number; y: number; dir?: 1 | -1; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${dir} 1)`} stroke={color} strokeWidth="2.6" fill="none" strokeLinecap="round">
      <path d="M0 -8 Q6 0 0 8" />
      <path d="M9 -14 Q18 0 9 14" />
      <path d="M18 -20 Q30 0 18 20" />
    </g>
  );
}

export function Sparkle({ x, y, color = C.sun, s = 1 }: { x: number; y: number; color?: string; s?: number }) {
  return <path d={`M${x} ${y - 8 * s} L${x + 2.5 * s} ${y - 2.5 * s} L${x + 8 * s} ${y} L${x + 2.5 * s} ${y + 2.5 * s} L${x} ${y + 8 * s} L${x - 2.5 * s} ${y + 2.5 * s} L${x - 8 * s} ${y} L${x - 2.5 * s} ${y - 2.5 * s} Z`} fill={color} />;
}

// ---------- Objetos ----------

export function Ball({ x, y, r = 15, color = C.coral }: { x: number; y: number; r?: number; color?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={color} />
      <path d={`M${x - r + 2} ${y - 2} Q${x} ${y - r * 0.7} ${x + r - 2} ${y - 2}`} stroke={C.white} strokeWidth="2.5" fill="none" />
    </g>
  );
}

export function Apple({ x, y, r = 11 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x - r * 0.35} cy={y} r={r} fill="#D2463A" />
      <circle cx={x + r * 0.35} cy={y} r={r} fill="#D2463A" />
      <path d={`M${x} ${y - r + 1} Q${x + 1} ${y - r - 6} ${x + 4} ${y - r - 8}`} stroke={C.woodDark} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <ellipse cx={x + 7} cy={y - r - 4} rx="5" ry="2.6" fill="#5F9E4F" transform={`rotate(-25 ${x + 7} ${y - r - 4})`} />
      <ellipse cx={x - r * 0.5} cy={y - r * 0.35} rx="2.6" ry="4" fill="#F08A7E" />
    </g>
  );
}

export function Banana({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-16 -6 C-12 8 8 12 18 -4 C10 4 -6 4 -16 -6 Z" fill="#F4CF3E" stroke="#C9A12A" strokeWidth="1.5" />
      <path d="M18 -4 L21 -8" stroke="#6B5A2A" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

export function Cup({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x - 12} ${y - 30} L${x + 12} ${y - 30} L${x + 9} ${y} L${x - 9} ${y} Z`} fill="#CFE6F2" stroke="#8FB8D0" strokeWidth="2" />
      <path d={`M${x - 10.5} ${y - 18} L${x + 10.5} ${y - 18} L${x + 9} ${y} L${x - 9} ${y} Z`} fill="#7FB6DA" />
    </g>
  );
}

export function Bowl({ x, y, food = false }: { x: number; y: number; food?: boolean }) {
  return (
    <g>
      {food && (
        <>
          <circle cx={x - 7} cy={y - 14} r="5" fill="#8BC34A" />
          <circle cx={x + 2} cy={y - 15} r="5" fill="#9CCC65" />
          <circle cx={x + 10} cy={y - 13} r="5" fill="#8BC34A" />
        </>
      )}
      <path d={`M${x - 20} ${y - 12} H${x + 20} C${x + 18} ${y} ${x + 10} ${y + 2} ${x} ${y + 2} C${x - 10} ${y + 2} ${x - 18} ${y} ${x - 20} ${y - 12} Z`} fill={C.coral} />
      <path d={`M${x - 20} ${y - 12} H${x + 20}`} stroke="#8F3624" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

export function Blocks({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x - 26} y={y - 22} width="22" height="22" rx="3" fill={C.teal} />
      <rect x={x - 2} y={y - 22} width="22" height="22" rx="3" fill={C.sun} />
      <rect x={x - 14} y={y - 44} width="22" height="22" rx="3" fill={C.coral} />
      <text x={x - 3} y={y - 27} textAnchor="middle" className="scene-text" fontSize="13" fill={C.white}>
        A
      </text>
    </g>
  );
}

export function Pan({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x - 20} ${y - 18} H${x + 20} V${y - 4} Q${x + 20} ${y} ${x + 16} ${y} H${x - 16} Q${x - 20} ${y} ${x - 20} ${y - 4} Z`} fill={C.metal} />
      <path d={`M${x + 20} ${y - 14} H${x + 36}`} stroke={C.ink} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

export function Lid({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx="20" ry="7" fill={C.metal} />
      <ellipse cx={x} cy={y - 2} rx="16" ry="4" fill="#C6C1CC" />
      <rect x={x - 4} y={y - 12} width="8" height="7" rx="2" fill={C.ink} />
    </g>
  );
}

export function Book({ x, y, picture = 'apple', w = 70 }: { x: number; y: number; picture?: 'apple' | 'dog' | 'none'; w?: number }) {
  const h = w * 0.62;
  return (
    <g>
      <path d={`M${x} ${y - h + 6} Q${x - w / 4} ${y - h - 2} ${x - w / 2} ${y - h + 2} V${y} Q${x - w / 4} ${y - 6} ${x} ${y} Z`} fill={C.white} stroke="#D9CBB6" strokeWidth="2" />
      <path d={`M${x} ${y - h + 6} Q${x + w / 4} ${y - h - 2} ${x + w / 2} ${y - h + 2} V${y} Q${x + w / 4} ${y - 6} ${x} ${y} Z`} fill={C.white} stroke="#D9CBB6" strokeWidth="2" />
      <path d={`M${x - w / 2} ${y} Q${x - w / 4} ${y - 6} ${x} ${y} Q${x + w / 4} ${y - 6} ${x + w / 2} ${y} V${y + 4} H${x - w / 2} Z`} fill={C.navy} />
      {picture === 'apple' && <Apple x={x + w / 4} y={y - h / 2 + 2} r={8} />}
      {picture === 'dog' && <Dog x={x + w / 4 + 4} y={y - 8} s={0.35} />}
      <path d={`M${x - w / 2 + 8} ${y - h / 2 - 4} H${x - 8} M${x - w / 2 + 8} ${y - h / 2 + 4} H${x - 14}`} stroke="#D3CCD8" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

export function Dog({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M26 -30 Q44 -40 40 -56" stroke={C.woodDark} strokeWidth="6" fill="none" strokeLinecap="round" />
      <rect x="-28" y="-20" width="8" height="20" rx="4" fill={C.woodDark} />
      <rect x="16" y="-20" width="8" height="20" rx="4" fill={C.woodDark} />
      <ellipse cx="0" cy="-30" rx="32" ry="17" fill={C.wood} />
      <rect x="-20" y="-20" width="8" height="20" rx="4" fill={C.wood} />
      <rect x="8" y="-20" width="8" height="20" rx="4" fill={C.wood} />
      <circle cx="-30" cy="-50" r="17" fill={C.wood} />
      <ellipse cx="-44" cy="-45" rx="9" ry="7" fill="#E2B889" />
      <circle cx="-50" cy="-48" r="3.2" fill={C.ink} />
      <circle cx="-33" cy="-54" r="2.4" fill={C.ink} />
      <ellipse cx="-20" cy="-52" rx="7" ry="12" fill={C.woodDark} transform="rotate(20 -20 -52)" />
    </g>
  );
}

export function Tub({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x - 40} cy={y - 50} r="9" fill={C.white} opacity="0.95" />
      <circle cx={x - 26} cy={y - 54} r="7" fill={C.white} opacity="0.95" />
      <circle cx={x + 34} cy={y - 52} r="10" fill={C.white} opacity="0.95" />
      <circle cx={x + 48} cy={y - 48} r="7" fill={C.white} opacity="0.95" />
      <path d={`M${x - 64} ${y - 46} H${x + 64} V${y - 20} Q${x + 64} ${y} ${x + 44} ${y} H${x - 44} Q${x - 64} ${y} ${x - 64} ${y - 20} Z`} fill="#7FB6DA" />
      <path d={`M${x - 68} ${y - 48} H${x + 68}`} stroke="#5E9CC4" strokeWidth="6" strokeLinecap="round" />
      <circle cx={x - 60} cy={y - 70} r="5" fill="none" stroke={C.white} strokeWidth="2" />
      <circle cx={x + 62} cy={y - 78} r="4" fill="none" stroke={C.white} strokeWidth="2" />
    </g>
  );
}

export function HighChair({ x, y }: { x: number; y: number }) {
  // y = altura do assento (onde o bebê senta)
  return (
    <g>
      <path d={`M${x - 26} ${y + 2} L${x - 36} ${FLOOR}`} stroke={C.woodDark} strokeWidth="6" strokeLinecap="round" />
      <path d={`M${x + 26} ${y + 2} L${x + 36} ${FLOOR}`} stroke={C.woodDark} strokeWidth="6" strokeLinecap="round" />
      <path d={`M${x - 30} ${y + 16} H${x + 30}`} stroke={C.woodDark} strokeWidth="4" strokeLinecap="round" />
      <rect x={x - 30} y={y - 4} width="60" height="10" rx="4" fill={C.wood} />
      <rect x={x + 16} y={y - 64} width="10" height="64" rx="4" fill={C.wood} />
    </g>
  );
}

export function Tray({ x, y }: { x: number; y: number }) {
  return <rect x={x - 34} y={y - 5} width="44" height="8" rx="4" fill={C.wood} />;
}

export function Fan({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x} 0 V${y}`} stroke={C.gray} strokeWidth="3" />
      <ellipse cx={x - 30} cy={y + 4} rx="30" ry="5" fill={C.wood} />
      <ellipse cx={x + 30} cy={y + 4} rx="30" ry="5" fill={C.wood} />
      <circle cx={x} cy={y + 4} r="8" fill={C.metal} />
      <path d={`M${x - 58} ${y + 16} Q${x - 40} ${y + 24} ${x - 22} ${y + 18}`} stroke={C.gray} strokeWidth="1.8" fill="none" strokeDasharray="3 4" />
      <path d={`M${x + 22} ${y + 18} Q${x + 40} ${y + 24} ${x + 58} ${y + 16}`} stroke={C.gray} strokeWidth="1.8" fill="none" strokeDasharray="3 4" />
    </g>
  );
}

export function Shelf({ x, y, w = 90, children }: { x: number; y: number; w?: number; children?: ReactNode }) {
  return (
    <g>
      {children}
      <rect x={x} y={y} width={w} height="7" rx="2" fill={C.woodDark} />
      <path d={`M${x + 10} ${y + 7} V${y + 18} M${x + w - 10} ${y + 7} V${y + 18}`} stroke={C.woodDark} strokeWidth="3" />
    </g>
  );
}

export function ToyCar({ x, y, color = '#3B7DD8' }: { x: number; y: number; color?: string }) {
  return (
    <g>
      <path d={`M${x - 20} ${y - 6} V${y - 14} Q${x - 20} ${y - 18} ${x - 14} ${y - 18} L${x - 8} ${y - 28} H${x + 8} L${x + 14} ${y - 18} Q${x + 20} ${y - 18} ${x + 20} ${y - 12} V${y - 6} Z`} fill={color} />
      <rect x={x - 6} y={y - 25} width="12" height="7" rx="1.5" fill="#CFE6F2" />
      <circle cx={x - 11} cy={y - 5} r="5.5" fill={C.ink} />
      <circle cx={x + 11} cy={y - 5} r="5.5" fill={C.ink} />
    </g>
  );
}

export function Jar({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x - 18} y={y - 40} width="36" height="40" rx="8" fill="#DCEEF5" stroke="#9CC3D6" strokeWidth="2" />
      <rect x={x - 20} y={y - 48} width="40" height="10" rx="3" fill={C.coral} />
      <circle cx={x - 7} cy={y - 12} r="7" fill="#C98B4C" />
      <circle cx={x + 7} cy={y - 20} r="7" fill="#D39A5C" />
      <circle cx={x + 4} cy={y - 7} r="6" fill="#C98B4C" />
    </g>
  );
}

export function TV({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x - 50} y={y - 64} width="100" height="64" rx="8" fill={C.ink} />
      <rect x={x - 44} y={y - 58} width="88" height="52" rx="4" fill="#7FB6DA" />
      <circle cx={x - 18} cy={y - 34} r="10" fill={C.sun} />
      <path d={`M${x + 2} ${y - 12} L${x + 20} ${y - 40} L${x + 38} ${y - 12} Z`} fill="#5F9E4F" />
      <path d={`M${x - 20} ${y} L${x - 30} ${y + 24} M${x + 20} ${y} L${x + 30} ${y + 24}`} stroke={C.ink} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

export function PhoneOff({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="20" fill={C.white} />
      <rect x={x - 7} y={y - 12} width="14" height="24" rx="3" fill={C.ink} />
      <path d={`M${x - 13} ${y + 13} L${x + 13} ${y - 13}`} stroke={C.coral} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

export function Board({ x, y }: { x: number; y: number }) {
  // Quadro de palavras da geladeira (canto superior esquerdo em x, y)
  const word = (wx: number, wy: number, t: string, color: string = C.ink) => (
    <text x={wx} y={wy} className="scene-text" fontSize="13" fill={color}>
      {t}
    </text>
  );
  return (
    <g>
      <rect x={x} y={y} width="180" height="150" rx="10" fill={C.white} stroke="#D9CBB6" strokeWidth="2" />
      <circle cx={x + 30} cy={y + 2} r="7" fill={C.coral} />
      <circle cx={x + 150} cy={y + 2} r="7" fill={C.teal} />
      <text x={x + 14} y={y + 26} className="scene-label" fontSize="11" fill={C.gray}>
        SETEMBRO
      </text>
      <text x={x + 100} y={y + 26} className="scene-label" fontSize="11" fill={C.gray}>
        OUTUBRO
      </text>
      <path d={`M${x + 90} ${y + 14} V${y + 108}`} stroke="#EFE4D4" strokeWidth="2" />
      {word(x + 14, y + 48, 'mamãe')}
      {word(x + 14, y + 66, 'papai')}
      {word(x + 14, y + 84, 'ága')}
      {word(x + 14, y + 102, 'au-au *')}
      {word(x + 100, y + 48, 'bola')}
      {word(x + 100, y + 66, 'dá')}
      <path d={`M${x + 12} ${y + 116} H${x + 168}`} stroke="#EFE4D4" strokeWidth="2" />
      {word(x + 14, y + 138, '◦ mais   ◦ abre   ◦ acabou', C.coral)}
    </g>
  );
}

export function Moon({ x, y }: { x: number; y: number }) {
  return <path d={`M${x} ${y - 20} A20 20 0 1 0 ${x + 18} ${y + 8} A15 15 0 1 1 ${x} ${y - 20} Z`} fill={C.sun} />;
}
