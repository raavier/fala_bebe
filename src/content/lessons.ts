import type { ChoiceQuestion, Lesson, PartId } from './types';

// Conteúdo das lições, baseado no material “Estimulando a fala do bebê”.
// Texto dos cartões no nível do RESUMO; o detalhe e a ciência ficam em “Por que funciona?”.
// Marcação simples: **negrito** e *itálico*.

function vf(prompt: string, answer: boolean, why: string): ChoiceQuestion {
  return {
    kind: 'vf',
    prompt,
    correct: answer ? 0 : 1,
    options: [
      { text: 'Verdadeiro', feedback: answer ? why : `Na verdade, é falso. ${why}` },
      { text: 'Falso', feedback: answer ? `Na verdade, é verdadeiro. ${why}` : why }
    ]
  };
}

export const PARTS: { id: PartId; label: string }[] = [
  { id: 'fundamentos', label: 'Fundamentos' },
  { id: 'tecnicas', label: 'As técnicas' },
  { id: 'dia', label: 'No dia a dia' },
  { id: 'acompanhar', label: 'Acompanhar' }
];

export const LESSONS: Lesson[] = [
  {
    id: 'servir-e-devolver',
    n: 1,
    part: 'fundamentos',
    title: 'Servir e devolver',
    subtitle: 'A ideia central: turnos de conversa',
    scene: 'vaivem',
    cards: [
      {
        title: 'Não é o volume. É o vaivém.',
        scene: 'vaivem',
        body: [
          'Por muito tempo se achou que o segredo era a quantidade: quanto mais palavras o bebê ouvisse, melhor. A pesquisa mais recente mostrou outra coisa.',
          'O que mais faz diferença são os **turnos** — a conversa de ida e volta. Ele emite alguma coisa (um som, um gesto, um olhar), alguém responde, e ele emite de novo.'
        ]
      },
      {
        title: 'Ele saca, você devolve',
        scene: 'tenis',
        body: [
          'O Center on the Developing Child, de Harvard, chama isso de **servir e devolver**. A imagem é a de uma partida de tênis: ele saca, você devolve.'
        ],
        quote: 'Não é falar *para* ele. É falar *com* ele.',
        why: {
          body: [
            'Pesquisadores de Harvard e do MIT gravaram o dia a dia de famílias e depois fizeram exames de imagem nas crianças. As que tinham mais turnos em casa mostravam mais atividade na região do cérebro responsável pela produção da fala e conexões mais fortes entre as áreas de linguagem — independentemente da renda ou da escolaridade dos pais.',
            'Num estudo seguinte, quando uma intervenção conseguiu aumentar os turnos das famílias, essas mesmas regiões do cérebro cresceram.'
          ],
          source: 'Romeo et al., 2018 e 2021'
        }
      },
      {
        title: 'Menos narração, mais pausa',
        scene: 'narrador',
        body: [
          'A consequência é meio contraintuitiva: um adulto que narra sem parar, mas nunca faz pausa, oferece um ambiente **pobre**.',
          'Um adulto que fala menos, mas devolve tudo que a criança emite, oferece um ambiente **rico**.'
        ]
      },
      {
        title: 'Cabe na rotina',
        scene: 'banho',
        body: [
          'Nada aqui exige tempo extra nem hora marcada. Tudo acontece dentro do banho, da comida, da troca de roupa e da brincadeira que já fazem parte do dia.',
          'E um dado animador: quando os pais usam essas estratégias em casa, os ganhos de vocabulário são comparáveis aos da terapia feita diretamente pelo fonoaudiólogo. O que se faz em casa **é** a intervenção.'
        ],
        source: 'Roberts & Kaiser, 2011'
      }
    ],
    quiz: [
      {
        kind: 'escolha',
        prompt: 'Segundo a pesquisa, o que mais pesa para a fala aparecer entre 1 e 3 anos?',
        correct: 1,
        options: [
          { text: 'A quantidade de palavras que ele ouve por dia', feedback: 'Era o que se achava. Mas o que mais pesa é quantas vezes por dia ele é respondido — os turnos.' },
          { text: 'Quantas vezes por dia ele é respondido', feedback: 'O vaivém — ele emite, alguém responde, ele emite de novo — é o que constrói a linguagem.' },
          { text: 'Deixar música e desenho tocando por perto', feedback: 'Som de fundo não tem ida e volta. O que conta é alguém respondendo a ele.' }
        ]
      },
      {
        kind: 'cenario',
        prompt: 'Qual destes ambientes é mais rico para a fala?',
        correct: 1,
        options: [
          { text: 'Um adulto que narra tudo o tempo todo, sem pausa', feedback: 'Muita fala e nenhum turno: ele nunca tem a vez dele.' },
          { text: 'Um adulto que fala menos, mas responde a cada som, gesto ou olhar', feedback: 'Devolver tudo que ele emite é o que faz o ambiente ser rico.' },
          { text: 'Um adulto que fala muito e pede que ele repita as palavras', feedback: 'Pedir repetição vira prova. O que ajuda é responder ao que ele faz.' }
        ]
      },
      vf('Um olhar ou um gesto do bebê já conta como a vez dele na conversa.', true, 'Um som, um gesto, um olhar: tudo é saque. O seu trabalho é devolver.')
    ],
    takeaway: 'Não é falar para ele. É falar com ele.',
    mission: {
      text: 'Repare nos “saques” do bebê — um som, um olhar, um apontar — e devolva cada um com uma frase curta.',
      checks: ['Manhã', 'Tarde', 'Noite']
    }
  },
  {
    id: 'o-que-esperar',
    n: 2,
    part: 'fundamentos',
    title: 'O que esperar',
    subtitle: 'Entender vem antes de falar',
    scene: 'entende',
    cards: [
      {
        title: 'Ele entende muito mais do que fala',
        scene: 'entende',
        body: [
          'Entre uns 12 meses e 3 anos, o **entender caminha bem à frente do falar**. É normal compreender dezenas de coisas e produzir poucas palavras — e a distância entre as duas é maior justamente no segundo ano de vida.',
          'O silêncio dele não quer dizer que a mensagem não chegou. Quer dizer só que a boca ainda não acompanha a cabeça.'
        ]
      },
      {
        title: 'Poucas palavras, muita variação',
        body: [
          'Os marcos de 15 e 18 meses falam em **tentar dizer** uma, duas, três palavras — não em contagens altas de vocabulário.',
          'Entre 12 e 24 meses **a variação normal é enorme**, e o número de palavras de hoje, sozinho, informa muito pouco.'
        ],
        why: {
          body: [
            'Os marcos vêm da Cartilha de Desenvolvimento da Sociedade Brasileira de Pediatria. São marcos de vigilância: descrevem o que a maioria das crianças faz naquela idade, não o que toda criança precisa fazer.',
            'Se algum marco da idade não estiver presente, isso não é diagnóstico de nada: é o momento de levar a observação à consulta pediátrica em vez de pesquisar na internet.'
          ],
          source: 'Cartilha de Desenvolvimento — SBP'
        },
        link: { to: '/praticar/marcos', label: 'Ver os marcos por idade' }
      },
      {
        title: 'O que informa mais que contar palavras',
        scene: 'intencao',
        bullets: [
          '**Ele entende?** Atende instruções simples sem que ninguém aponte junto.',
          '**Ele se comunica com intenção?** Aponta pra pedir e também pra *mostrar*, dá objetos, busca o seu olhar, atende pelo nome, puxa você até o que quer.',
          '**Está avançando?** Palavras novas continuam aparecendo ao longo das semanas.'
        ],
        after: ['Se essas três estão de pé, o quadro é tranquilo — mesmo com poucas palavras faladas.']
      },
      {
        title: 'O gesto é o degrau antes da palavra',
        body: [
          'Apontar, entregar, acenar e balançar a cabeça não substituem a fala: são o caminho por onde ela chega. Crianças que gesticulam mais costumam falar mais depois.'
        ],
        chips: {
          label: 'Conta como variedade de gestos',
          items: ['apontar coisas diferentes', 'mostrar (erguer o objeto)', 'dar', 'acenar', 'sim e não com a cabeça', 'braços pra pedir colo', 'mandar beijo', 'dar de ombros', 'soprar = quente', 'braços abertos = grande', 'mão na boca = comer']
        },
        why: {
          body: [
            'Um estudo acompanhou crianças dos 14 aos 42 meses. Aos 14 meses, mediu quantos significados diferentes cada criança conseguia transmitir com gestos. Esse número previu o tamanho do vocabulário aos 42 meses — acima do efeito das palavras que ela já falava.',
            'Outro achado da mesma linha: os objetos que a criança aponta por volta dos 14 meses costumam aparecer na fala uns três meses depois.'
          ],
          source: 'Rowe, Özçalışkan & Goldin-Meadow, 2008'
        }
      },
      {
        title: 'Vale checar a audição',
        scene: 'ouvido',
        body: [
          'Mesmo achando que ele escuta bem, faça uma **avaliação auditiva**. Perdas leves ou intermitentes — como a otite com líquido no ouvido, muito comum entre 6 meses e 3 anos — passam despercebidas em casa e afetam diretamente a fala.',
          'É rápido, indolor e elimina a causa mais simples de resolver.'
        ]
      }
    ],
    quiz: [
      vf('Se o bebê fala poucas palavras, é sinal de que não está entendendo o que você diz.', false, 'Nesta idade o entender vem bem à frente do falar: ele compreende muito mais do que consegue produzir.'),
      {
        kind: 'escolha',
        prompt: 'Qual destes sinais informa MAIS do que o número de palavras?',
        correct: 0,
        options: [
          { text: 'Ele aponta pra pedir e pra mostrar coisas a você', feedback: 'Comunicar com intenção é um dos três sinais que mais pesam, junto com entender e continuar avançando.' },
          { text: 'Ele já sabe nomear as cores', feedback: 'Isso nem é esperado nessa idade. O que pesa é entender, se comunicar com intenção e continuar avançando.' },
          { text: 'Ele fala mais palavras que o primo da mesma idade', feedback: 'Comparar contagens informa pouco: entre 12 e 24 meses a variação normal é enorme.' }
        ]
      },
      {
        kind: 'cenario',
        prompt: 'Ele aponta o cachorro, depois a bola, depois a lua. O que isso mostra?',
        correct: 1,
        options: [
          { text: 'Que ele troca palavras por gestos, e isso atrasa a fala', feedback: 'Gesto não atrasa a fala: é o degrau antes da palavra.' },
          { text: 'Que ele tem variedade de gestos — ótimo sinal pro vocabulário', feedback: 'Apontar coisas diferentes conta como significados diferentes. Essa variedade prevê o vocabulário futuro.' },
          { text: 'Nada de especial: apontar é sempre o mesmo gesto', feedback: 'Cada coisa diferente apontada é um significado diferente. Quanto mais coisas ele indica, maior a variedade.' }
        ]
      }
    ],
    takeaway: 'Entender, se comunicar com intenção e continuar avançando pesam mais do que contar palavras.',
    mission: {
      text: 'Repare em quantas coisas diferentes ele consegue indicar sem falar — e responda a cada gesto como se fosse palavra.',
      checks: ['Apontou algo', 'Mostrou um objeto', 'Fez outro gesto']
    }
  },
  {
    id: 'esperar',
    n: 3,
    part: 'tecnicas',
    title: 'Esperar',
    subtitle: 'Os 10 segundos que mudam a conversa',
    scene: 'espera',
    cards: [
      {
        title: 'O erro mais comum de quem quer ajudar',
        scene: 'narrador',
        body: [
          'É preencher todo o silêncio. Aí o bebê nunca precisa começar nada.',
          'Esta lição é sobre abrir espaço pra vez dele.'
        ]
      },
      {
        title: 'Fique cara a cara',
        scene: 'caraacara',
        body: ['Na altura dele — no chão, ou com ele na cadeira alta. Ele precisa ver o seu rosto pra perceber que é a vez dele.']
      },
      {
        title: 'Espere até 10 segundos',
        scene: 'espera',
        body: [
          'Depois de falar, fique em silêncio olhando pra ele, com cara de expectativa: sobrancelha erguida, sorriso, corpo inclinado pra frente.'
        ],
        chips: { label: 'Vale como resposta dele', items: ['um olhar', 'um resmungo', 'apontar', 'um gesto', 'um “ã”'] },
        after: ['Trate como se ele tivesse falado — e responda.'],
        why: {
          body: [
            'O que constrói a fala são os **turnos**: ele emite algo, alguém responde, ele emite de novo. Crianças com mais turnos em casa mostram mais atividade na área do cérebro que produz a fala. Sem pausa, a vez dele nunca chega.',
            'E dez segundos é muito mais longo do que parece: quase todo mundo espera dois ou três e acha que esperou bastante.'
          ],
          source: 'Romeo et al., 2018'
        }
      },
      {
        title: 'E se não vier nada?',
        scene: 'comenta',
        body: [
          'Comente o que ele está fazendo — “Você está empilhando!” — e espere de novo.',
          'Vale contar mentalmente algumas vezes até calibrar. Os seus “10 segundos” provavelmente são mais curtos do que você imagina.'
        ],
        link: { to: '/praticar/espera', label: 'Treinar a espera' }
      }
    ],
    quiz: [
      {
        kind: 'cenario',
        prompt: 'Você mostrou a bola e disse “Olha a bola!”. O bebê só olhou pra você e sorriu. E agora?',
        correct: 1,
        options: [
          { text: 'Peço: “Fala bola! Bo-la!”', feedback: 'Pedir pra repetir transforma a conversa em prova, e ele trava. O olhar e o sorriso já foram a vez dele.' },
          { text: 'Trato o olhar como resposta: “É a bola! Bola vermelha.”', feedback: 'Qualquer coisa vale como a vez dele: olhar, sorriso, gesto, um “ã”. Você responde, e a conversa segue.' },
          { text: 'Mudo de assunto, porque ele não respondeu', feedback: 'Ele respondeu, sim — com o olhar. Nessa idade o entender vem bem antes do falar.' }
        ]
      },
      {
        kind: 'escolha',
        prompt: 'Depois de falar com ele, quanto tempo vale esperar em silêncio?',
        correct: 1,
        options: [
          { text: '2 ou 3 segundos', feedback: 'É o que quase todo mundo faz — e acha que esperou bastante. Ele precisa de mais tempo pra organizar uma resposta.' },
          { text: 'Até uns 10 segundos', feedback: 'Parece muito, mas é o tempo que ele precisa. E a espera acaba no primeiro sinal dele: olhar, gesto, som.' },
          { text: 'Até ele dizer a palavra certa', feedback: 'Aí a espera vira prova de resistência. Ela termina no primeiro sinal de comunicação, não na palavra.' }
        ]
      },
      {
        kind: 'cenario',
        prompt: 'Você esperou os 10 segundos e não veio nada. O que fazer?',
        correct: 1,
        options: [
          { text: 'Repito a pergunta até ele responder', feedback: 'Insistir vira cobrança. O que atrapalha não é a pergunta — é a insistência depois dela.' },
          { text: 'Comento o que ele está fazendo e espero de novo', feedback: 'Comente o que está no foco dele — “Você está empilhando!” — e ofereça outra pausa.' },
          { text: 'Desisto: hoje ele não está a fim', feedback: 'Não precisa desistir: comente o que ele está fazendo e espere de novo. Só se ele estiver com fome ou cansado vale deixar pra depois.' }
        ]
      }
    ],
    takeaway: 'Qualquer coisa que ele fizer vale como resposta. Trate como se ele tivesse falado.',
    mission: {
      text: 'Em 3 momentos do dia, diga uma frase curta e espere 10 segundos olhando pra ele.',
      checks: ['Banho', 'Comida', 'Troca de roupa']
    }
  },
  {
    id: 'foco',
    n: 4,
    part: 'tecnicas',
    title: 'Fale do que ele está olhando',
    subtitle: 'Os dois olhando a mesma coisa',
    scene: 'tampa',
    cards: [
      {
        title: 'A palavra gruda quando os dois olham junto',
        scene: 'tampa',
        body: [
          'A palavra gruda quando você nomeia o objeto que o bebê **já está olhando**: os dois prestando atenção na mesma coisa, no mesmo instante.',
          'Por isso “falar sobre o que ele está olhando” rende muito mais do que “falar bastante”. Se ele está fascinado pela tampa da panela, o assunto do próximo minuto é tampa de panela.'
        ]
      },
      {
        title: 'Narrar funciona — com dois cuidados',
        scene: 'ventilador',
        body: ['Narrar o dia a dia é uma das maneiras mais fáceis de aumentar o contato dele com palavras. O que separa a narração que rende da que se perde:'],
        bullets: [
          '**Narre o que está no foco dele**, não a sua tarefa. Descrever a troca de fralda passo a passo enquanto ele encara o ventilador não constrói nada. Nomear o ventilador, sim.',
          '**Faça pausa a cada duas ou três frases.** Narração contínua produz muito volume e nenhum turno — e turno é o que faz efeito.'
        ]
      },
      {
        title: 'Na rua, no carro, no mercado',
        scene: 'mercado',
        body: [
          'Nomeie o que **ele** está olhando pela janela ou apontando na prateleira. Siga o dedo e o olhar dele — e fale disso, com frases curtas e pausa.'
        ]
      }
    ],
    quiz: [
      {
        kind: 'cenario',
        prompt: 'Você está trocando a fralda e ele encara o ventilador de teto. O que rende mais?',
        correct: 1,
        options: [
          { text: 'Narrar a troca: “agora a pomada, agora a fralda…”', feedback: 'Narrar a sua tarefa enquanto ele olha outra coisa não constrói nada.' },
          { text: '“Ventilador! O ventilador gira.” — e esperar', feedback: 'Você nomeou o que já está no foco dele, e a palavra gruda. A pausa dá a vez a ele.' },
          { text: 'Pedir que ele olhe pra você', feedback: 'Não precisa disputar a atenção: vá até onde ela já está.' }
        ]
      },
      vf('Narrar sem parar, o dia todo, é a melhor forma de estimular a fala.', false, 'Narrar ajuda, mas precisa de pausa a cada duas ou três frases. Sem pausa há muito volume e nenhum turno — e turno é o que faz efeito.'),
      {
        kind: 'escolha',
        prompt: 'Ele está fascinado pela tampa da panela. Qual é o assunto do próximo minuto?',
        correct: 1,
        options: [
          { text: 'As cores que ele precisa aprender', feedback: 'Puxar pra outro assunto obriga ele a largar o que o interessa. Siga o foco dele.' },
          { text: 'A tampa da panela', feedback: 'Os dois olhando a mesma coisa, no mesmo instante: é aí que a palavra gruda.' },
          { text: 'O que você vai cozinhar', feedback: 'Esse é o seu foco, não o dele. O assunto é o que chamou a atenção dele.' }
        ]
      }
    ],
    takeaway: 'O assunto é o que chamou a atenção dele — não o que você está fazendo.',
    mission: {
      text: 'Três vezes hoje, siga o olhar dele e nomeie o que ele está olhando, com uma frase curta e uma pausa.',
      checks: ['1ª vez', '2ª vez', '3ª vez']
    }
  },
  {
    id: 'parentes',
    n: 5,
    part: 'tecnicas',
    title: 'Parentês (baby talk)',
    subtitle: 'Voz, ritmo e o “au-au”',
    scene: 'parentes',
    cards: [
      {
        title: 'O jeito de falar com bebês',
        scene: 'parentes',
        body: [
          'Tom um pouco mais agudo, entonação bem marcada, ritmo mais lento, frases curtas, palavra-chave alongada. Quase todo adulto fala assim com bebês, em praticamente todas as culturas.',
          'Não é frescura nem infantilização: esse jeito prende a atenção e deixa o contorno das palavras mais fácil de perceber no meio da fala corrida.'
        ],
        why: {
          body: [
            'É uma das poucas coisas nessa área com evidência de causa e efeito: num experimento, famílias orientadas a usar mais baby talk tinham bebês com vocabulário maior meses depois.'
          ],
          source: 'Ferjan Ramírez, Lytle & Kuhl, 2020'
        }
      },
      {
        title: 'Como fica na prática',
        bullets: [
          'Devagar, com frases **curtas**: de 2 a 4 palavras.',
          'Palavra importante **alongada e no fim**: “Ááágua! Água quente.”',
          'Voz animada, expressão marcada, olho no olho.'
        ]
      },
      {
        title: '“Au-au” ajuda',
        scene: 'cachorro',
        body: [
          '“Au-au”, “papá”, “brum-brum”: essas formas são mais fáceis de recortar da fala corrida e de guardar na memória. E são feitas de sons que ele já consegue produzir — deixam ele **falar alguma coisa** antes de dar conta da palavra adulta.'
        ],
        quote: '“O cachorro! Au-au, o cachorro.”',
        after: ['O melhor uso é oferecer as duas formas na mesma frase. E se ele disser “au-au”, conta como palavra.'],
        why: {
          body: [
            'Um estudo acompanhou 47 bebês dos 9 aos 21 meses: os que ouviam mais diminutivos e palavras com sílabas repetidas ganhavam vocabulário mais rápido.',
            '“Au-au” é uma ponte — e uma ponte de mão dupla.'
          ],
          source: 'Ota et al., 2018'
        }
      },
      {
        title: 'O que evitar: frase quebrada',
        body: [
          'Deformar a estrutura da frase não é baby talk. “Neném quer papá do dodói?” é frase quebrada.',
          'A regra: **gramática correta, palavras reais, frases curtas** — e o “au-au” à vontade.'
        ]
      }
    ],
    quiz: [
      {
        kind: 'emvezde',
        prompt: 'Qual frase segue melhor o parentês?',
        correct: 1,
        options: [
          { text: '“Olha, filho, o cachorro do vizinho está latindo lá fora de novo.”', feedback: 'Frase longa demais: a palavra importante se perde no meio.' },
          { text: '“Au-au! O cachorro. O cachorro late.”', feedback: 'Curta, com a palavra-chave no fim e as duas formas juntas: “au-au” e “cachorro”.' },
          { text: '“Neném viu o au-au do dodói?”', feedback: 'Isso é frase quebrada. Gramática correta, palavras reais — e o “au-au” junto da palavra completa.' }
        ]
      },
      vf('Usar “au-au” e “brum-brum” atrapalha o bebê a aprender a palavra certa.', false, 'Essas formas ajudam: são mais fáceis de recortar e de falar. Use junto com a palavra completa: “au-au, o cachorro”.'),
      {
        kind: 'escolha',
        prompt: 'Onde colocar a palavra importante na frase?',
        correct: 1,
        options: [
          { text: 'No começo, pra chamar a atenção', feedback: 'Palavra sozinha e no fim da frase é bem mais fácil de isolar no meio da fala.' },
          { text: 'No fim, alongada: “Ááágua!”', feedback: 'No fim e alongada, ela se destaca do resto da frase.' },
          { text: 'Tanto faz', feedback: 'Faz diferença: no fim e alongada, ela é muito mais fácil de perceber.' }
        ]
      }
    ],
    takeaway: 'Frases curtas, palavra importante no fim e alongada — e o “au-au” junto da palavra completa.',
    mission: {
      text: 'Escolha 3 palavras do dia e fale cada uma alongada, no fim de uma frase curta: “Ááágua! Água quente.”',
      checks: ['Palavra 1', 'Palavra 2', 'Palavra 3']
    }
  },
  {
    id: 'boca',
    n: 6,
    part: 'tecnicas',
    title: 'Deixe ele ver sua boca',
    subtitle: 'Ele aprende olhando',
    scene: 'boca',
    cards: [
      {
        title: 'Ele olha pra sua boca — de propósito',
        scene: 'boca',
        body: [
          'Nesta idade a criança olha pra **boca** de quem fala, não pros olhos. Ela precisa *ver* a fala pra aprender a fazer os sons: a forma dos lábios, a abertura da mandíbula, a língua — tudo sincronizado com o som.',
          'Quando ele fica encarando a sua boca, não é distração. Ele está trabalhando.'
        ],
        why: {
          body: [
            'Com rastreamento ocular, um estudo viu que até os 4 meses os bebês olham pros olhos de quem fala; entre 6 e 8 meses, a atenção migra pra boca.',
            'Aos 14 e aos 18 meses, as crianças voltam a olhar mais pra boca do que pros olhos — justamente na fase de aprender palavras novas. E quanto mais um bebê fixa a boca de quem fala aos 6 e aos 12 meses, maior tende a ser o vocabulário aos 18 e aos 24.',
            'São estudos correlacionais, mas vários estudos independentes apontam na mesma direção — e a ação que eles sugerem não tem nenhum custo.'
          ],
          source: 'Lewkowicz & Hansen-Tift, 2012 · Hillairet de Boisferon et al., 2018'
        }
      },
      {
        title: 'Na prática',
        scene: 'caraacara',
        bullets: [
          '**De frente e na altura dele.** Sentar no chão resolve quase tudo.',
          '**Não fale de outro cômodo** nem de costas. Fala sem rosto é só som — vale atravessar a casa pra dizer a frase.',
          '**Rosto iluminado.** Com a janela atrás de você, ele vê uma silhueta.',
          '**Nada na frente da boca:** copo, mão, celular, comida.',
          '**Articule bem** a palavra importante, devagar: “Á-gua. Água.”'
        ]
      },
      {
        title: 'Se ele quiser tocar, deixe',
        scene: 'toque',
        body: [
          'É comum a criança querer pôr a mão na boca de quem fala, ou na própria enquanto imita. Isso é exploração da fala, não bagunça.',
          'Deixe — e aproveite o momento pra repetir a palavra.'
        ]
      },
      {
        title: 'A boca dele também trabalha',
        scene: 'balbucio',
        body: ['Enquanto escuta, o bebê faz microgestos com a língua e os lábios — e eles fazem parte de *como ele ouve*.'],
        bullets: [
          '**Chupeta:** vale tirar nas horas de conversa, leitura e brincadeira. Pra sono e consolo, tudo bem.',
          '**Balbucio é treino, não barulho.** Responda ao “bababa” como se fosse palavra e devolva o som. Brincar de imitar sons um do outro é ótimo.'
        ],
        why: {
          body: [
            'Num experimento, bebês de 6 meses com a ponta da língua bloqueada por um mordedor não conseguiram distinguir dois sons de “d” do hindi; com a língua livre, conseguiram. O resultado foi replicado depois.',
            'Não é que a chupeta atrase a fala — isso é exagero. Mas boca ocupada é boca que não faz esses microgestos.'
          ],
          source: 'Bruderer et al., 2015 · Choi et al., 2019'
        }
      },
      {
        title: 'Exercício de sopro não substitui a fala',
        body: [
          'Sopro, canudo, apito, língua pra um lado e pro outro: é muito vendido, mas uma revisão sistemática achou a evidência **fraca e inconclusiva**. Soprar não é falar.',
          'O que exercita a fala é usá-la: balbuciar, brincar com sons, tentar palavras. Brincadeira de sons com ida e volta é ótima; exercício de musculatura fora da fala não tem respaldo.'
        ],
        source: 'McCauley, Strand et al., 2009 (ASHA)'
      }
    ],
    quiz: [
      {
        kind: 'cenario',
        prompt: 'Você está na cozinha e quer falar com o bebê, que brinca na sala. O melhor é:',
        correct: 1,
        options: [
          { text: 'Falar mais alto, pra ele ouvir de lá', feedback: 'Fala sem rosto é só som. Ele precisa ver a sua boca.' },
          { text: 'Ir até ele, abaixar na altura dele e falar de frente', feedback: 'Vale atravessar a casa pra dizer a frase olhando pra ele.' },
          { text: 'Esperar ele vir até a cozinha', feedback: 'Melhor ir até ele e falar de frente, na altura dos olhos dele.' }
        ]
      },
      vf('Quando o bebê fica encarando a sua boca, é sinal de distração.', false, 'Ele está estudando como o som é feito. É exatamente o que ele precisa fazer nessa idade.'),
      {
        kind: 'escolha',
        prompt: 'Sobre exercícios de sopro, canudo e apito pra “treinar a boca”:',
        correct: 1,
        options: [
          { text: 'São essenciais pra destravar a fala', feedback: 'A evidência é fraca e inconclusiva: soprar não é falar.' },
          { text: 'A evidência é fraca; o que treina a fala é usá-la', feedback: 'Balbuciar, brincar com sons e tentar palavras é o que exercita o sistema da fala.' },
          { text: 'Substituem a conversa se feitos todo dia', feedback: 'Nada substitui a conversa de ida e volta. E o exercício de sopro não tem respaldo.' }
        ]
      },
      vf('Vale tirar a chupeta nas horas de conversa e brincadeira.', true, 'Boca ocupada não faz os microgestos que ajudam a ouvir e a treinar os sons. Pra sono e consolo, pode manter.')
    ],
    takeaway: 'De frente, na altura dele, com nada na frente da boca.',
    mission: {
      text: 'Sempre que for falar com ele hoje, abaixe na altura dele e fale de frente.',
      checks: ['Manhã', 'Tarde', 'Noite']
    }
  },
  {
    id: 'comentar',
    n: 7,
    part: 'tecnicas',
    title: 'Comente mais do que pergunta',
    subtitle: 'Pergunta sem virar prova',
    scene: 'prova',
    cards: [
      {
        title: 'Pergunta de prova trava',
        scene: 'prova',
        body: [
          'O reflexo de quem se preocupa com a fala é perguntar: “que que é isso?”, “fala bola!”, “como faz o cachorro?”. Isso vira prova.',
          'Se ele ainda não tem a palavra, só pode falhar — e o efeito acumulado é ele evitar a situação.'
        ]
      },
      {
        title: 'Troque por comentário',
        swap: {
          rows: [
            { from: '“Que cor é essa?”', to: '“Azul! O carro azul.”' },
            { from: '“Fala água.”', to: '“Água. Água geladinha.”', note: 'entregando o copo' },
            { from: '“Que que é isso?”', to: '“Colher! A colher da sopa.”' },
            { from: '“Como faz o cachorro?”', to: '“O cachorro! Au-au, o cachorro.”' }
          ]
        }
      },
      {
        title: 'Perguntas de verdade continuam ótimas',
        scene: 'escolha',
        body: ['O problema não é perguntar — é **testar**. Perguntas que ele consegue responder de algum jeito, com gesto ou olhar, são ótimas:'],
        bullets: ['“Qual você quer?” (com os dois objetos na mão)', '“Cadê o sapato?”', '“Vamos sair?”', '“O que aconteceu?”'],
        after: ['A proporção que funciona é algo como **4 comentários pra cada pergunta** — e a pergunta sendo genuína, não prova.'],
        why: {
          body: [
            'O que gera turno não é o ponto de interrogação — é a **pausa** e o fato de a criança ter algo a dizer.',
            'Uma pergunta de prova só gera turno se ele souber a resposta; se não souber, ela encerra a conversa. Já um comentário seguido de dez segundos de espera é um convite aberto: qualquer som, gesto ou olhar serve como resposta.'
          ]
        }
      },
      {
        title: 'E se a pergunta pede uma palavra?',
        scene: 'livroMaca',
        body: ['“O que é isso?” apontando a maçã no livro. Não precisa banir — o que importa é o que acontece nos segundos seguintes:'],
        steps: [
          'Pergunte **uma vez**.',
          'Espere alguns segundos.',
          'Se não vier nada, **responda você** e siga em frente: “É a maçã! Maçã vermelha.”'
        ],
        after: [
          'Se ele tiver a palavra, usa; se não tiver, ouve o modelo. Ninguém falhou.',
          'O que faz mal é a insistência: “Que que é? … Fala. … Fala ‘maçã’. … Vai, fala.”'
        ]
      }
    ],
    quiz: [
      {
        kind: 'emvezde',
        prompt: 'Ele está olhando o carrinho azul. Qual frase ajuda mais?',
        correct: 1,
        options: [
          { text: '“Que cor é essa?”', feedback: 'É pergunta de prova: se ele não tem a palavra, só pode falhar.' },
          { text: '“Azul! O carro azul.”', feedback: 'Comentário com o modelo pronto — e depois, pausa pra ele responder do jeito dele.' },
          { text: '“Fala: a-zul.”', feedback: 'Pedir repetição trava. Dê o modelo e deixe a vez com ele.' }
        ]
      },
      {
        kind: 'cenario',
        prompt: 'Você apontou a maçã no livro e perguntou “o que é isso?”. Ele ficou em silêncio. E agora?',
        correct: 1,
        options: [
          { text: 'Pergunto de novo, com mais ênfase', feedback: 'A insistência é o que transforma a pergunta em prova.' },
          { text: 'Respondo: “É a maçã! Maçã vermelha.” e sigo', feedback: 'Pergunte uma vez, espere e, se não vier nada, complete. Ele ouve o modelo e ninguém falhou.' },
          { text: 'Fecho o livro: ele não quer ler', feedback: 'Não precisa parar: complete a resposta e siga a leitura.' }
        ]
      },
      {
        kind: 'escolha',
        prompt: 'Qual destas é uma pergunta “de verdade”, que ele consegue responder?',
        correct: 1,
        options: [
          { text: '“Como chama isso?”', feedback: 'Essa exige uma palavra específica — funciona como prova.' },
          { text: '“Qual você quer?”, com os dois objetos na mão', feedback: 'Ele responde apontando ou olhando. Qualquer resposta vale.' },
          { text: '“Que número é esse?”', feedback: 'Pergunta de prova — e nem é esperado nessa idade.' }
        ]
      }
    ],
    takeaway: 'O problema não é perguntar, é testar. Pergunte uma vez — e, se não vier nada, responda você.',
    mission: {
      text: 'Troque 3 perguntas de prova por comentários: “Colher! A colher da sopa.”',
      checks: ['1ª troca', '2ª troca', '3ª troca']
    }
  },
  {
    id: 'devolver',
    n: 8,
    part: 'tecnicas',
    title: 'Devolva um pouco maior',
    subtitle: 'A fala dele + 1 ou 2 palavras',
    scene: 'bola',
    cards: [
      {
        title: 'Pegue o que ele disse e devolva maior',
        scene: 'bola',
        body: ['Pegue o que ele emitiu e devolva certo, com **uma ou duas palavras a mais**.'],
        swap: {
          head: ['Ele faz', 'Você devolve'],
          rows: [
            { from: '“au”', to: '“É, o cachorro! Au-au. O cachorro late.”' },
            { from: '“bo”, apontando a bola', to: '“A bola! Sua bola pulou.”' },
            { from: 'aponta a porta e resmunga', to: '“Você quer sair. Vamos sair!”' },
            { from: '“papá”', to: '“Papá, sim. Você quer comer.”' }
          ]
        }
      },
      {
        title: 'Logo acima de onde ele está',
        body: [
          'A regra é: **a fala dele + 1 ou 2 palavras**.',
          'Não devolva uma frase de dez palavras — o alvo é ficar logo acima de onde ele está, não muito acima.'
        ]
      },
      {
        title: 'A correção vem dentro da devolução',
        scene: 'agua',
        swap: { rows: [{ from: '“Não é ága, é água.”', to: '“Água! Água geladinha.”' }] },
        body: [
          'A forma certa aparece na sua resposta. Ele ouve o modelo logo depois da própria tentativa — justamente quando está mais atento àquela palavra.',
          'E não peça pra repetir: a repetição vem sozinha, quando ele estiver pronto.'
        ],
        why: {
          body: [
            'No segundo ano, ele está descobrindo que vale a pena se comunicar. Se cada tentativa vira avaliação, tentar passa a ter custo. Crianças corrigidas com frequência tendem a arriscar menos — e arriscar é exatamente o que faz o vocabulário crescer.',
            'O que você quer transmitir a cada tentativa é “funcionou, eu te entendi”, não “quase”.'
          ]
        }
      }
    ],
    quiz: [
      {
        kind: 'emvezde',
        prompt: 'Ele disse “ága” apontando o copo. O que você responde?',
        correct: 2,
        options: [
          { text: '“Não é ága, é água.”', feedback: 'Corrigir de forma explícita muda o cálculo dele: tentar passa a ter custo.' },
          { text: '“Fala direitinho: á-gua.”', feedback: 'Pedir repetição trava. A forma certa pode vir na sua resposta.' },
          { text: '“Água! Água geladinha.”', feedback: 'A correção acontece dentro da devolução: ele ouve o modelo certo logo depois da tentativa.' }
        ]
      },
      {
        kind: 'escolha',
        prompt: 'Ele disse “bo”, apontando a bola. Qual devolução segue a regra?',
        correct: 0,
        options: [
          { text: '“A bola! Sua bola pulou.”', feedback: 'A fala dele + 1 ou 2 palavras: logo acima de onde ele está.' },
          { text: '“Isso, é a bola vermelha que a vovó te deu no aniversário.”', feedback: 'Longa demais: o alvo é ficar logo acima, não muito acima.' },
          { text: '“Bo não, bola.”', feedback: 'Isso é correção explícita. Devolva a palavra certa sem apontar o erro.' }
        ]
      },
      vf('Pedir pra ele repetir a palavra certa ajuda a fixar.', false, 'Pedir repetição gera travamento. A repetição vem sozinha, quando ele estiver pronto.')
    ],
    takeaway: 'A fala dele + 1 ou 2 palavras. A correção vem dentro da resposta, nunca fora.',
    mission: {
      text: 'Devolva maior pelo menos 3 coisas que ele disser ou apontar hoje.',
      checks: ['1ª', '2ª', '3ª']
    }
  },
  {
    id: 'palavras-da-semana',
    n: 9,
    part: 'tecnicas',
    title: 'Palavras da semana',
    subtitle: 'Escolher e ensinar',
    scene: 'mais',
    cards: [
      {
        title: 'Foque em poucas palavras',
        scene: 'geladeira',
        body: [
          'Em vez de tentar ensinar tudo, escolha **de 5 a 10 palavras** e insista nelas por uma semana, em situações variadas, sem cobrar repetição.',
          'O objetivo é ele ouvir cada uma dezenas de vezes por dia, em contextos diferentes.'
        ]
      },
      {
        title: 'Como escolher',
        bullets: [
          '**Úteis no dia a dia dele** — aparecem várias vezes ao dia.',
          '**Fáceis de falar** — sons que ele já produz: p, b, m, t, d.',
          '**Variadas no tipo.** O erro clássico é só ensinar nome de coisa. Verbos e palavras sociais destravam a comunicação, porque servem em qualquer contexto.'
        ],
        chips: {
          label: 'Boas candidatas entre 1 e 2 anos',
          items: ['mais', 'acabou', 'abre', 'cai', 'dá', 'quer', 'olha', 'não', 'oi', 'tchau', 'água', 'papá', 'vem', 'sai']
        }
      },
      {
        title: 'Os 4 passos',
        steps: [
          '**Ache o momento** em que a palavra acontece. “Acabou” se ensina quando a comida acaba, quando a água da banheira vai embora.',
          '**Fale como ele falaria**, não como pergunta.',
          '**Diga logo antes de entregar.** A palavra precisa vir grudada na hora em que o desejo é atendido.',
          '**Repita muito, sem cobrar.** Ela entra primeiro na compreensão e só depois na fala — normalmente com semanas de distância.'
        ]
      },
      {
        title: 'O caso do “mais”',
        scene: 'lanche',
        body: [
          'Na hora do lanche: “quer mais?”. Ele balança a cabeça que sim e ganha o próximo pedaço. Meses assim — e o “mais” não aparece na fala dele.',
          'Não é falta de repetição: a palavra foi dita centenas de vezes. É que a cena nunca pede a palavra:'
        ],
        bullets: [
          'A pergunta de sim ou não pede **“sim”**, não “mais”. Ele está respondendo certo.',
          'A palavra está **no meio da frase**, cercada de outras.',
          'Ele ouve “mais” em posição de **pergunta**, mas precisa ouvir em posição de **pedido**.'
        ]
      },
      {
        title: 'Como reorganizar a cena',
        scene: 'mais',
        steps: [
          'Dê **um pedacinho só** — meio biscoito, três uvas.',
          'Quando ele terminar, **fique em silêncio**, com o resto visível mas fora do alcance, olhando pra ele com expectativa.',
          'No **primeiro sinal** — esticar a mão, olhar o pote, resmungar — diga **“Mais!”** (com as mãos se tocando) e **entregue na hora**.',
          'Depois de entregar, amplie: “Mais banana. Você quer mais.”',
          'Repita no lanche seguinte. E no jantar. E no dia seguinte.'
        ]
      },
      {
        title: 'Troque a pergunta pela palavra',
        swap: {
          rows: [
            { from: '“Quer mais?”', to: '“Mais!”', note: 'e entrega' },
            { from: '“Você quer descer?”', to: '“Desce! Vamos descer.”', note: 'e tira da cadeira' },
            { from: '“Quer que eu abra?”', to: '“Abre! Abriu.”', note: 'e abre' },
            { from: '“Acabou a papinha?”', to: '“Acabou! Acabou tudo.”' },
            { from: '“Quer água?”', to: '“Água!”', note: 'e dá o copo' }
          ]
        },
        after: [
          'Perguntas de sim ou não continuam ótimas pra **conversar** — só não servem pra **ensinar a palavra**.',
          'E quando ele fizer o sim de cabeça, é boa notícia: ele entendeu. Dê a palavra por cima: “Sim! Quer mais. Mais banana.”'
        ],
        link: { to: '/praticar/palavras', label: 'Escolher as palavras da semana' }
      }
    ],
    quiz: [
      {
        kind: 'escolha',
        prompt: 'Por que o “quer mais?” não ensina a palavra “mais”, mesmo repetido centenas de vezes?',
        correct: 1,
        options: [
          { text: 'Porque ele ainda é pequeno demais pra essa palavra', feedback: '“Mais” é uma das melhores palavras entre 1 e 2 anos. O problema é a cena.' },
          { text: 'Porque a pergunta pede “sim”, não “mais”', feedback: 'Ele nunca precisou da palavra pra ser atendido. Fale “Mais!” no lugar da pergunta.' },
          { text: 'Porque falta repetir mais vezes', feedback: 'A palavra já foi dita centenas de vezes. O que falta é ouvir em posição de pedido.' }
        ]
      },
      {
        kind: 'emvezde',
        prompt: 'Hora de tirar ele da cadeira. Qual frase ensina a palavra?',
        correct: 1,
        options: [
          { text: '“Você quer descer?”', feedback: 'Ótima pra conversar, mas a resposta que ela pede é “sim”.' },
          { text: '“Desce! Vamos descer.” — e tira da cadeira', feedback: 'Palavra sozinha, no formato que ele usaria, colada na ação.' },
          { text: '“Fala desce que eu tiro.”', feedback: 'Isso é cobrança. Dê o modelo e atenda.' }
        ]
      },
      {
        kind: 'ordem',
        prompt: 'Toque nos passos pra ensinar uma palavra, na ordem certa:',
        items: ['Ache o momento em que a palavra acontece', 'Fale como ele falaria, não como pergunta', 'Diga logo antes de entregar', 'Repita muito, sem cobrar'],
        shuffled: [2, 0, 3, 1],
        feedback: 'Momento certo, palavra no formato de pedido, colada na entrega — e muita repetição sem cobrança.'
      },
      {
        kind: 'escolha',
        prompt: 'Qual lista de palavras da semana está mais bem escolhida?',
        correct: 1,
        options: [
          { text: 'cachorro, gato, vaca, cavalo, pato', feedback: 'Só nome de coisa — o erro clássico. Misture verbos e palavras sociais.' },
          { text: 'mais, acabou, abre, tchau, água', feedback: 'Mistura verbos, palavras sociais e uma coisa do dia a dia — servem em qualquer contexto.' },
          { text: 'hipopótamo, borboleta, helicóptero, dinossauro', feedback: 'Difíceis de falar e raras no dia a dia.' }
        ]
      }
    ],
    takeaway: 'Não pergunte a palavra: fale a palavra do jeito que ele falaria, na hora em que ela acontece.',
    mission: {
      text: 'Escolha as palavras da semana e use cada uma, sozinha, na hora da ação.',
      checks: ['Manhã', 'Tarde', 'Noite']
    }
  },
  {
    id: 'gestos',
    n: 10,
    part: 'tecnicas',
    title: 'Gesto junto com a palavra',
    subtitle: 'O degrau antes da fala',
    scene: 'acabou',
    cards: [
      {
        title: 'Sempre os dois',
        scene: 'acabou',
        body: [
          'Faça o gesto **junto com** a palavra — nunca no lugar dela.',
          'Gesto não atrasa a fala: ajuda ela a vir.'
        ],
        why: {
          body: [
            'Isso não é só correlação: num experimento, bebês estimulados a apontar mais tiveram ganhos maiores de vocabulário do que o grupo de comparação.',
            'Gesto de adulto puxa gesto de criança, que por sua vez puxa vocabulário.'
          ]
        }
      },
      {
        title: 'Gestos úteis',
        scene: 'mais',
        chips: {
          label: 'Pra usar no dia a dia',
          items: ['apontar', 'acabou (mãos abertas)', 'mais (mãos se tocando)', 'grande (braços abertos)', 'quente (soprar)', 'tchau (acenar)', 'dar de ombros']
        },
        after: ['Sempre o gesto **e** a palavra.']
      },
      {
        title: 'Responda ao gesto dele como a uma palavra',
        scene: 'aponta',
        body: [
          'Tudo que ele faz sem falar merece a mesma resposta que uma palavra mereceria.',
          'Ele aponta a fruteira? “Maçã! Você quer maçã.”'
        ]
      },
      {
        title: 'E os sinais pra bebês?',
        body: [
          'O medo de que sinalizar atrase a fala não se sustenta: uma revisão de estudos com bebês ouvintes não encontrou evidência de que atrapalhe. Os benefícios extras prometidos por cursos comerciais também são incertos.',
          'Se um sinal já funciona pra ele, use sem receio — sempre falando a palavra ao mesmo tempo. É um canal a mais enquanto a fala não chega.'
        ],
        source: 'Fitzpatrick et al., 2014'
      }
    ],
    quiz: [
      vf('Usar gestos com o bebê pode atrasar a fala.', false, 'Gesto não atrasa a fala — é o degrau antes dela. Só use sempre junto com a palavra.'),
      {
        kind: 'escolha',
        prompt: 'Qual é o jeito certo de usar o gesto de “acabou”?',
        correct: 1,
        options: [
          { text: 'Fazer só o gesto, pra ele entender sem palavras', feedback: 'Nunca só o gesto: sempre o gesto e a palavra.' },
          { text: 'Abrir as mãos e dizer “Acabou!” ao mesmo tempo', feedback: 'Gesto e palavra juntos, no momento em que acaba de verdade.' },
          { text: 'Esperar ele falar pra depois fazer o gesto', feedback: 'O gesto vem junto com a sua palavra, como modelo — não depois da dele.' }
        ]
      },
      {
        kind: 'cenario',
        prompt: 'Ele usa um sinal de “mais” que aprendeu na creche. O que fazer?',
        correct: 1,
        options: [
          { text: 'Pedir que pare e fale a palavra', feedback: 'O sinal não impede a fala. Pedir a palavra vira cobrança.' },
          { text: 'Usar o sinal também, sempre dizendo “mais” junto', feedback: 'Um canal a mais enquanto a fala não chega — com a palavra sempre junto.' },
          { text: 'Ignorar o sinal', feedback: 'O sinal é comunicação. Responda a ele como responderia a uma palavra.' }
        ]
      }
    ],
    takeaway: 'Gesto e palavra juntos. O gesto é o degrau, não o substituto.',
    mission: {
      text: 'Faça “acabou” (mãos abertas), “mais” (mãos se tocando) e “tchau” (acenar) sempre dizendo a palavra junto.',
      checks: ['Acabou', 'Mais', 'Tchau']
    }
  },
  {
    id: 'pedir',
    n: 11,
    part: 'tecnicas',
    title: 'Deixe ele precisar pedir',
    subtitle: 'Criar oportunidades',
    scene: 'prateleira',
    cards: [
      {
        title: 'Ambiente perfeito não gera comunicação',
        scene: 'prateleira',
        body: ['Se tudo aparece antes de ele pedir, ele não precisa pedir.'],
        bullets: [
          'Brinquedo favorito **à vista, mas fora do alcance**.',
          'Pote de biscoito **fechado** — ele vai precisar recorrer a alguém.',
          '**Um pedacinho de cada vez**, pra criar o “mais”.',
          '**Erro proposital:** entregue o sapato pra ele pôr na mão, ofereça a colher virada. A reação dele é comunicação.'
        ]
      },
      {
        title: 'Escolha com os objetos na mão',
        scene: 'escolha',
        body: [
          'Segure os dois objetos, um em cada mão, na altura do rosto dele, e espere.',
          '“Quer banana ou maçã?” só falado é abstrato demais antes dos 2 anos. Com as duas frutas na mão, não é.'
        ]
      },
      {
        title: 'A espera termina no primeiro sinal',
        body: [
          'Criar a chance não é prova de resistência. A espera é de alguns segundos e acaba no **primeiro sinal de comunicação** — não quando ele falar a palavra certa.'
        ],
        chips: {
          label: 'Vale como pedido',
          items: ['olhar pra você', 'olhar pro objeto', 'estender a mão', 'apontar', 'resmungar', 'balançar a cabeça', 'tocar o pote']
        },
        after: ['Veio um sinal? **Atenda na hora** e fale por ele: “Maçã! Você quer maçã.”']
      },
      {
        title: 'Com fome ou cansado, não é hora',
        scene: 'cansado',
        body: [
          'Não é pra deixar ele se frustrar — é só pra criar a chance de ele se comunicar.',
          'Se ele estiver com fome, cansado ou já frustrado, não é hora de criar oportunidade nenhuma: é hora de resolver.'
        ]
      },
      {
        title: 'Quando ele responde sem falar',
        body: [
          'Você pergunta “quer esse ou aquele?” e ele aponta, ou diz “esse”. Pergunta “quer mais?” e ele balança a cabeça. Está perfeito: ele entendeu, escolheu e comunicou.',
          'Não peça a palavra. Complete por ele, no mesmo instante: “Esse! A **maçã**. Você quer maçã.”',
          'Depois de muitas repetições assim — logo depois do gesto dele, ligada ao que ele escolheu — a palavra tende a migrar pra fala dele.'
        ]
      }
    ],
    quiz: [
      {
        kind: 'cenario',
        prompt: 'O pote de biscoito está fechado na mesa. Ele olha pro pote e depois pra você. O que fazer?',
        correct: 1,
        options: [
          { text: 'Esperar até ele falar “biscoito”', feedback: 'A espera termina no primeiro sinal, não na palavra. E ele já deu o sinal.' },
          { text: 'Atender na hora: “Biscoito! Você quer biscoito.”', feedback: 'Ele se comunicou com o olhar. Você atende e entra com a palavra.' },
          { text: 'Fingir que não entendeu, pra ele se esforçar mais', feedback: 'Não é pra frustrar. É criar a chance e atender no primeiro sinal.' }
        ]
      },
      {
        kind: 'escolha',
        prompt: 'Ele está com fome e chorando. É hora de:',
        correct: 1,
        options: [
          { text: 'Criar a necessidade de pedir, com o pote fechado', feedback: 'Com fome ou frustrado não é hora de criar oportunidade — é hora de resolver.' },
          { text: 'Resolver: dar a comida', feedback: 'Isso. As oportunidades ficam pros momentos tranquilos.' },
          { text: 'Esperar 10 segundos pra ver se ele pede', feedback: 'Com fome, não. Resolva primeiro.' }
        ]
      },
      {
        kind: 'cenario',
        prompt: 'Você pergunta “quer a maçã ou a banana?”, com as duas na mão. Ele aponta a maçã. E agora?',
        correct: 1,
        options: [
          { text: '“Fala maçã que eu te dou.”', feedback: 'Ele já respondeu. Pedir a palavra vira cobrança.' },
          { text: '“Essa! A maçã. Você quer maçã.” — e entrega', feedback: 'Ele fez a parte dele; você entra com o modelo, colado na escolha.' },
          { text: 'Entrega sem dizer nada', feedback: 'Aproveite: diga a palavra na hora, ligada ao que ele escolheu.' }
        ]
      }
    ],
    takeaway: 'Crie a chance, espere o primeiro sinal, atenda na hora — e fale por ele.',
    mission: {
      text: 'Nas refeições, ofereça um pedacinho de cada vez e segure duas opções, uma em cada mão.',
      checks: ['Café', 'Almoço', 'Jantar']
    }
  },
  {
    id: 'leitura',
    n: 12,
    part: 'dia',
    title: 'Leitura',
    subtitle: 'Ler conversando',
    scene: 'livro',
    cards: [
      {
        title: 'Livro traz palavras que a casa não traz',
        scene: 'livro',
        body: [
          'Ler junto tem efeito consistente sobre o vocabulário — o livro traz palavras que não aparecem na conversa de casa.',
          'Mas o **jeito** de ler importa: quando a criança participa ativamente, o ganho é maior — e maior ainda quanto mais nova ela é.'
        ],
        source: 'Mol et al., 2008'
      },
      {
        title: 'O ciclo',
        scene: 'livroMaca',
        steps: [
          'Aponte e comente: “Olha o cachorro!”',
          'Reaja a qualquer coisa que ele fizer: “Isso! Cachorro.”',
          'Acrescente: “Cachorro grande. O cachorro dorme.”',
          'Repita a frase ampliada e **dê tempo**.'
        ]
      },
      {
        title: 'Regras que facilitam',
        bullets: [
          'Páginas grossas, **poucas figuras por página**, imagens realistas.',
          '**Não precisa ler o texto.** Nomear e comentar figuras vale mais que a história.',
          'Deixe ele virar, voltar, pular. **Livro repetido é ótimo** — a repetição é o que consolida.',
          'Três minutos com ele engajado valem mais que quinze de leitura imposta.'
        ]
      },
      {
        title: 'Interromper ou deixar correr?',
        bullets: [
          '**Deixe correr** quando ele estiver absorvido na história, virando as páginas, querendo saber o que vem.',
          '**Interrompa** quando ele der o sinal: parar numa figura, apontar, olhar pra você, fazer um som.',
          '**Você pode abrir uma pausa**, de leve. Se ele empurrar sua mão ou virar a página, volte à história sem insistir.',
          '**Livro repetido resolve o impasse:** na primeira leitura, corra a história; na terceira vez do mesmo livro, sobra espaço pra parar e explorar.'
        ],
        after: ['Não existe leitura “errada”. Ler o texto inteiro sem parar continua sendo tempo bem gasto.']
      }
    ],
    quiz: [
      vf('Pra leitura valer, é preciso ler o texto do livro inteiro.', false, 'Nomear e comentar as figuras vale mais que a história. E ler o texto inteiro também é tempo bem gasto.'),
      {
        kind: 'cenario',
        prompt: 'No meio da história, ele para numa página e aponta o gato. O que fazer?',
        correct: 1,
        options: [
          { text: 'Seguir lendo, pra não perder o fio', feedback: 'Ele deu o sinal: a atenção já está no lugar certo. É hora de parar.' },
          { text: 'Parar e comentar: “O gato! O gato dorme.” — e esperar', feedback: 'Aponte, reaja, acrescente e dê tempo.' },
          { text: 'Perguntar “que bicho é esse?” até ele responder', feedback: 'Insistir vira prova. Comente e dê tempo.' }
        ]
      },
      {
        kind: 'ordem',
        prompt: 'Toque nos passos do ciclo de leitura, na ordem certa:',
        items: ['Aponte e comente', 'Reaja ao que ele fizer', 'Acrescente uma ou duas palavras', 'Repita e dê tempo'],
        shuffled: [1, 3, 0, 2],
        feedback: 'Aponte, reaja, acrescente — e dê tempo pra ele entrar na conversa.'
      }
    ],
    takeaway: 'Aponte, reaja, acrescente e dê tempo. Livro repetido é ótimo.',
    mission: {
      text: 'Leia um livro do jeito da lição: apontando, comentando e esperando a vez dele.',
      checks: ['Apontei e comentei', 'Esperei a vez dele', 'Ele virou a página']
    }
  },
  {
    id: 'musica',
    n: 13,
    part: 'dia',
    title: 'Música',
    subtitle: 'Pare antes da última palavra',
    scene: 'musica',
    cards: [
      {
        title: 'Previsibilidade',
        scene: 'musica',
        body: [
          'Uma música cantada todo dia fica gravada — melodia, ritmo e letra, na mesma ordem. É um dos contextos mais fáceis pra primeira fala espontânea: ele não precisa construir nada, só completar.'
        ],
        quote: '“Parabéns pra você, nesta data…” — e silêncio.',
        after: ['**Cante e pare antes da palavra final**, olhando pra ele com expectativa. Vale pra qualquer música da rotina.']
      },
      {
        title: 'Ritmo e sonoridade',
        body: [
          'A melodia alonga as sílabas e marca as fronteiras entre as palavras — o mesmo mecanismo do parentês, num formato ainda mais marcado.',
          'Por isso música infantil **simples e repetitiva** rende mais aqui do que música bonita e complexa.'
        ]
      },
      {
        title: 'Músicas com gesto são as melhores',
        scene: 'cabecaOmbro',
        body: [
          'Juntam as duas coisas que mais funcionam no segundo ano: gesto ligado a palavra e repetição previsível. Ele começa fazendo o gesto muito antes de dar conta da letra — e o gesto é o degrau.'
        ],
        chips: { label: 'Pra começar', items: ['Cabeça, ombro, joelho e pé', 'A dona aranha', 'Se você está contente'] },
        after: ['Vale também inventar gestos pras músicas que não têm.'],
        link: { to: '/praticar/musicas', label: 'Ver as músicas com gesto' }
      },
      {
        title: 'Música de fundo não conta',
        body: [
          'Música tocando enquanto ele brinca sozinho pode ser ótima pro humor da casa e pra rotina de sono — só não é estímulo de fala, porque não tem ida e volta.',
          'O que conta é alguém cantando **com** ele.'
        ]
      }
    ],
    quiz: [
      {
        kind: 'escolha',
        prompt: 'Qual é a técnica mais útil com as músicas da rotina?',
        correct: 1,
        options: [
          { text: 'Cantar a música inteira bem rápido', feedback: 'Devagar e com pausa rende mais: é a pausa que abre a vez dele.' },
          { text: 'Parar antes da última palavra, olhando pra ele', feedback: 'Ele não precisa construir nada — só completar.' },
          { text: 'Pedir que ele cante sozinho', feedback: 'Isso vira prova. Cante com ele e deixe a lacuna no fim.' }
        ]
      },
      vf('Deixar música infantil tocando enquanto ele brinca sozinho é estímulo de fala.', false, 'Pode ser ótimo pro humor da casa, mas não tem ida e volta. O que conta é alguém cantando com ele.'),
      {
        kind: 'escolha',
        prompt: 'Que tipo de música rende mais pra fala?',
        correct: 0,
        options: [
          { text: 'Simples, repetitiva e com gestos', feedback: 'Repetição previsível e gesto ligado a palavra: as duas coisas que mais funcionam.' },
          { text: 'Longa e sofisticada', feedback: 'Bonita, talvez — mas a simples e repetitiva rende mais pra fala.' },
          { text: 'Qualquer uma, no volume alto', feedback: 'Volume não é o que conta. Simplicidade, repetição e gesto sim.' }
        ]
      }
    ],
    takeaway: 'Cante com ele, com gestos, e pare antes da última palavra.',
    mission: {
      text: 'Cante 1 ou 2 músicas com gesto, parando antes da última palavra.',
      checks: ['1ª música', '2ª música', 'Parei antes do fim']
    }
  },
  {
    id: 'o-que-atrapalha',
    n: 14,
    part: 'dia',
    title: 'O que atrapalha',
    subtitle: 'Telas, pressa, pergunta de prova',
    scene: 'tv',
    cards: [
      {
        title: 'As armadilhas',
        bullets: [
          '**Antecipar tudo.** Se nada precisa ser pedido, nada é pedido.',
          '**Pergunta de prova.** “Fala bola, fala bola.”',
          '**Pedir pra repetir** (“fala, fala”). Gera travamento.',
          '**Corrigir:** “não é ága, é água.”',
          '**Falar sem o rosto na direção dele** — de outro cômodo, de costas, de cima.',
          '**Responder no lugar dele** — quando avó, babá ou vocês respondem antes que ele tente.'
        ]
      },
      {
        title: 'Telas',
        scene: 'tv',
        body: [
          'Até por volta dos 2 anos, a criança aprende bem menos palavras de uma tela do que da mesma cena ao vivo. O fenômeno tem nome: **déficit de vídeo**.',
          'A razão é simples: a tela não responde a ela.'
        ]
      },
      {
        title: 'Os detalhes que escapam',
        scene: 'celular',
        bullets: [
          '**TV ligada de fundo** reduz a fala dirigida a ele — mesmo sem ninguém assistindo.',
          '**O celular do adulto** compete com a interação tanto quanto a tela dele.'
        ]
      }
    ],
    quiz: [
      vf('TV ligada de fundo, sem ninguém assistindo, não faz diferença.', false, 'Mesmo sem ninguém assistindo, ela reduz a fala dirigida a ele.'),
      {
        kind: 'escolha',
        prompt: 'Por que o bebê aprende menos palavras de uma tela?',
        correct: 1,
        options: [
          { text: 'Porque o som da tela é ruim', feedback: 'Não é o som: é a falta de resposta.' },
          { text: 'Porque a tela não responde a ele', feedback: 'É o chamado déficit de vídeo: sem ida e volta, a palavra não gruda do mesmo jeito.' },
          { text: 'Porque os desenhos são rápidos demais', feedback: 'O problema principal é que a tela não responde a ele.' }
        ]
      },
      {
        kind: 'cenario',
        prompt: 'A avó sempre responde pelo bebê quando alguém pergunta algo a ele. O que ajuda?',
        correct: 1,
        options: [
          { text: 'Deixar, assim ele não passa aperto', feedback: 'Responder no lugar dele tira a vez dele de tentar.' },
          { text: 'Combinar de dar uns segundos pra ele responder do jeito dele primeiro', feedback: 'Qualquer resposta dele vale — olhar, gesto, som. Depois, completa-se por ele.' },
          { text: 'Pedir que ele repita o que a avó disse', feedback: 'Pedir repetição trava. Dê tempo pra ele responder do jeito dele.' }
        ]
      }
    ],
    takeaway: 'A tela não responde. Gente responde.',
    mission: {
      text: 'Deixe a TV desligada quando ninguém estiver assistindo e o celular longe na hora de brincar.',
      checks: ['Manhã', 'Tarde', 'Noite']
    }
  },
  {
    id: 'rotina',
    n: 15,
    part: 'dia',
    title: 'Rotina e bloco de chão',
    subtitle: '10 minutos que rendem',
    scene: 'chao',
    cards: [
      {
        title: 'Quase tudo cabe no que já existe',
        scene: 'banho',
        table: {
          head: ['Momento', 'O que fazer'],
          rows: [
            ['Banho', 'Nomear partes do corpo e verbos: “molha”, “cai”, “acabou”'],
            ['Refeições', 'Escolha com os dois potes na mão, porções pequenas, “mais”'],
            ['Trocar roupa', 'Sequência sempre igual, com pausa: “agora o… [espera] pé!”'],
            ['Carro, rua, mercado', 'Nomear o que ele está olhando pela janela ou apontando na prateleira'],
            ['Música', 'Uma ou duas músicas com gesto por dia, parando antes da palavra final'],
            ['Antes de dormir', 'Um ou dois livros, apontando, comentando e esperando']
          ]
        }
      },
      {
        title: 'O bloco de chão',
        scene: 'chao',
        body: ['É o único item realmente novo — e o mais importante. De 10 a 15 minutos por dia:'],
        steps: [
          '**Celular fora da sala.** Não no bolso, não virado pra baixo na mesa — fora.',
          '**Sente no chão com ele**, na altura dele, de frente.',
          '**Deixe ele escolher o que fazer.** Você não propõe atividade, não traz o brinquedo “melhor”, não ensina nada. Ele conduz.',
          '**Faça junto e comente.** Ele empilha, você empilha. Frases curtas: “Bateu! A panela caiu.”',
          '**Pare e espere.** Silêncio por alguns segundos, olhando pra ele. Ele reagiu? Responda — e espere de novo.'
        ]
      },
      {
        title: 'Não é hora de ensinar',
        body: ['Nada de testar, contar cores ou nomear o alfabeto. É brincar do jeito dele, comentando e esperando.'],
        quote: 'Dez minutos assim rendem mais do que uma hora com você por perto fazendo outra coisa.',
        link: { to: '/praticar/chao', label: 'Começar um bloco de chão' }
      }
    ],
    quiz: [
      {
        kind: 'ordem',
        prompt: 'Toque nos passos do bloco de chão, na ordem certa:',
        items: ['Celular fora da sala', 'Sente no chão, de frente', 'Deixe ele escolher', 'Faça junto e comente', 'Pare e espere'],
        shuffled: [3, 0, 4, 2, 1],
        feedback: 'Celular fora, você no chão, ele conduz — e você comenta e espera.'
      },
      {
        kind: 'escolha',
        prompt: 'No bloco de chão, quem escolhe a brincadeira?',
        correct: 1,
        options: [
          { text: 'Você, pra garantir que seja educativa', feedback: 'Não é hora de ensinar. Ele conduz; você acompanha e comenta.' },
          { text: 'Ele', feedback: 'Deixe ele escolher, faça junto, comente e espere.' },
          { text: 'Um dia cada um', feedback: 'No bloco de chão, é sempre ele quem conduz.' }
        ]
      },
      {
        kind: 'cenario',
        prompt: 'Na troca de roupa, como abrir a vez dele?',
        correct: 0,
        options: [
          { text: 'Sequência sempre igual, com pausa: “agora o… pé!”', feedback: 'A previsibilidade deixa ele antecipar — e a pausa abre a vez dele.' },
          { text: 'Trocar rápido e em silêncio', feedback: 'Dá pra aproveitar o momento: sequência igual, com pausa.' },
          { text: 'Perguntar “que parte do corpo é essa?”', feedback: 'Pergunta de prova. Prefira a sequência com pausa.' }
        ]
      }
    ],
    takeaway: '10 minutos no chão, celular fora, ele conduz — você comenta e espera.',
    mission: {
      text: 'Faça um bloco de chão de 10 minutos.',
      checks: ['Celular fora', 'Ele escolheu', 'Comentei e esperei']
    }
  },
  {
    id: 'quadro',
    n: 16,
    part: 'acompanhar',
    title: 'O quadro de palavras',
    subtitle: 'Ver a trajetória, não o total',
    scene: 'geladeira',
    cards: [
      {
        title: 'A percepção engana',
        scene: 'geladeira',
        body: [
          'Percepção de pai e mãe é ruim pra isso: a gente subestima nos dias ruins e superestima nos bons. Um quadro — na geladeira ou aqui no app — resolve.',
          'Divida por mês e vá anotando as palavras conforme elas aparecem. Só isso.'
        ],
        after: ['Comece anotando **tudo que ele já fala hoje**, mesmo o que pareça bobo. É o ponto de partida.']
      },
      {
        title: 'Os dois sinais',
        bullets: [
          '**Asterisco (*)** — palavra que apareceu uma vez e ainda não voltou. É normal sumir por semanas; não apague. Quando voltar, tire o asterisco. São as mais perto de sair de vez — ótimas candidatas a palavra da semana.',
          '**Bolinha (◦)** — palavra da semana. Quando ela sair da boca dele, apague a bolinha e passe a palavra pro mês.'
        ]
      },
      {
        title: 'O que conta como palavra',
        bullets: [
          '**Aproximações consistentes:** “ága” pra água, “ná” pra banana. O que importa é usar sempre o mesmo som pra mesma coisa.',
          '**Sons com sentido:** “au-au”, “brum”, “mu”.',
          '**Palavras usadas num contexto só** contam do mesmo jeito.',
          '**Não conta:** repetir logo depois de você. Precisa vir por iniciativa dele.'
        ]
      },
      {
        title: 'Uma vez por mês',
        steps: [
          'Quantas palavras novas entraram?',
          'Apareceu algum **verbo**, ou ainda é só nome de coisa?',
          'Aumentou a **variedade de gestos**?',
          'Começou a juntar duas palavras?'
        ],
        after: ['O que interessa é a **trajetória**, não o total. E numa consulta, o quadro transforma impressão em dado — muito mais útil que “ele fala pouco”.'],
        link: { to: '/praticar/quadro', label: 'Abrir o quadro de palavras' }
      },
      {
        title: 'Fala pouco, mas comunica muito?',
        scene: 'intencao',
        body: [
          'Interagir bastante por outros canais — apontar, mostrar, levar pela mão, o sim de cabeça, buscar o olhar, trazer objetos — é exatamente o indicador de bom prognóstico.',
          'Não é consolo: é o dado que mais pesa entre 1 e 2 anos.'
        ]
      }
    ],
    quiz: [
      vf('Ele disse “bola” logo depois de você dizer “bola”. Isso entra no quadro.', false, 'Imitação imediata não é vocabulário: a palavra precisa aparecer por iniciativa dele.'),
      {
        kind: 'escolha',
        prompt: 'Ele diz “ná” sempre que quer banana. Conta como palavra?',
        correct: 1,
        options: [
          { text: 'Não, a pronúncia está errada', feedback: 'O que importa é usar sempre o mesmo som pra mesma coisa, não a pronúncia certa.' },
          { text: 'Sim — é uma aproximação consistente', feedback: 'Mesmo som, mesma coisa, sempre: conta como palavra.' },
          { text: 'Só quando ele falar “banana” certinho', feedback: 'Aproximações consistentes já contam.' }
        ]
      },
      {
        kind: 'escolha',
        prompt: 'Uma palavra apareceu uma vez e sumiu. O que fazer no quadro?',
        correct: 1,
        options: [
          { text: 'Apagar, porque não conta mais', feedback: 'Não apague: sumir e voltar é normal.' },
          { text: 'Manter com asterisco (*) e pensar nela como palavra da semana', feedback: 'Ela prova que ele consegue produzir o som — está perto de sair de vez.' },
          { text: 'Esperar ela voltar pra anotar', feedback: 'Anote já, com asterisco. Quando voltar, é só tirar o asterisco.' }
        ]
      }
    ],
    takeaway: 'O que interessa é a trajetória, não o total.',
    mission: {
      text: 'Anote no quadro tudo que ele já fala hoje — é o seu ponto de partida.',
      checks: ['Anotei as palavras', 'Marquei as de 1 vez', 'Escolhi as da semana']
    }
  }
];

export function lessonById(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}

export function lessonMinutes(l: Lesson): number {
  return Math.max(3, Math.round(l.cards.length * 0.7 + l.quiz.length * 0.5));
}
