import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';

const filterSlice = createSlice({
  name: 'filter',
  initialState: initState.filter,
  reducers: {
    changeSearchFilter(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.search = action.payload;
    },
    changeSortFilter(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.sort = action.payload;
    },
  },
});

export const { changeSearchFilter, changeSortFilter } = filterSlice.actions;

export const getSearchSelector = (state) => state.filter.search;
export const getSortSelector = (state) => state.filter.sort;

export const filterReducer = filterSlice.reducer;
