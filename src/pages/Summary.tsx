import { useState } from 'react';
import { Icon, Rich } from '../components/ui';
import { href } from '../router';

// A “cola de bolso”: o RESUMO do material numa tela só.

const SIX: { title: string; text: string; color: string }[] = [
  { title: 'Espere.', text: 'Uns 10 segundos, com cara de expectativa. Qualquer coisa que ele fizer vale como resposta.', color: 'var(--coral)' },
  { title: 'Fale do que ele está olhando.', text: 'O assunto é o que chamou a atenção dele, não o que você está fazendo.', color: 'var(--teal)' },
  { title: 'Comente mais do que pergunta.', text: '“Colher! A colher da sopa.” em vez de “que que é isso?”. Perguntou algo que exige palavra? Uma vez só — e responda você.', color: 'var(--navy)' },
  { title: 'Devolva um pouquinho maior.', text: 'Ele: “ága” → você: “Água! Água geladinha.” Sem corrigir e sem pedir pra repetir.', color: 'var(--coral)' },
  { title: 'Gesto junto com a palavra.', text: '“Acabou” com as mãos abertas, “mais” juntando as mãos. Sempre os dois — nunca só o gesto.', color: 'var(--teal)' },
  { title: 'Deixe ele precisar pedir.', text: 'Um pedacinho de cada vez, pote fechado, os dois objetos na mão. No primeiro sinal, atenda e fale por ele.', color: 'var(--navy)' }
];

const SECTIONS: { id: string; title: string; items: string[] }[] = [
  {
    id: 'como',
    title: 'Como falar com ele',
    items: [
      'Devagar, com frases **curtas** (2 a 4 palavras).',
      'Voz um pouco mais aguda e animada, alongando a palavra importante: “Ááágua! Água quente.”',
      '“Au-au”, “papá”, “brum-brum” **ajudam** — sempre junto com a palavra completa: “au-au, o cachorro”.'
    ]
  },
  {
    id: 'boca',
    title: 'Deixe ele ver sua boca',
    items: [
      'Fale **de frente e na altura dele**. Sentar no chão resolve quase tudo.',
      '**Não fale de outro cômodo** nem de costas.',
      '**Nada na frente da boca** — copo, mão, celular, comida.',
      '**Articule bem** a palavra importante: “Á-gua. Água.”',
      'Se ele quiser **encostar a mão na sua boca**, deixe.',
      '**Chupeta:** tire nas horas de conversa, leitura e brincadeira.',
      '**Balbucio é treino:** responda e devolva o som.'
    ]
  },
  {
    id: 'sem',
    title: 'Se ele responde sem falar',
    items: [
      'Apontou, disse “esse”, balançou a cabeça? **Ele respondeu.**',
      'Não peça a palavra. Complete por ele na hora: “Esse! A maçã. Você quer maçã.”'
    ]
  },
  {
    id: 'semana',
    title: 'Palavras da semana',
    items: [
      'Escolha **de 5 a 10** e insista nelas por uma semana, sem cobrar repetição.',
      'Verbos e palavras sociais destravam mais: mais, acabou, abre, cai, dá, quer, olha, não, oi, tchau, água, vem, sai.',
      'Em vez de “Quer mais?”, diga **“Mais!”** — e entregue.'
    ]
  },
  {
    id: 'momentos',
    title: 'Nos momentos do dia',
    items: [
      '**Banho:** partes do corpo, “molha”, “cai”, “acabou”.',
      '**Comida:** porção pequena, “mais”, escolha com os dois potes na mão.',
      '**Trocar roupa:** sequência sempre igual, com pausa: “agora o… pé!”',
      '**Livro:** aponte e comente as figuras. Deixe ele virar as páginas.',
      '**Música:** com gesto, parando antes da última palavra.',
      '**Chão:** ele escolhe a brincadeira; você faz junto e comenta.'
    ]
  },
  {
    id: 'evitar',
    title: 'O que evitar',
    items: [
      '**Pedir pra ele repetir** (“fala, fala”). Gera travamento.',
      '**Corrigir:** “não é ága, é água”.',
      '**Responder no lugar dele** antes que ele tente.',
      '**Telas** — TV, celular, tablet. Inclusive a TV ligada de fundo.'
    ]
  }
];

export function Summary() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <main className="page">
      <header className="stack-sm">
        <h1 className="h1">Cola de bolso</h1>
        <p className="lead" style={{ fontSize: 15 }}>
          O essencial numa tela só, pra consultar no meio do dia.
        </p>
      </header>

      <section className="card dark">
        <span className="eyebrow" style={{ color: '#f2c14e' }}>
          A ideia por trás de tudo
        </span>
        <p className="display" style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.35 }}>
          Não é falar <em>para</em> ele. É falar <em>com</em> ele: ele emite, você responde, ele emite de novo.
        </p>
      </section>

      <h2 className="eyebrow">As 6 coisas principais</h2>
      <div className="stack-sm" style={{ gap: 8 }}>
        {SIX.map((s, i) => (
          <div key={s.title} className="num-card">
            <span className="num" style={{ background: s.color }}>
              {i + 1}
            </span>
            <span className="stack-sm" style={{ gap: 2 }}>
              <strong style={{ fontSize: 16 }}>{s.title}</strong>
              <span style={{ fontSize: 14, lineHeight: 1.45, color: 'var(--muted)' }}>{s.text}</span>
            </span>
          </div>
        ))}
      </div>

      <h2 className="eyebrow">Pra consultar</h2>
      <div className="accordion">
        {SECTIONS.map((s) => {
          const isOpen = open === s.id;
          return (
            <div key={s.id} className="accordion-item">
              <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : s.id)}>
                <span className="label">{s.title}</span>
                <span className="sign" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              {isOpen && (
                <ul className="bullets">
                  {s.items.map((it) => (
                    <li key={it}>
                      <Rich text={it} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      <p className="body-text" style={{ fontSize: 15 }}>
        No fim das contas, estimular a fala não precisa ser complicado: conversar, cantar, ler e brincar junto no meio da rotina já é um ambiente rico
        em linguagem. Mais do que esperar palavras novas a cada dia, o importante é o bebê se sentir ouvido, compreendido e incentivado a se comunicar —
        no ritmo dele.
      </p>

      <a className="link-row" href={href('/sobre')}>
        <Icon name="info" />
        <span className="grow">
          <strong>Sobre o guia e referências</strong>
          <span className="small">Os estudos por trás de cada dica</span>
        </span>
        <Icon name="chevron" size={20} />
      </a>
    </main>
  );
}
