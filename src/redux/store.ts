import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store
} from 'redux';
import { KVStore } from '../util/keyvaluestore/types';
import { createSessionMW } from './session';
import { ToastMiddleware } from './toastMsgs';
import { ProvideStoreCtx } from './provider';
import { State } from './types';

interface Cfg {
  localKVStore: KVStore;
}
export const createAppStore = ({
  localKVStore
}: Cfg): {
  store: Store<State>;
  CtxProvider: React.FC;
} => {
  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose();
  // const __DEV__ = (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  const Session = createSessionMW(localKVStore);

  const middlewares = composeEnhancers(
    applyMiddleware(Session.mw, ToastMiddleware)
  );

  const reducer = combineReducers({
    session: Session.reducer
  });

  const store = createStore(reducer, middlewares);
  const CtxProvider = ProvideStoreCtx(store);
  return {
    store,
    CtxProvider
  };
};

export default createAppStore;
