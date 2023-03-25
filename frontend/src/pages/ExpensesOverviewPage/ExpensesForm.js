import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from 'antd';
import Swal from 'sweetalert2';
import useAxios from 'utils/axios.interceptors';
import './expensesForm.scss';

const ExpensesForm = ({ isOpen = false, setIsOpen = () => {}, loadExpenses }) => {
  const api = useAxios();
  const { register, handleSubmit, control, setValue, reset, formState: { errors } } = useForm();

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
    await api.post('/api/user_expenses', data);
    Swal.fire({
      icon: 'success',
      title: 'Expense created',
      showConfirmButton: false,
      timer: 1500
    })
    await loadExpenses();
    setIsOpen(false);
    reset();
    } catch(e) {
      console.log(e)
      Swal.fire({
        title: 'Failed to create expense',
        text: e.message ?? 'Unknown error',
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }

  return (
    <div className='expensesFormWrapper'>
      <div className='closeForm' onClick={() => setIsOpen(false)}></div>
      <form className='expensesFormCard' onSubmit={handleSubmit(onSubmit)}>
        <input className='inputField' type='text' placeholder='Name' name='name' {...register("name")} />
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
              onChange={(e, value) => setValue('date', value)}
            />
          )}
        />
        <input className='primaryButton' type='submit' value='Add expense' />
      </form>
    </div>
  )
}

export default ExpensesForm