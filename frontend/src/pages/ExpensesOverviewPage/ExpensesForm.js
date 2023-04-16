import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { joiResolver } from '@hookform/resolvers/joi';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Modal } from 'antd';
import CategoryModal from 'components/CategoryModal/CategoryModal';
import dayjs from 'dayjs';
import Joi from 'joi';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { actions as userActions, selectors as userSelector } from 'store/reducers/userReducer';
import Swal from 'sweetalert2';
import useAxios from 'utils/axios.interceptors';
import './expensesForm.scss';

const ExpenseSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().allow(''),
  total: Joi.string().required(),
  date: Joi.date().required()
});

const ExpensesForm = ({ isOpen = false, setIsOpen = () => {}, isEditing = false, editExpense }) => {
  const [ expenseErrorMessage, setExpenseErrorMessage ] = useState('');
  const [ openModal, setOpenModal ] = useState(false);

  const api = useAxios();
  const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm({ resolver: joiResolver(ExpenseSchema) });
  const dispatch = useDispatch();
  const user = useSelector(userSelector.getUser || {});

  useEffect(() => {
    if (!isEditing) {
      reset();
    }
    setExpenseErrorMessage('');
  }, [isOpen, isEditing, reset]);

  const onSubmit = async (data) => {
    try {
      const formatData = {...data};
      formatData.date = dayjs(formatData.date).format('DD-MM-YYYY');
      let res = null;

      if  (isEditing) {
        res = await api.put(`/api/user_expenses/${editExpense._id}`, formatData);
      } else {
        res = await api.post('/api/user_expenses', formatData);
      }
      dispatch(userActions.setUserBudget({totalBudget: res?.data?.user?.totalBudget}));
      Swal.fire({
        icon: 'success',
        title: `Expense saved`,
        showConfirmButton: false,
        timer: 1500
      })
    setIsOpen(false);
    reset();
    } catch(e) {
      Swal.fire({
        title: `Failed to save expense`,
        text: e.message ?? 'Unknown error',
        icon: 'error',
        confirmButtonText: 'Close',
      });
      setExpenseErrorMessage('Failed to save expense');
    }
  }

  const removeErrors = () => {
    setExpenseErrorMessage('');
  }

  return (
    <Modal
      title={isEditing ? 'Edit expense blablala' : 'Add expense'}
      open={isOpen}
      onOk={() => {}}
      onCancel={() => setIsOpen(false)}
      className='expensesFormWrapper'
      footer={[]}
    >
      <CategoryModal openModal={openModal} setOpenModal={setOpenModal} />
      <form className='expensesFormCard' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-2'>
          <TextField
            fullWidth
            error={Boolean(errors.name)}
            name='name'
            label="Name"
            value={isEditing ? editExpense.name : watch('name')}
            helperText={errors.name ? errors.name.message : ''}
            {...register("name", removeErrors)}
          />
        </div>
        <div className='mb-2 categoryWrapper'>
          <FormControl fullWidth error={Boolean(errors.category)}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={isEditing ? editExpense.category : watch('category')}
              label="Category"
              onChange={(e) => setValue('category', e.target.value)}
              name='category'
            >
              {
                user.categories.length > 0 ?user.categories.map((category) => (
                  <MenuItem value={category} key={category}>{category}</MenuItem>
                )) : <MenuItem></MenuItem>
              }
            </Select>
            {
              errors.category ? (
                <FormHelperText>
                  {errors.category.message}
                </FormHelperText>
              )  : ''
            }
          </FormControl>
          <div className='ml-1'>
            <FontAwesomeIcon icon={faCirclePlus} size='2x' color='#00b96b' onClick={() => setOpenModal(true)}/>
          </div>
        </div>
        <div className='mb-2'>
          <TextField
            fullWidth
            error={Boolean(errors.description)}
            name='description'
            label="Description"
            value={isEditing ? editExpense.description : watch('description')}
            helperText={errors.description ? errors.description.message : ''}
            {...register("description", removeErrors)}
          />
        </div>
        <div className='mb-2'>
          <TextField
            fullWidth
            error={Boolean(errors.total)}
            name='total'
            label="Total"
            value={isEditing ? editExpense.total : watch('total')}
            type='number'
            helperText={errors.total ? errors.total.message : ''}
            {...register("total", removeErrors)}
          />
        </div>
        <div>
          <FormControl fullWidth error={Boolean(errors.date)}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disableFuture
                format='DD/MM/YYYY'
                value={isEditing ? dayjs(editExpense.date) : dayjs(watch('date'))}
                label="Select date" 
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputRef={register('date')}
                  />
                )}
                onChange={(date) => setValue('date', date.toString())}
              />
              {
                errors.date ? (
                  <FormHelperText>
                    {errors.date.message}
                  </FormHelperText>
                )  : ''
              }
            </LocalizationProvider>
          </FormControl>
        </div>
        { isEditing ? <input className='primaryButton' type='submit' value='Edit expense' /> : <input className='primaryButton' type='submit' value='Add expense' /> }
        { isEditing && <input className='alertButton' type='submit' value='Delete expense' /> }
        {expenseErrorMessage && <p className='errorMessage'>{expenseErrorMessage}</p>}
      </form>
    </Modal>
  )
}

export default ExpensesForm