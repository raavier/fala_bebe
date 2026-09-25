import type { WordKind } from '../store';

// Dica do dia: frases curtas tiradas do RESUMO.
export const TIPS: { topic: string; text: string }[] = [
  { topic: 'Esperar', text: 'Depois de falar com ele, espere uns 10 segundos em silêncio, com cara de expectativa. Qualquer coisa que ele fizer vale como resposta.' },
  { topic: 'Foco', text: 'Fale do que ele está olhando — não do que você está fazendo.' },
  { topic: 'Comentar', text: 'Comente mais do que pergunta: “Colher! A colher da sopa.” em vez de “que que é isso?”.' },
  { topic: 'Devolver', text: 'Devolva o que ele disse, um pouquinho maior. Sem corrigir e sem pedir pra repetir.' },
  { topic: 'Gestos', text: 'Gesto junto com a palavra. Sempre os dois — nunca só o gesto.' },
  { topic: 'Pedir', text: 'Um pedacinho de cada vez na comida: é assim que nasce o “mais”.' },
  { topic: 'Boca', text: 'Quando ele fica encarando a sua boca, não é distração — é exatamente o que ele precisa fazer. Fale de frente, na altura dele.' },
  { topic: 'Boca', text: 'Não fale de outro cômodo nem de costas. Vale atravessar a casa pra dizer a frase olhando pra ele.' },
  { topic: 'Chupeta', text: 'Vale tirar a chupeta nas horas de conversa, leitura e brincadeira. Pra sono e consolo, tudo bem.' },
  { topic: 'Balbucio', text: 'Balbucio é treino, não barulho. Responda ao “bababa” como se fosse palavra — e devolva o som.' },
  { topic: 'Sem falar', text: 'Se ele responde apontando ou com a cabeça, ele respondeu. Complete por ele: “Esse! A maçã. Você quer maçã.”' },
  { topic: 'Música', text: 'Cante e pare antes da última palavra, olhando pra ele.' },
  { topic: 'Telas', text: 'TV ligada de fundo reduz a fala dirigida a ele. Desligue quando ninguém estiver assistindo.' },
  { topic: 'Parentês', text: 'Frases curtas, de 2 a 4 palavras, com a palavra importante no fim: “Ááágua! Água quente.”' },
  { topic: 'Parentês', text: '“Au-au” ajuda — sempre junto com a palavra completa: “au-au, o cachorro”.' },
  { topic: 'Perguntas', text: 'Pergunte uma vez. Se não vier nada, responda você e siga em frente.' },
  { topic: 'Leitura', text: 'No livro, não precisa ler o texto: aponte e comente as figuras. E deixe ele virar as páginas.' },
  { topic: 'Rotina', text: 'Nada disso exige hora marcada: banho, comida, troca de roupa e brincadeira já bastam.' }
];

export function tipOfTheDay(date = new Date()): { topic: string; text: string } {
  const start = new Date(date.getFullYear(), 0, 0);
  const day = Math.floor((date.getTime() - start.getTime()) / 86_400_000);
  return TIPS[day % TIPS.length];
}

// Momentos do dia (seções “Nos momentos do dia” e “Onde encaixar na rotina”).
export const MOMENTS: { id: string; label: string; tip: string }[] = [
  { id: 'banho', label: 'Banho', tip: 'Nomeie partes do corpo e use verbos: “molha”, “cai”, “acabou”. Quando a água for embora: “Acabou!”' },
  { id: 'comida', label: 'Comida', tip: 'Porção pequena, um pedacinho de cada vez: “Mais!”. Na hora de escolher, os dois potes na mão, na altura do rosto dele.' },
  { id: 'roupa', label: 'Troca de roupa', tip: 'Sequência sempre igual, com pausa: “agora o… [espera] pé!”' },
  { id: 'livro', label: 'Livro', tip: 'Aponte e comente as figuras — não precisa ler o texto. Deixe ele virar as páginas.' },
  { id: 'musica', label: 'Música', tip: 'Músicas com gesto são as melhores. Cante e pare antes da última palavra, olhando pra ele.' },
  { id: 'rua', label: 'Carro e rua', tip: 'Nomeie o que ele está olhando pela janela ou apontando na prateleira do mercado.' },
  { id: 'chao', label: 'Brincadeira no chão', tip: 'Sente na altura dele, deixe ele escolher a brincadeira, faça junto e comente. E espere.' },
  { id: 'dormir', label: 'Antes de dormir', tip: 'Um ou dois livros, apontando, comentando e esperando a vez dele.' }
];

