import React, { useState, useEffect } from 'react';
import { State } from './types';
import { Store } from 'redux';
import { StoreContext, StateContext, ActionContext } from './ctx';

export const ProvideStoreCtx = (store: Store<State>): React.FC => ({
  children
}) => {
  const [state, setState] = useState(store.getState());
  useEffect(() => store.subscribe(() => setState(store.getState())), [store]);

  return (
    <StoreContext.Provider value={store}>
      <StateContext.Provider value={state}>
        <ActionContext.Provider value={store.dispatch}>
          {children}
        </ActionContext.Provider>
      </StateContext.Provider>
    </StoreContext.Provider>
  );
};
