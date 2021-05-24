import { Action } from 'redux';

export type Amount = number;

export const UPDATE_BALANCE = 'UPDATE_BALANCE';
export const DEBIT = 'DEBIT';
export const CREDIT = 'CREDIT';
export const GET_BALANCE_WITHOUT_TAX = 'GET_BALANCE_WITHOUT_TAX';

export interface UpdateBalanceAction {
  type: typeof UPDATE_BALANCE;
  payload: Amount;
}

export interface DebitAction {
  type: typeof DEBIT;
  payload: Amount;
}

export interface CreditAction {
  type: typeof CREDIT;
  payload: Amount;
}

export interface BalanceWithoutTaxAction {
  type: typeof GET_BALANCE_WITHOUT_TAX;
}

export type ActionCreatorPayload<T extends Action> = T extends { payload: infer V } ? V : never;
export type ActionCreator<T extends Action> = ActionCreatorPayload<T> extends never
  ? () => T
  : (payload: ActionCreatorPayload<T>) => T;

export type BalanceActions = UpdateBalanceAction | DebitAction | CreditAction | BalanceWithoutTaxAction;

export const updateBalance: ActionCreator<UpdateBalanceAction> = (payload => ({ type: UPDATE_BALANCE, payload }))
export const debit: ActionCreator<DebitAction> = (payload => ({ type: DEBIT, payload }))
export const credit: ActionCreator<CreditAction> = (payload => ({ type: CREDIT, payload }))
export const balanceWithoutTax: ActionCreator<BalanceWithoutTaxAction> = (() => ({ type: GET_BALANCE_WITHOUT_TAX }))