export function momentForHour(hour: number): string {
  if (hour >= 6 && hour < 9) return 'roupa';
  if (hour >= 11 && hour < 14) return 'comida';
  if (hour >= 17 && hour < 19) return 'banho';
  if (hour >= 19 && hour < 22) return 'dormir';
  return 'chao';
}

// Marcos da Cartilha de Desenvolvimento da Sociedade Brasileira de Pediatria.
export const MILESTONES: { id: string; short: string; label: string; items: string[] }[] = [
  { id: '12', short: '12 m', label: '12 meses', items: ['Acena “tchau”', 'Chama a mãe ou o pai de “mama” / “papa”', 'Entende “não” (pausa ou para)'] },
  {
    id: '15',
    short: '15 m',
    label: '15 meses',
    items: [
      'Tenta dizer uma ou duas palavras além de “mama” / “papa”',
      'Olha para um objeto familiar quando você o nomeia',
      'Segue instruções dadas com gesto e palavra',
      'Aponta para pedir ou para conseguir ajuda'
    ]
  },
  { id: '18', short: '18 m', label: '18 meses', items: ['Tenta dizer três ou mais palavras além de “mama” / “papa”', 'Segue uma instrução simples sem gesto (“me dá o brinquedo”)'] },
  {
    id: '24',
    short: '2 anos',
    label: '2 anos',
    items: ['Junta pelo menos duas palavras (“mais leite”)', 'Aponta coisas no livro quando você pergunta', 'Aponta pelo menos duas partes do corpo', 'Usa outros gestos além de acenar e apontar']
  },
  { id: '30', short: '30 m', label: '30 meses', items: ['Diz cerca de 50 palavras', 'Junta duas ou mais palavras com um verbo', 'Nomeia coisas no livro', 'Usa palavras como “eu”'] },
  { id: '36', short: '3 anos', label: '3 anos', items: ['Conversa em frases de duas a três palavras', 'A fala é compreensível para pessoas de fora da família na maior parte do tempo'] }
];

// Palavras da semana: sugestões do material e como ensinar cada uma.
export const WORD_GROUPS: { label: string; words: string[] }[] = [
  { label: 'Ações e pedidos', words: ['mais', 'acabou', 'abre', 'cai', 'dá', 'quer', 'olha', 'vem', 'sai', 'desce'] },
  { label: 'Sociais', words: ['oi', 'tchau', 'não'] },
  { label: 'Coisas do dia', words: ['água', 'papá'] }
];

export const WORD_EXAMPLES: Record<string, { from: string; to: string; note: string }> = {
  mais: { from: '“Quer mais?”', to: '“Mais!”', note: 'e entrega na hora, juntando as mãos' },
  acabou: { from: '“Acabou a papinha?”', to: '“Acabou! Acabou tudo.”', note: 'com as mãos abertas' },
  abre: { from: '“Quer que eu abra?”', to: '“Abre! Abriu.”', note: 'e abre' },
  água: { from: '“Quer água?”', to: '“Água!”', note: 'e dá o copo' },
  desce: { from: '“Você quer descer?”', to: '“Desce! Vamos descer.”', note: 'e tira da cadeira' }
};

export function wordExample(word: string): { from: string; to: string; note: string } {
  const known = WORD_EXAMPLES[word.toLowerCase()];
  if (known) return known;
  const cap = word.charAt(0).toUpperCase() + word.slice(1);
  return { from: 'Uma pergunta de sim ou não', to: `“${cap}!”`, note: 'sozinha, na hora em que acontece' };
}

const KIND_GUESS: Record<string, WordKind> = {
  mais: 'social', acabou: 'acao', abre: 'acao', cai: 'acao', 'dá': 'acao', quer: 'acao', olha: 'acao', vem: 'acao', sai: 'acao', desce: 'acao',
  oi: 'social', tchau: 'social', 'não': 'social', sim: 'social',
  'água': 'coisa', 'papá': 'coisa',
  mamãe: 'pessoa', papai: 'pessoa', mama: 'pessoa', papa: 'pessoa', vovó: 'pessoa', vovô: 'pessoa',
  'au-au': 'som', brum: 'som', mu: 'som', 'miau': 'som'
};

export function guessKind(word: string): WordKind | undefined {
  return KIND_GUESS[word.trim().toLowerCase()];
}

export const KIND_LABEL: Record<WordKind, string> = {
  coisa: 'coisa',
  acao: 'ação',
  social: 'social',
  som: 'som',
  pessoa: 'pessoa'
};

