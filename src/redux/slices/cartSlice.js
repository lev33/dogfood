/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';

const cartSlice = createSlice({
  name: 'cart',
  initialState: initState.cart,
  reducers: {
    addItemToCart: {
      reducer(state, action) {
        const currentIndex = state.findIndex((el) => el.id === action.payload.id);
        if (currentIndex !== -1) {
          state[currentIndex].count += 1;
        } else {
          state.push(action.payload);
        }
      },
      prepare(id) {
        return {
          payload: {
            id,
            count: 1,
            isChecked: false,
          },
        };
      },

    },
    removeItemFromCart(state, action) {
      const currentIndex = state.findIndex((el) => el.id === action.payload);
      state[currentIndex].count -= 1;
    },
    setProductCount(state, action) {
      const currentIndex = state.findIndex((el) => el.id === action.payload.id);
      state[currentIndex].count = action.payload.count;
    },
    removeProductFromCart(state, action) {
      return state.filter((el) => el.id !== action.payload);
    },
    toggleIsChecked(state, action) {
      const currentIndex = state.findIndex((el) => el.id === action.payload);
      state[currentIndex].isChecked = !state[currentIndex].isChecked;
    },
  },
});

export const {
  addItemToCart, removeItemFromCart, setProductCount, removeProductFromCart, toggleIsChecked,
} = cartSlice.actions;

export const getCartSelector = (state) => state.cart;

export const cartReducer = cartSlice.reducer;
