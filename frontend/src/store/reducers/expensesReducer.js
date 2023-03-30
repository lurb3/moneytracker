import { createSlice } from '@reduxjs/toolkit';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: [],
  reducers: {
    loadExpenses: (state, { payload }) => {
      return [...payload]
    },
    setExpense: (state, { payload }) => {
      return [...state, payload];
    },
  },
});

export const selectors = {
  getExpenses: (state) => state.expenses
}

export const { actions, reducer } = expensesSlice;