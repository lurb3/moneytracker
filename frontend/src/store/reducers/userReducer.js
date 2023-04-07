import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    email: '',
    totalBudget: 0,
    _id: '',
    settings: {}
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.username = payload.username;
      state.email = payload.email;
      state.totalBudget = payload.totalBudget;
      state._id = payload._id;
    },
    setUserBudget: (state, { payload }) => {
      state.totalBudget = payload.totalBudget;
    },
    setSetting: (state, { payload }) => {
      state.settings = payload;
    },
    loadSettings: (state, { payload }) => {
      state.settings = {...payload};
    }
  },
});

export const selectors = {
  getUser: (state) => state.user,
  getSettings: (state) => state.user.settings
}

export const { actions, reducer } = userSlice;