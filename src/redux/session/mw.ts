import { Middleware, Reducer, AnyAction } from 'redux';
import * as Session from '.';
import { KVStore } from '../../util/keyvaluestore/types';

const SESSION_KEY = 'Auth';

interface SessionSrv {
  mw: Middleware;
  reducer: Reducer<Session.State, AnyAction>;
}
const defaultState: Session.State = {
  me: null
};
export const createSessionMW = (kvstore: KVStore): SessionSrv => {
  const getStoredState = (): Session.State | null => kvstore.get(SESSION_KEY);
  const delStoredState = (): Session.State => kvstore.del(SESSION_KEY);
  const setStoredState = (me: Session.State): void =>
    kvstore.set(SESSION_KEY, me);

  let session = getStoredState();

  const mw: Middleware = store => next => {
    return action => {
      if (Session.login.is(action)) {
        setStoredState(action.payload);
      } else if (Session.logout.is(action)) {
        delStoredState();
      }
      return next(action);
    };
  };
  const reducer = Session.reducer(session || defaultState);

  return {
    mw,
    reducer
  };
};
