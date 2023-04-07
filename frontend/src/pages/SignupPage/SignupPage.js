import React from 'react';
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxios from 'utils/axios.interceptors';
import './signup.scss';

const SignupPage = () => {
  const api = useAxios();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      const user = await api.post('/api/register', data);

      if (user.data) {
        Swal.fire({
          icon: 'success',
          title: 'User created',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          navigate('/login');
        });
      }
    } catch(e) {
      Swal.fire({
        title: 'Failed to create user',
        text: e?.response?.data?.message ?? 'Could not create user, please check all fields are correct.',
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }

  if (token) return <Navigate to='/expenses-overview' replace />;

  return (
    <div className='pageWrapper signupPageWrapper'>
      <h1>Login</h1>
      <form className='signupForm' onSubmit={handleSubmit(onSubmit)}>
        <input className='inputField' type='text' placeholder='Username' name='username' {...register("username")} />
        <input className='inputField' type='number' placeholder='Total Budget' name='totalBudget' {...register("totalBudget")} />
        <input className='inputField' type='text' placeholder='Email' name='email' {...register("email")} />
        <input className='inputField' type='password' placeholder='Password' name='password' {...register("password")} />
        <input className='primaryButton' type='submit' value='create' />
      </form>
      <p>Back to <span className='primaryLink' onClick={() => navigate('/login')}>Login</span></p>
    </div>
  )
}

export default SignupPage;