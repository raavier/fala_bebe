export type SceneId =
  | 'vaivem'
  | 'tenis'
  | 'narrador'
  | 'banho'
  | 'entende'
  | 'intencao'
  | 'ouvido'
  | 'caraacara'
  | 'espera'
  | 'comenta'
  | 'tampa'
  | 'ventilador'
  | 'mercado'
  | 'parentes'
  | 'cachorro'
  | 'boca'
  | 'toque'
  | 'balbucio'
  | 'prova'
  | 'escolha'
  | 'livroMaca'
  | 'bola'
  | 'agua'
  | 'geladeira'
  | 'lanche'
  | 'mais'
  | 'acabou'
  | 'aponta'
  | 'prateleira'
  | 'cansado'
  | 'livro'
  | 'musica'
  | 'cabecaOmbro'
  | 'tv'
  | 'celular'
  | 'chao';

export interface Card {
  title: string;
  scene?: SceneId;
  body?: string[];
  bullets?: string[];
  chips?: { label: string; items: string[] };
  swap?: { head?: [string, string]; rows: { from: string; to: string; note?: string }[] };
  steps?: string[];
  table?: { head: [string, string]; rows: [string, string][] };
  quote?: string;
  after?: string[];
  why?: { body: string[]; source?: string };
  source?: string;
  link?: { to: string; label: string };
}

export interface Option {
  text: string;
  feedback: string;
}

export interface ChoiceQuestion {
  kind: 'escolha' | 'cenario' | 'emvezde' | 'vf';
  prompt: string;
  options: Option[];
  correct: number;
}

export interface OrderQuestion {
  kind: 'ordem';
  prompt: string;
  items: string[]; // na ordem certa
  shuffled: number[]; // ordem em que aparecem na tela
  feedback: string;
}

export type Question = ChoiceQuestion | OrderQuestion;

export type PartId = 'fundamentos' | 'tecnicas' | 'dia' | 'acompanhar';

export interface Lesson {
  id: string;
  n: number;
  part: PartId;
  title: string;
  subtitle: string;
  scene: SceneId;
  cards: Card[];
  quiz: Question[];
  takeaway: string;
  mission: { text: string; checks: [string, string, string] };
}
