import { configureStore } from '@reduxjs/toolkit';
import { getInitState } from './initState';
import { userReducer } from './slices/userSlice';

import { REDUX_LS_KEY } from './constants';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: getInitState(),
});

store.subscribe(() => {
  window.localStorage.setItem(REDUX_LS_KEY, JSON.stringify(store.getState()));
});
