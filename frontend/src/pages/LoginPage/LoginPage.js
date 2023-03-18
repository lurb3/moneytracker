import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectors as userSelector, actions as userActions } from 'store/reducers/userReducer';
import request from 'utils/axios.interceptors';
import './login.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getUsername = useSelector(userSelector.getUsername)
  const { register, handleSubmit, formState: { errors } } = useForm();
  console.log(getUsername)
  const onSubmit = async (data, e) => {
    e.preventDefault();
    const user = await request.post('/api/login', data);

    if (user.data) {
      localStorage.setItem('token', user.data.token);
      dispatch(userActions.setUser(user.data));
    }
  }

  return (
    <div className='loginPageWrapper'>
      <h1>Login</h1>
      <form className='loginForm' onSubmit={handleSubmit(onSubmit)}>
        <input className='loginInputField' type='text' placeholder='Email' name='email' {...register("email")} />
        <input className='loginInputField' type='password' placeholder='Password' name='password' {...register("password")} />
        <input className='loginSubmit' type='submit' value='login' />
      </form>
      <p><span className='loginForgotPassword' onClick={() => navigate('/signup')}>Forgot Password?</span></p>
      <p>Don't have an acount yet? <span className='loginSignup' onClick={() => navigate('/signup')}>Sign Up</span></p>
    </div>
  )
}

export default LoginPage;