import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {persistStore} from 'redux-persist';

import rootReducer from './reducers/index';

const middleWare = [thunk];

export const store = createStore(
  rootReducer, 
  applyMiddleware(...middleWare)
);

export const persistor = persistStore(store)

export default {store, persistor};