import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import type { Store as StoreRedux } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

import type { Store, Action } from './types';
import reducers from './reducers';

// https://www.freecodecamp.org/news/how-to-use-redux-in-your-react-typescript-app/
const store: StoreRedux<Store, Action> & {
  dispatch: (action: Action) => Action;
} = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(logger), // breaks vitest
    // applyMiddleware(),
  )
);

export default store;
