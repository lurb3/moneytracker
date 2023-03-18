import React from 'react';
import { Navigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
 
const RequireAuth = (Component) => {
  const token = localStorage.getItem('token');
  if (! token) return <Navigate to='/login' replace />;
  const decodedToken = jwt_decode(token);
  const isTokenValid = decodedToken.exp >= Date.now() / 1000;

  return isTokenValid ? Component : <Navigate to='/login' replace />;
};
 
export default RequireAuth;