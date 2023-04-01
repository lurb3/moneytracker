import Navigation from 'components/Navigation/Navigation';
import ExpensesOverviewPage from 'pages/ExpensesOverviewPage/ExpensesOverviewPage';
import SignupPage from 'pages/SignupPage/SignupPage';
import UserSettings from 'pages/UserSettings/UserSettings';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from 'utils/RequireAuth';
import EntryPage from './pages/EntryPage/EntryPage';
import LoginPage from './pages/LoginPage/LoginPage';

const AppRoutes = () => (
  <>
    <Routes>
      <Route exact path="/" element={<EntryPage />} />
      <Route exact path="/signup" element={<SignupPage />} />
      <Route exact path="/login" element={<LoginPage />} />
      <Route
        path="/expenses-overview"
        element={
          <RequireAuth>
            <ExpensesOverviewPage />
            <Navigation />
          </RequireAuth>
        }
      />
      <Route
       path='/user-settings'
       element={
        <RequireAuth>
          <UserSettings />
          <Navigation />
        </RequireAuth>
       }
      />
    </Routes>
  </>
);


export default AppRoutes;