import { createSlice } from '@reduxjs/toolkit';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    username: '',
    email: '',
    _id: ''
  },
  reducers: {
    loadExpenses: (state, { payload }) => {
      console.log('Load me please')
    },
  },
});

export const selectors = {
  getUsername: (state) => state.user
}

export const { actions, reducer } = expensesSlice;