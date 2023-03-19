import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    email: '',
    _id: ''
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.username = payload.username;
      state.email = payload.email;
      state._id = payload._id;
    },
  },
});

export const selectors = {
  getUsername: (state) => state.user
}

export const { actions, reducer } = userSlice;