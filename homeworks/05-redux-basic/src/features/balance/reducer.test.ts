import { balanceReducer } from './reducer';
import { balanceWithoutTax, credit, debit, updateBalance } from './actions';

describe('Balance', () => {
  it('should update balance', () => {
    const state = balanceReducer(0, updateBalance(1000));
    expect(state).toEqual(1000);
  })

  it('should debit', () => {
    const state = balanceReducer(100, debit(20));
    expect(state).toEqual(80);
  })

  it('should credit', () => {
    const state = balanceReducer(100, credit(20));
    expect(state).toEqual(120);
  })

  it('should extract tax', () => {
    const state = balanceReducer(100, balanceWithoutTax());
    expect(state).toEqual(96);
  })
})
