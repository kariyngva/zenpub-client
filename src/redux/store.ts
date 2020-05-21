import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store
} from 'redux';
import { CreateKVStore } from '../util/keyvaluestore/types';
import { createLocalizationMW } from './localization';

export type State = ReturnType<typeof createAppStore> extends Store<infer S>
  ? S
  : never;

interface Cfg {
  createLocalKVStore: CreateKVStore;
}
export const createAppStore = ({ createLocalKVStore }: Cfg) => {
  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose();
  // const __DEV__ = (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()

  const Localization = createLocalizationMW(
    createLocalKVStore('LOCALIZATION#')
  );

  const enhancer = composeEnhancers(applyMiddleware(Localization.mw));

  const reducer = combineReducers({
    localization: Localization.reducer
  });

  const store = createStore(reducer, enhancer);

  return store;
};

export default createAppStore;
