import jwt_decode from "jwt-decode";
import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { actions as userActions } from 'store/reducers/userReducer';

const RequireAuth = ({ children }) => {
  const dispatch = useDispatch();
  
  // use a state variable to track whether the token is valid or not
  const token = localStorage.getItem('token');
  
  if (!token) return <Navigate to='/login' replace />


  const decodedToken = jwt_decode(token);
  dispatch(userActions.setUser(decodedToken));

  return children;
}
export default RequireAuth;
