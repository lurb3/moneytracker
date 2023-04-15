import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { joiResolver } from '@hookform/resolvers/joi';
import { DatePicker, Input, Modal, Select } from 'antd';
import CategoryModal from 'components/CategoryModal/CategoryModal';
import Joi from 'joi';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
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
  date: Joi.string().required()
});

const ExpensesForm = ({ isOpen = false, setIsOpen = () => {}, isEditing = false }) => {
  const [ expenseErrorMessage, setExpenseErrorMessage ] = useState('');
  const [ openModal, setOpenModal ] = useState(false);

  const api = useAxios();
  const { register, handleSubmit, control, setValue, reset, formState: { errors } } = useForm({ resolver: joiResolver(ExpenseSchema) });
  const dispatch = useDispatch();
  const user = useSelector(userSelector.getUser || {});

  useEffect(() => {
    if (!isEditing) {
      reset();
    }
  }, [isOpen, isEditing, reset])

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
    <Modal
      title="Add expense"
      open={isOpen}
      onOk={() => {}}
      onCancel={() => setIsOpen(false)}
      className='expensesFormWrapper'
      footer={[]}
    >
      <CategoryModal openModal={openModal} setOpenModal={setOpenModal} />
      <form className='expensesFormCard' onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name='name'
          defaultValue=''
          render={() => (
            <Input
              className='mb-1'
              size="large"
              placeholder='Name'
              onChange={(e) => {
                setValue('name', e.target.value);
              }}
              status={errors?.name ? 'error' : ''}
            />
          )}
          {...register("name", removeErrors)}
          ref={null}
        />
        { errors.name && <span className='errorMessage'>{errors.name.message}</span> }
        <div className='mb-1 categoryWrapper'>
          <Controller
            control={control}
            name='category'
            render={() => (
              <Select
                  status={errors?.category ? 'error' : ''}
                  showSearch
                  size="large"
                  className='mr-1 w-100'
                  placeholder="Search category"
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                  filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={
                    user.categories.map((category) => {
                      return {
                        value: category,
                        label: category
                      }
                    })
                  }
                  onChange={(value) => {
                    setValue('category', value);
                  }}
              />
            )}
            {...register("category", removeErrors)}
            ref={null}
          />
          <div>
            <FontAwesomeIcon icon={faCirclePlus} size='2x' color='#00b96b' onClick={() => setOpenModal(true)}/>
          </div>
        </div>
        { errors.category && <span className='errorMessage'>{errors.category.message}</span> }
        <Controller
          control={control}
          name='description'
          defaultValue=''
          render={() => (
            <Input
              className='mb-1'
              size="large"
              placeholder='Description'
              onChange={(e) => {
                setValue('description', e.target.value);
              }}
              status={errors?.description ? 'error' : ''}
            />
          )}
          {...register("description", removeErrors)}
          ref={null}
        />
        { errors.description && <span className='errorMessage'>{errors.description.message}</span> }
        <Controller
          control={control}
          name='total'
          defaultValue=''
          render={() => (
            <Input
              className='mb-1'
              size="large"
              placeholder='Total spent'
              onChange={(e) => {
                setValue('total', e.target.value);
              }}
              status={errors?.total ? 'error' : ''}
            />
          )}
          {...register("total", removeErrors)}
          ref={null}
        />
        { errors.total && <span className='errorMessage'>{errors.total.message}</span> }
        <Controller
          control={control}
          name='date'
          render={() => (
            <DatePicker
              format={'DD-MM-YYYY'}
              onChange={(e, value) => {
                setValue('date', value);
              }}
              size="large"
              status={errors?.date ? 'error' : ''}
            />
          )}
          {...register("date", removeErrors)}
          ref={null}
        />
        { errors.date && <span className='errorMessage'>{errors.date.message}</span> }
        <input className='primaryButton' type='submit' value='Add expense' />
        {expenseErrorMessage && <p className='errorMessage'>{expenseErrorMessage}</p>}
      </form>
    </Modal>
  )
}

export default ExpensesForm