# Fala, bebê!

Guia interativo para estimular a fala do bebê, feito a partir do material
[“Estimulando a fala do bebê”](./Estimulando%20a%20fala%20do%20bebê.md) e do seu [resumo](./RESUMO.md).

**App publicado:** https://raavier.github.io/fala_bebe/

## O que tem no app

- **Aprender** — 16 lições curtas (fundamentos, as 9 técnicas, leitura, música, o que atrapalha, rotina e o quadro de palavras). Cada lição tem cartões ilustrados, um “Por que funciona?” com a ciência do material completo, perguntas com a resposta comentada e uma missão para a semana.
- **Praticar** — treino dos 10 segundos de espera, palavras da semana (com o “em vez de / diga” de cada uma), quadro de palavras mês a mês (com impressão para a geladeira), marcos por idade da SBP, cronômetro do bloco de chão e músicas com gesto.
- **Resumo** — a cola de bolso com as 6 coisas principais e o que consultar no dia a dia.

Tudo fica salvo só no navegador do aparelho (sem cadastro, sem servidor). O app pode ser instalado na tela inicial do celular e funciona offline.

## Desenvolvimento

```bash
npm install
npm run dev      # servidor local
npm test         # testes do conteúdo
npm run build    # gera a pasta dist/
```

- O conteúdo das lições fica em `src/content/lessons.ts`; dicas, marcos, palavras e referências em `src/content/extras.ts`.
- As ilustrações são SVG desenhados em código (`src/components/art/`). Em modo de desenvolvimento, `#/galeria` mostra todas as cenas.

## Publicação

Cada push na branch `master` roda os testes, gera o site e publica no GitHub Pages
(`.github/workflows/deploy.yml`). Na primeira vez, é preciso ativar o Pages em
**Settings → Pages → Build and deployment → Source: GitHub Actions**.