// Músicas com gesto citadas no material.
export const SONGS: { title: string; gesture: string; pause: string }[] = [
  { title: 'Cabeça, ombro, joelho e pé', gesture: 'Toque cada parte do corpo enquanto canta.', pause: '“Cabeça, ombro, joelho e…” — e espere o “pé!”' },
  { title: 'A dona aranha', gesture: 'Os dedos sobem pela “parede”; as mãos descem como a chuva.', pause: 'Pare antes de “parede” e olhe pra ele.' },
  { title: 'Se você está contente', gesture: 'Bata palmas no fim de cada verso.', pause: '“Se você está contente, bata…” — e espere as palmas.' },
  { title: 'Parabéns pra você', gesture: 'Bata palmas no ritmo.', pause: '“Parabéns pra você, nesta data…” — e silêncio.' }
];

export const REFERENCES: { title: string; note: string; url: string }[] = [
  { title: 'Sociedade Brasileira de Pediatria — Cartilha de Desenvolvimento, 2 meses a 5 anos', note: 'Fonte dos marcos por idade', url: 'https://www.sbp.com.br/imprensa/detalhe/nid/sbp-lanca-traducao-de-cartilha-de-desenvolvimento-elaborada-pelo-centers-of-disease-control-and-prevention/' },
  { title: 'Romeo et al. (2018), Psychological Science', note: 'Turnos de conversa e ativação cerebral', url: 'https://journals.sagepub.com/doi/abs/10.1177/0956797617742725' },
  { title: 'Romeo et al. (2021), Developmental Cognitive Neuroscience', note: 'Turnos e crescimento cortical', url: 'https://www.sciencedirect.com/science/article/pii/S187892932100058X' },
  { title: 'Ferjan Ramírez, Lytle & Kuhl (2020), PNAS', note: 'Experimento com baby talk', url: 'https://www.pnas.org/doi/10.1073/pnas.1921653117' },
  { title: 'Roberts & Kaiser (2011), AJSLP', note: 'Intervenções aplicadas pelos pais', url: 'https://pubs.asha.org/doi/10.1044/1058-0360(2011/10-0055)' },
  { title: 'Rowe, Özçalışkan & Goldin-Meadow (2008), First Language', note: 'Gestos e vocabulário', url: 'https://journals.sagepub.com/doi/10.1177/0142723707088310' },
  { title: 'Ota et al. (2018), Cognitive Science', note: 'Diminutivos, sílabas repetidas e vocabulário', url: 'https://onlinelibrary.wiley.com/doi/10.1111/cogs.12628' },
  { title: 'Lewkowicz & Hansen-Tift (2012), PNAS', note: 'Atenção à boca de quem fala', url: 'https://www.pnas.org/doi/10.1073/pnas.1114783109' },
  { title: 'Hillairet de Boisferon et al. (2018), J. of Experimental Child Psychology', note: 'Volta da atenção à boca aos 14 e 18 meses', url: 'https://www.sciencedirect.com/science/article/abs/pii/S0022096517303028' },
  { title: 'Bruderer et al. (2015), PNAS', note: 'Movimento da língua e percepção de sons', url: 'https://www.pnas.org/doi/10.1073/pnas.1508631112' },
  { title: 'Choi et al. (2019), Psychonomic Bulletin & Review', note: 'Replicação do estudo acima', url: 'https://link.springer.com/article/10.3758/s13423-019-01601-0' },
  { title: 'Imada, Kuhl et al. (2006)', note: 'Área de produção da fala ao ouvir, no primeiro ano', url: 'https://ilabs.uw.edu/sites/default/files/Imada_etal_2006_InfantSpeech.pdf' },
  { title: 'McCauley, Strand et al. (2009), AJSLP', note: 'Revisão sobre exercícios orais não-verbais', url: 'https://pubs.asha.org/doi/10.1044/1058-0360(2009/09-0006)' },
  { title: 'Mol et al. (2008)', note: 'Leitura com participação da criança', url: 'https://www.tandfonline.com/doi/abs/10.1080/10409280701838603' },
  { title: 'Fitzpatrick et al. (2014), First Language', note: 'Sinais em bebês ouvintes', url: 'https://journals.sagepub.com/doi/full/10.1177/0142723714562864' },
  { title: 'ASHA — Late Language Emergence', note: 'Critérios sobre atraso de linguagem', url: 'https://www.asha.org/practice-portal/clinical-topics/late-language-emergence/' },
  { title: 'Hanen Centre', note: 'Esperar, seguir a criança, marcos de vocabulário', url: 'https://www.hanen.org/information-tips/how-to-tell-if-your-child-is-a-late-talker' }
];
