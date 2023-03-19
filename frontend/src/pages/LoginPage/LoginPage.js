import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import request from 'utils/axios.interceptors';
import './login.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const user = await request.post('/api/login', data);

    if (user.data) {
      localStorage.setItem('token', user.data.token);
      navigate('/transactions-overview');
    }
  }

  return (
    <div className='pageWrapper loginPageWrapper'>
      <h1>Login</h1>
      <form className='loginForm' onSubmit={handleSubmit(onSubmit)}>
        <input className='inputField' type='text' placeholder='Email' name='email' {...register("email")} />
        <input className='inputField' type='password' placeholder='Password' name='password' {...register("password")} />
        <input className='primaryButton' type='submit' value='login' />
      </form>
      <p><span className='loginForgotPassword' onClick={() => navigate('/signup')}>Forgot Password?</span></p>
      <p>Don't have an acount yet? <span className='primaryLink' onClick={() => navigate('/signup')}>Sign Up</span></p>
    </div>
  )
}

export default LoginPage;