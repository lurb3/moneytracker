import React from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { actions as userActions, selectors as userSelector } from 'store/reducers/userReducer';
import 'styles/Form.scss';
import Swal from 'sweetalert2';
import useAxios from 'utils/axios.interceptors';

const TotalBudget = ({ callback }) => {
  const api = useAxios();
  const dispatch = useDispatch();
  const user = useSelector(userSelector.getUsername || {});
  const userSettings = useSelector(userSelector.getSettings || []);
  const { register, handleSubmit, control, setValue, reset, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await api.post(`/api/user_settings/${user._id}`, data);
      dispatch(userActions.setSetting(res.data));
      Swal.fire({
        icon: 'success',
        title: 'Total budget updated',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        callback();
      })
    reset();
    } catch(e) {
      Swal.fire({
        title: 'Failed to update total budget',
        text: e.message ?? 'Unknown error',
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
  return (
    <form className='formWrapper' onSubmit={handleSubmit(onSubmit)}>
      <h3>Total Budget</h3>
      <input className='inputField' defaultValue={userSettings?.totalBudget || 0} type='number' placeholder='Total budget' name='totalBudget' {...register("totalBudget")} />
      <input className='primaryButton' type='submit' value='Save' />
    </form>
  );
}

export default TotalBudget;