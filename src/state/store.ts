import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import { bundler } from './middlewares/bundler';

export const store = createStore(reducers, {}, applyMiddleware(bundler, thunk));