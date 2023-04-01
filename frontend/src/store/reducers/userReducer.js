import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    email: '',
    _id: '',
    settings: {}
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.username = payload.username;
      state.email = payload.email;
      state._id = payload._id;
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
  getUsername: (state) => state.user,
  getSettings: (state) => state.user.settings
}

export const { actions, reducer } = userSlice;