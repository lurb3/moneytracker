import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    email: '',
    token: '',
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.username = payload.username;
      state.email = payload.email;
      state.token = payload.token;
    },
  },
});

export const selectors = {
  getUsername: (state) => state.user
}

export const { actions, reducer } = userSlice;