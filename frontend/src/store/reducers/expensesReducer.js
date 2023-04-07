import { createSlice } from '@reduxjs/toolkit';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: [],
  reducers: {
    loadExpenses: (state, { payload }) => {
      return [...payload]
    },
  },
});

export const selectors = {
  getExpenses: (state) => state.expenses
}

export const { actions, reducer } = expensesSlice;