import { Reducer } from 'redux';
import { BalanceActions, CREDIT, DEBIT, GET_BALANCE_WITHOUT_TAX, UPDATE_BALANCE } from './actions';

const TAX = 0.14;
export const balanceReducer: Reducer<number, BalanceActions> = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_BALANCE: {
      return action.payload;
    }
    case DEBIT: {
      return state - action.payload;
    }
    case CREDIT: {
      return state + action.payload;
    }
    case GET_BALANCE_WITHOUT_TAX: {
      return state * (1 - TAX);
    }

    default:
      return state;
  }
}
