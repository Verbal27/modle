import { createContext } from 'react';
import { AnyAction, Store } from 'redux';
import { State } from './types';

export const StateContext = createContext<State>({} as State);

export const StoreContext = createContext<Store<State>>({} as Store<State>);

export const ActionContext = createContext<(_: AnyAction) => unknown>(() => {
  throw new Error('ActionContext not initialized');
});
