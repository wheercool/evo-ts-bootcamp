import React, { useEffect } from 'react';
import style from './App.module.css';
import { appStore } from './store';

function App() {
  useEffect(() => {
    const actions = [
      { type: 'UPDATE_BALANCE', payload: 1000.0 },
      { type: 'CREDIT', payload: 200.0 },
      { type: 'CREDIT', payload: 100.0 },
      { type: 'GET_BALANCE_WITHOUT_TAX' },
      { type: 'DEBIT', payload: 250.0 },
      { type: 'UPDATE_BALANCE', payload: 1000.0 },
    ] as const;
    actions.forEach(action => appStore.dispatch(action));
  }, []);

  return (
    <div className={style.App}>
    </div>
  );
}

export default App;
