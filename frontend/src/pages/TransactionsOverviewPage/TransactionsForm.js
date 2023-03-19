import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { parse, parseISO, format } from 'date-fns'
import { DatePicker } from 'antd';
import request from 'utils/axios.interceptors';
import './transactionsForm.scss';

const TransactionsForm = ({ isOpen = false, setIsOpen = () => {} }) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    const transaction = await request.post('/api/user_expenses', data);
    console.log(transaction)
  }

  return (
    <div className='transactionsFormWrapper'>
      <div className='closeForm' onClick={() => setIsOpen(false)}></div>
      <form className='transactionsFormCard' onSubmit={handleSubmit(onSubmit)}>
        <input className='inputField' type='text' placeholder='Category' name='email' {...register("category")} />
        <input className='inputField' type='text' placeholder='Brief description' name='description' {...register("description")} />
        <input className='inputField' type='number' placeholder='Total spent' name='total' {...register("total")} />
        <Controller
          control={control}
          name='date'
          render={() => (
            <DatePicker
              className='inputField'
              format={'DD-MM-YYYY'}
            />
          )}
        />
        <input className='primaryButton' type='submit' value='Add transaction' />
      </form>
    </div>
  )
}

export default TransactionsForm