import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: initState.favourites,
  reducers: {
    addProductToFavourites(state, action) {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
      }
    },
    removeProductFromFavourites(state, action) {
      return state.filter((el) => el !== action.payload);
    },
  },
});

export const { addProductToFavourites, removeProductFromFavourites } = favouritesSlice.actions;

export const getFavouritesSelector = (state) => state.favourites;

export const favouritesReducer = favouritesSlice.reducer;
