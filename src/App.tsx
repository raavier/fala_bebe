import { useEffect, type ReactNode } from 'react';
import { BottomNav } from './components/ui';
import { About } from './pages/About';
import { FloorTime } from './pages/FloorTime';
import { Gallery } from './pages/Gallery';
import { Home } from './pages/Home';
import { Learn } from './pages/Learn';
import { LessonPage } from './pages/LessonPage';
import { Milestones } from './pages/Milestones';
import { Practice } from './pages/Practice';
import { Songs } from './pages/Songs';
import { Summary } from './pages/Summary';
import { WaitTrainer } from './pages/WaitTrainer';
import { Welcome } from './pages/Welcome';
import { WeekWords } from './pages/WeekWords';
import { WordBoard } from './pages/WordBoard';
import { usePath } from './router';
import { useWelcomed } from './store';
import { lessonById } from './content/lessons';

interface Resolved {
  page: ReactNode;
  title: string;
  nav: boolean;
}

function resolve(path: string): Resolved {
  const lesson = path.match(/^\/aprender\/([\w-]+)$/);
  if (lesson) {
    const id = lesson[1];
    return { page: <LessonPage key={id} id={id} />, title: lessonById(id)?.title ?? 'Lição', nav: false };
  }
  switch (path) {
    case '/aprender':
      return { page: <Learn />, title: 'Aprender', nav: true };
    case '/praticar':
      return { page: <Practice />, title: 'Praticar', nav: true };
    case '/praticar/espera':
      return { page: <WaitTrainer />, title: 'Treino de espera', nav: true };
    case '/praticar/palavras':
      return { page: <WeekWords />, title: 'Palavras da semana', nav: true };
    case '/praticar/quadro':
      return { page: <WordBoard />, title: 'Quadro de palavras', nav: true };
    case '/praticar/marcos':
      return { page: <Milestones />, title: 'Marcos por idade', nav: true };
    case '/praticar/chao':
      return { page: <FloorTime />, title: 'Bloco de chão', nav: true };
    case '/praticar/musicas':
      return { page: <Songs />, title: 'Músicas com gesto', nav: true };
    case '/resumo':
      return { page: <Summary />, title: 'Cola de bolso', nav: true };
    case '/sobre':
      return { page: <About />, title: 'Sobre o guia', nav: true };
    case '/galeria':
      if (import.meta.env.DEV) return { page: <Gallery />, title: 'Galeria', nav: false };
      break;
  }
  return { page: <Home />, title: '', nav: true };
}

export function App() {
  const path = usePath();
  const [welcomed] = useWelcomed();
  const { page, title, nav } = welcomed || path === '/galeria' ? resolve(path) : { page: <Welcome />, title: '', nav: false };

  useEffect(() => {
    document.title = title ? `${title} · Fala, bebê!` : 'Fala, bebê!';
  }, [title]);

  return (
    <div className="app">
      {page}
      {nav && <BottomNav path={path} />}
    </div>
  );
}
