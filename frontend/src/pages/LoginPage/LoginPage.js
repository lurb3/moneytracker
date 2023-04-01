import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from 'react-router-dom';
import useAxios from 'utils/axios.interceptors';
import './login.scss';

const LoginPage = () => {
  const api = useAxios();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const user = await api.post('/api/login', data);

    if (user.data) {
      localStorage.setItem('token', user.data.token);
      navigate('/expenses-overview');
    }
  }

  useEffect(() => {
    if(token) {
      navigate('/expenses-overview')
    }
  }, [navigate, token])

  //if (token) return <Navigate to='/expenses-overview' replace />;

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