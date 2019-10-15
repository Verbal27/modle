import { Middleware } from 'redux';
import * as Sess from '../session';
import { setToken } from '../../gql/actions';

const LOCAL_STORAGE_SESSION_KEY = 'MOO_LOCAL_STORAGE_SESSION';
export const createSessionMW = (): Middleware => store => next => {
  let obj = parse(localStorage.getItem(LOCAL_STORAGE_SESSION_KEY));
  return action => {
    if (obj) {
      let _ = obj;
      obj = null;
      store.dispatch(Sess.login.create(_));
    }
    if (Sess.login.is(action)) {
      localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, strng(action.payload));
      store.dispatch(setToken.create(action.payload!.token!));
    } else if (Sess.logout.is(action)) {
      localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
      store.dispatch(setToken.create(''));
    }
    return next(action);
  };
};

const strng = (_: any) => JSON.stringify(_);
const parse = (_: string | null, def = undefined) => {
  if (_ === null) {
    return _;
  }
  try {
    return JSON.parse(_);
  } catch (e) {
    return def;
  }
};