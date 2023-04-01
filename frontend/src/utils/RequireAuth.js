import jwt_decode from "jwt-decode";
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { actions as userActions } from 'store/reducers/userReducer';
import useAxios from 'utils/axios.interceptors';

const RequireAuth = ({ children }) => {
  const dispatch = useDispatch();
  const api = useAxios();

  const getUser = async () => {
    const res = await api.get('/api/current');
    if (!res?.data?.user) return <Navigate to='/login' replace />

    dispatch(userActions.setUser(res.data.user));
    dispatch(userActions.loadSettings(res.data.settings));
  }

  useEffect(() => {
    getUser();
  }, [])
  
  // use a state variable to track whether the token is valid or not
  const token = localStorage.getItem('token');
  
  if (!token) return <Navigate to='/login' replace />

  const decodedToken = jwt_decode(token);
  dispatch(userActions.setUser(decodedToken));

  return children;
}
export default RequireAuth;
