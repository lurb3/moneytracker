import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxios from 'utils/axios.interceptors';
import './signup.scss';

const SignupSchema = Joi.object({
  username: Joi.string().required(),
  totalBudget: Joi.number(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().required()
})

const SignupPage = () => {
  const [ signupErrorMessage, setSignupErrorMessage ] = useState('');
  const api = useAxios();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: joiResolver(SignupSchema) });

  const onSubmit = async (data, e) => {
    try {
      await api.post('/api/register', data);
      Swal.fire({
        icon: 'success',
        title: 'User created',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        navigate('/login');
      });
    } catch(e) {
      Swal.fire({
        title: 'Failed to create user',
        text: e?.response?.data?.message ?? 'Could not create user, please check all fields are correct.',
        icon: 'error',
        confirmButtonText: 'Close',
      });
      setSignupErrorMessage(e?.response?.data);
    }
  }

  const removeErrors = () => {
    setSignupErrorMessage('');
  }

  if (token) return <Navigate to='/expenses-overview' replace />;

  return (
    <div className='pageWrapper signupPageWrapper'>
      <h1>Login</h1>
      <form className='signupForm' onSubmit={handleSubmit(onSubmit)}>
        <input
          className={`inputField ${errors?.username ? 'inputError' : ''}`}
          type='text'
          placeholder='Username'
          name='username'
          {...register("username", removeErrors)}
        />
        { errors.username && <span className='errorMessage'>{errors.username.message}</span> }
        <input
          className={`inputField ${errors?.totalBudget ? 'inputError' : ''}`}
          type='number'
          placeholder='Total Budget'
          name='totalBudget'
          {...register("totalBudget", removeErrors)}
        />
        { errors.totalBudget && <span className='errorMessage'>{errors.totalBudget.message}</span> }
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
          value='create'
        />
      </form>
      {signupErrorMessage && <p className='errorMessage'>{signupErrorMessage}</p>}
      <p>Back to <span className='primaryLink' onClick={() => navigate('/login')}>Login</span></p>
    </div>
  )
}

export default SignupPage;