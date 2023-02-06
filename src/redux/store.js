import { configureStore } from '@reduxjs/toolkit';
import { getInitState } from './initState';
import { userReducer } from './slices/userSlice';
import { filterReducer } from './slices/filterSlice';
import { REDUX_LS_KEY } from './constants';
import { cartReducer } from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    filter: filterReducer,
  },
  preloadedState: getInitState(),
});

store.subscribe(() => {
  window.localStorage.setItem(REDUX_LS_KEY, JSON.stringify(store.getState()));
});
