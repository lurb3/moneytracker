import React from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode";
import { actions as userActions } from 'store/reducers/userReducer';
 
const RequireAuth = (Component) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  if (! token) return <Navigate to='/login' replace />;

  const decodedToken = jwt_decode(token);
  const isTokenValid = decodedToken.exp >= Date.now() / 1000;

  dispatch(userActions.setUser(decodedToken));

  return isTokenValid ? Component : <Navigate to='/login' replace />;
};
 
export default RequireAuth;