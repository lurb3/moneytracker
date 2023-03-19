import React from 'react';
import { useForm } from "react-hook-form";
import { parseISO, format } from 'date-fns'
import request from 'utils/axios.interceptors';
import './transactionsForm.scss';

const TransactionsForm = ({ isOpen = false, setIsOpen = () => {} }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const today = format(parseISO(new Date().toISOString()), 'yyyy-MM-dd');

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
        <input className='inputField' type='date' defaultValue={today} max={today} placeholder='Date' name='date' {...register("date")} onChange={(e) => console.log(e.target.value)} />
        <input className='inputField' type='text' placeholder='Brief description' name='description' {...register("description")} />
        <input className='inputField' type='number' placeholder='Total spent' name='total' {...register("total")} />
        <input className='primaryButton' type='submit' value='Add transaction' />
      </form>
    </div>
  )
}

export default TransactionsForm