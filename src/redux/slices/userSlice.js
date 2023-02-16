import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';

const userSlice = createSlice({
  name: 'user',
  initialState: initState.user,
  reducers: {
    addUser(state, action) {
      return action.payload;
    },
    clearLS() {
      return initState.user;
    },
  },
});

export const { addUser, clearLS } = userSlice.actions;

export const userReducer = userSlice.reducer;
