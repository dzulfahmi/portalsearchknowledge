import { combineReducers } from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './AuthReducer';
import crawlerReducer from './CrawlerReducer';
import infoReducer from './InfoReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};

const RootReducer = combineReducers({
  auth: authReducer,
  craw: crawlerReducer,
  info: infoReducer,
});

export default persistReducer(persistConfig, RootReducer);
