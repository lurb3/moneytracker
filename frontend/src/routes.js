import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from 'utils/RequireAuth';
import LoginPage from './pages/LoginPage/LoginPage';
import EntryPage from './pages/EntryPage/EntryPage';
import ExpensesOverviewPage from 'pages/ExpensesOverviewPage/ExpensesOverviewPage';

const AppRoutes = () => (
  <Routes>
    <Route
      exact
      path='/'
      element={<EntryPage />}
    />
    <Route exact path="/login" element={<LoginPage/>} />
    <Route
      exact
      path='/expenses-overview'
      element={RequireAuth(<ExpensesOverviewPage />)}
    />
  </Routes>
);

export default AppRoutes;