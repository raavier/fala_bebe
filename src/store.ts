import { useCallback, useSyncExternalStore } from 'react';

// Tudo que o app lembra fica só neste aparelho, no localStorage.
// Se o navegador bloquear o armazenamento (aba anônima etc.), o app continua
// funcionando com os valores em memória.

const PREFIX = 'falabebe:';
const cache = new Map<string, unknown>();
const listeners = new Map<string, Set<() => void>>();

function readRaw<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function getValue<T>(key: string, fallback: T): T {
  if (!cache.has(key)) cache.set(key, readRaw(key, fallback));
  return cache.get(key) as T;
}

export function setValue<T>(key: string, value: T): void {
  cache.set(key, value);
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // sem armazenamento: fica só em memória
  }
  listeners.get(key)?.forEach((fn) => fn());
}

export function clearAll(): void {
  const keys = [...cache.keys()];
  try {
    for (let i = window.localStorage.length - 1; i >= 0; i--) {
      const k = window.localStorage.key(i);
      if (k?.startsWith(PREFIX)) window.localStorage.removeItem(k);
    }
  } catch {
    // ignora
  }
  cache.clear();
  keys.forEach((k) => listeners.get(k)?.forEach((fn) => fn()));
}

function subscribe(key: string, fn: () => void): () => void {
  let set = listeners.get(key);
  if (!set) {
    set = new Set();
    listeners.set(key, set);
  }
  set.add(fn);
  return () => set!.delete(fn);
}

export function usePersistent<T>(key: string, fallback: T): [T, (next: T | ((prev: T) => T)) => void] {
  const value = useSyncExternalStore(
    (fn) => subscribe(key, fn),
    () => getValue(key, fallback)
  );
  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      const prev = getValue(key, fallback);
      const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
      setValue(key, resolved);
    },
    // fallback é sempre uma constante estável por chave
    [key]
  );
  return [value, set];
}

// ---- Tipos do que é guardado ----

export interface LessonProgress {
  card: number; // maior cartão já visto
  done: boolean;
  score?: number;
  total?: number;
}

export type ProgressMap = Record<string, LessonProgress>;

export interface Mission {
  lessonId: string;
  date: string; // dia (AAAA-MM-DD) a que as marcações se referem
  checked: number[];
}

export type WordKind = 'coisa' | 'acao' | 'social' | 'som' | 'pessoa';

export interface BoardWord {
  id: string;
  word: string;
  month: string; // AAAA-MM
  once: boolean; // * apareceu uma vez e ainda não voltou
  kind: WordKind;
}

export const EMPTY_PROGRESS: ProgressMap = {};
export const EMPTY_WORDS: string[] = [];
export const EMPTY_BOARD: BoardWord[] = [];
export const EMPTY_HISTORY: number[] = [];
export const EMPTY_CHECKS: Record<string, boolean> = {};

export function todayKey(d = new Date()): string {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

export function monthKey(d = new Date()): string {
  return todayKey(d).slice(0, 7);
}

const MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

export function monthName(key: string, withYear = false): string {
  const [y, m] = key.split('-').map(Number);
  const name = MONTHS[m - 1] ?? key;
  return withYear ? `${name} de ${y}` : name;
}

export function previousMonth(key: string): string {
  const [y, m] = key.split('-').map(Number);
  const d = new Date(y, m - 2, 1);
  return monthKey(d);
}

// ---- Ganchos por assunto ----

export const useWelcomed = () => usePersistent<boolean>('welcomed', false);
export const useProgress = () => usePersistent<ProgressMap>('progress', EMPTY_PROGRESS);
export const useMission = () => usePersistent<Mission | null>('mission', null);
export const useWeekWords = () => usePersistent<string[]>('weekWords', EMPTY_WORDS);
export const useBoard = () => usePersistent<BoardWord[]>('board', EMPTY_BOARD);
export const useMilestoneAge = () => usePersistent<string>('milestoneAge', '12');
export const useMilestoneChecks = () => usePersistent<Record<string, boolean>>('milestones', EMPTY_CHECKS);
export const useWaitHistory = () => usePersistent<number[]>('waitHistory', EMPTY_HISTORY);
