import { combineReducers, configureStore } from '@reduxjs/toolkit';
import settingsReducer from './reducers/settingsReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export { store };
