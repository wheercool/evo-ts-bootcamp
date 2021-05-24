import { createStore } from 'redux';
import { balanceReducer } from './features/balance/reducer';

declare global {
  interface Window {
   __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

export const appStore = createStore(balanceReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
