import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import authReducer from './authSlice';
import reservationReducer from './reservationSlice';
import countriesReducer from './countriesSlice';
import permissionsReducer from './permissionsSlice';
import persistStore from 'redux-persist/es/persistStore';

const reducers = combineReducers({
  user: authReducer,
  countries: countriesReducer,
  permissionsData: permissionsReducer,
  reservationData: reservationReducer
});

const customMiddleware = store => next => action => {
  if (!window.__REDUX_DEVTOOLS_EXTENSION_LOCKED__) {
    next(action);
  } else {
    // Optionally handle the case when the DevTools is locked
    console.log('Redux DevTools is locked');
  }
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user','permissionsData','countries', 'reservationData']
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk,customMiddleware],
});

export const persistor = persistStore(store);
