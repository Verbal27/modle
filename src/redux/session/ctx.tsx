import React from 'react';
import { State as SessionState } from '.';
import { createContext, useContext } from 'react';
import { StateContext } from '../ctx';

export type SessionContextT = SessionState;

export const SessionContext = createContext<SessionContextT>({ me: null });

export const ProvideSessionCtx: React.FC = ({ children }) => {
  const { session } = useContext(StateContext);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
