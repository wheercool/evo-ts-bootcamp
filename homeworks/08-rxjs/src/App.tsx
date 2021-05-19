import React from 'react';
import logo from './logo.svg';
import './App.css';
import { game$, mouse$ } from './pipes';
import { tap } from 'rxjs/operators';

// mouse$
//   .pipe(
//     tap(v => console.log(v))
//   )
//   .subscribe();

game$
  .pipe(
    tap(v => console.log(v))
  )
  .subscribe();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
