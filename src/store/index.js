import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const stringMiddleware = store => next => action => {
  if (typeof action === 'string') {
    return next({
      type: action,
    });
  }
  return next(action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
