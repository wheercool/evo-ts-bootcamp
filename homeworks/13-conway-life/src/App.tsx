import React from 'react';
import style from './App.module.css';
import { Canvas } from './components/Canvas/Canvas';
import { Panel } from './components/Panel/Panel';

function App() {
  return (
    <div className={style.app}>
      <h1 className={style.appHeader}>❤️Conway's Game of Life</h1>
      <main className={style.appMain}>
        <Canvas/>
      </main>
      <aside className={style.appAside}>
        <Panel/>
      </aside>
    </div>
  );
}

export default App;
