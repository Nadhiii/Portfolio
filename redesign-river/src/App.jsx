import { useState } from 'react';
import Intro from './components/Intro.jsx';
import River from './components/River.jsx';

export default function App() {
  // The intro plays once per browser tab session.
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return sessionStorage.getItem('introSeen') !== '1';
    } catch {
      return true;
    }
  });

  const finishIntro = () => {
    try {
      sessionStorage.setItem('introSeen', '1');
    } catch {
      /* storage blocked: the intro simply plays again next time */
    }
    setShowIntro(false);
  };

  return (
    <>
      <River />
      {showIntro && <Intro onDone={finishIntro} />}
    </>
  );
}
