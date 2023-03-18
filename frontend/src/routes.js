import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from 'utils/RequireAuth';
import LoginPage from './pages/LoginPage/LoginPage';
import EntryPage from './pages/EntryPage/EntryPage';

const AppRoutes = () => (
  <Routes>
    <Route
      exact
      path='/'
      element={RequireAuth(<EntryPage />)}
    />
    <Route exact path="/login" element={<LoginPage/>} />
  </Routes>
);

export default AppRoutes;