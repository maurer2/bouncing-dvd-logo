import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import type { Store as StoreRedux } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

import type { Store, Action } from './types';
import reducers from './reducers';
import { SET_LAST_POSITION } from './actionTypes';

// const logger = createLogger({
//   predicate: (_, action) => action.type !== SET_LAST_POSITION,
// });

// https://www.freecodecamp.org/news/how-to-use-redux-in-your-react-typescript-app/
const store: StoreRedux<Store, Action> & {
  dispatch: (action: Action) => Action;
} = createStore(
  reducers,
  composeWithDevTools(
    // applyMiddleware(logger), // breaks vitest
    applyMiddleware(),
  ),
);

export default store;
