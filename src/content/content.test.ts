import { describe, expect, it } from 'vitest';
import { SCENE_IDS } from '../components/art/scenes';
import { MILESTONES, MOMENTS, TIPS, momentForHour, tipOfTheDay, wordExample } from './extras';
import { LESSONS, PARTS } from './lessons';

const allText = JSON.stringify(LESSONS);

describe('lições', () => {
  it('são 16, numeradas em ordem e com ids únicos', () => {
    expect(LESSONS).toHaveLength(16);
    LESSONS.forEach((l, i) => expect(l.n).toBe(i + 1));
    expect(new Set(LESSONS.map((l) => l.id)).size).toBe(LESSONS.length);
  });

  it('pertencem a uma parte conhecida', () => {
    const parts = new Set(PARTS.map((p) => p.id));
    LESSONS.forEach((l) => expect(parts.has(l.part)).toBe(true));
  });

  it('usam só cenas que existem', () => {
    const scenes = new Set(SCENE_IDS);
    LESSONS.forEach((l) => {
      expect(scenes.has(l.scene)).toBe(true);
      l.cards.forEach((c) => c.scene && expect(scenes.has(c.scene)).toBe(true));
    });
  });

  it('têm cartões e de 3 a 4 perguntas válidas', () => {
    LESSONS.forEach((l) => {
      expect(l.cards.length).toBeGreaterThanOrEqual(3);
      expect(l.quiz.length).toBeGreaterThanOrEqual(3);
      expect(l.quiz.length).toBeLessThanOrEqual(4);
      l.quiz.forEach((q) => {
        if (q.kind === 'ordem') {
          expect([...q.shuffled].sort()).toEqual(q.items.map((_, i) => i));
          expect(q.shuffled).not.toEqual(q.items.map((_, i) => i));
        } else {
          expect(q.options.length).toBeGreaterThanOrEqual(2);
          expect(q.correct).toBeGreaterThanOrEqual(0);
          expect(q.correct).toBeLessThan(q.options.length);
          q.options.forEach((o) => expect(o.feedback.length).toBeGreaterThan(10));
        }
      });
    });
  });

  it('têm missão com 3 marcações', () => {
    LESSONS.forEach((l) => expect(l.mission.checks).toHaveLength(3));
  });

  it('não citam o nome de nenhuma criança', () => {
    expect(allText).not.toMatch(/Teodoro/);
  });

  it('só apontam links para rotas que existem', () => {
    const routes = ['/praticar/espera', '/praticar/palavras', '/praticar/quadro', '/praticar/marcos', '/praticar/chao', '/praticar/musicas'];
    LESSONS.flatMap((l) => l.cards).forEach((c) => c.link && expect(routes).toContain(c.link.to));
  });

  it('fecham a marcação de negrito', () => {
    const bold = allText.match(/\*\*/g) ?? [];
    expect(bold.length % 2).toBe(0);
  });
});

describe('extras', () => {
  it('dica do dia sempre existe', () => {
    for (let d = 0; d < 400; d++) expect(TIPS).toContain(tipOfTheDay(new Date(2026, 0, 1 + d)));
  });

  it('momento do dia sempre aponta pra um momento conhecido', () => {
    for (let h = 0; h < 24; h++) expect(MOMENTS.map((m) => m.id)).toContain(momentForHour(h));
  });

  it('marcos seguem a cartilha, de 12 meses a 3 anos', () => {
    expect(MILESTONES.map((m) => m.id)).toEqual(['12', '15', '18', '24', '30', '36']);
  });

  it('dá um exemplo pra qualquer palavra', () => {
    expect(wordExample('mais').to).toBe('“Mais!”');
    expect(wordExample('vem').to).toBe('“Vem!”');
  });
});
