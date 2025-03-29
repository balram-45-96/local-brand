// rootReducer.js
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import authReducer from './AuthRedux/auth';

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    // Clear the state and re-persist it
    state = undefined;
  }

  return combineReducers({
    auth: authReducer,
    // Add other reducers if any
  })(state, action);
};

export default rootReducer;
