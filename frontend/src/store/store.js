import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers/reducers';

const store = configureStore({
  reducer: {
    user: reducers.userReducer,
    expenses: reducers.expensesReducer
  },
});

export default store;