import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import useAxios from 'utils/axios.interceptors';
import './login.scss';

const LoginSchema = Joi.object({
  email: Joi.string().email({tlds: { allow: false }}).required(),
  password: Joi.string().required()
})

const LoginPage = () => {
  const [ loginErrorMessage, setLoginErrorMessage ] = useState('');
  const api = useAxios();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: joiResolver(LoginSchema) });

  const onSubmit = async (data, e) => {
    try {
      const user = await api.post('/api/login', data);
      localStorage.setItem('token', user.data.token);
      navigate('/expenses-overview');
    } catch (e) {
      setLoginErrorMessage(e?.response?.data);
    }
  }

  const removeErrors = () => {
    setLoginErrorMessage('');
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
        <input
          className={`inputField ${errors?.email ? 'inputError' : ''}`}
          type='text'
          placeholder='Email'
          name='email'
          {...register("email", removeErrors)}
        />
        { errors.email && <span className='errorMessage'>{errors.email.message}</span> }
        <input
          className={`inputField ${errors?.password ? 'inputError' : ''}`}
          type='password'
          placeholder='Password'
          name='password'
          {...register("password", removeErrors)}
        />
        { errors.password && <span className='errorMessage'>{errors.password.message}</span> }
        <input
          className='primaryButton'
          type='submit'
          value='login'
        />
      </form>
      {loginErrorMessage && <p className='errorMessage'>{loginErrorMessage}</p>}
      <p><span className='loginForgotPassword' onClick={() => navigate('/signup')}>Forgot Password?</span></p>
      <p>Don't have an acount yet? <span className='primaryLink' onClick={() => navigate('/signup')}>Sign Up</span></p>
    </div>
  )
}

export default LoginPage;