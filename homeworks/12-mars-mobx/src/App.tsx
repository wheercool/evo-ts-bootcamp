import React from 'react';
import style from './App.module.css';
import { ViewSwitch } from './components/ViewSwitch/ViewSwitch';

function App() {
  return (
    <div className={style.app}>
      <header>Mars Viewer</header>
      <main>
        <ViewSwitch/>
      </main>
    </div>
  );
}

export default App;
