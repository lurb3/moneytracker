import { joiResolver } from '@hookform/resolvers/joi';
import { DatePicker } from 'antd';
import Joi from 'joi';
import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { actions as userActions } from 'store/reducers/userReducer';
import Swal from 'sweetalert2';
import useAxios from 'utils/axios.interceptors';
import './expensesForm.scss';

const ExpenseSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().allow(''),
  total: Joi.string().required(),
  date: Joi.string().required()
});

const ExpensesForm = ({ isOpen = false, setIsOpen = () => {} }) => {
  const [ expenseErrorMessage, setExpenseErrorMessage ] = useState('');
  const api = useAxios();
  const { register, handleSubmit, control, setValue, reset, formState: { errors } } = useForm({ resolver: joiResolver(ExpenseSchema) });
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/api/user_expenses', data);
      dispatch(userActions.setUserBudget({totalBudget: res?.data?.user?.totalBudget}));

      Swal.fire({
        icon: 'success',
        title: 'Expense created',
        showConfirmButton: false,
        timer: 1500
      })
    setIsOpen(false);
    reset();
    } catch(e) {
      Swal.fire({
        title: 'Failed to create expense',
        text: e.message ?? 'Unknown error',
        icon: 'error',
        confirmButtonText: 'Close',
      });
      setExpenseErrorMessage('Failed to create expense');
    }
  }

  const removeErrors = () => {
    setExpenseErrorMessage('');
  }

  return (
    <div className='expensesFormWrapper'>
      <div className='closeForm' onClick={() => setIsOpen(false)}></div>
      <form className='expensesFormCard' onSubmit={handleSubmit(onSubmit)}>
        <input
          className={`inputField ${errors?.name ? 'inputError' : ''}`}
          type='text'
          placeholder='Name'
          name='name'
          {...register("name", removeErrors)}
        />
        { errors.name && <span className='errorMessage'>{errors.name.message}</span> }
        <input
          className={`inputField ${errors?.category ? 'inputError' : ''}`}
          type='text'
          placeholder='Category'
          name='email'
          {...register("category", removeErrors)}
        />
        { errors.category && <span className='errorMessage'>{errors.category.message}</span> }
        <input
          className={`inputField ${errors?.description ? 'inputError' : ''}`}
          type='text'
          placeholder='Brief description'
          name='description'
          {...register("description", removeErrors)}
        />
        { errors.description && <span className='errorMessage'>{errors.description.message}</span> }
        <input
          className={`inputField ${errors?.total ? 'inputError' : ''}`}
          type='number'
          placeholder='Total spent'
          name='total'
          {...register("total",removeErrors)}
        />
        { errors.total && <span className='errorMessage'>{errors.total.message}</span> }
        <Controller
          control={control}
          name='date'
          render={() => (
            <DatePicker
            className={`inputField ${errors?.date ? 'inputError' : ''}`}
              format={'DD-MM-YYYY'}
              onChange={(e, value) => {
                setValue('date', value);
                removeErrors();
              }}
            />
          )}
        />
        { errors.date && <span className='errorMessage'>{errors.date.message}</span> }
        <input className='primaryButton' type='submit' value='Add expense' />
        {expenseErrorMessage && <p className='errorMessage'>{expenseErrorMessage}</p>}
      </form>
    </div>
  )
}

export default ExpensesForm