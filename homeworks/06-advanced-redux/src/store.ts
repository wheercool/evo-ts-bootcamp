import { reducer as menuReducer } from './features/pizza-menu/reducer';
import { reducer as basketReducer } from './features/basket/reducer';
import { middleWare as BasketMiddleWare } from './features/basket/middlewares'
import { middleWareFactory } from './features/logger/middlewares';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { compose } from 'ramda';
import { log } from './services/api';


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

const rootReducer = combineReducers({
  menu: menuReducer,
  basket: basketReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk,
      BasketMiddleWare,
      middleWareFactory(log)
    ))
);

