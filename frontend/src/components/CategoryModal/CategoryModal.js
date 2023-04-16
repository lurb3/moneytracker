import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as userActions, selectors as userSelector } from 'store/reducers/userReducer';
import Swal from 'sweetalert2';
import useAxios from 'utils/axios.interceptors';

import { Input, Modal } from 'antd';

const CategoryModal = ({ openModal, setOpenModal }) => {
  const [ newCategory, setNewCategory ] = useState('');
  const [ confirmLoading, setConfirmLoading ] = useState(false);
  const api = useAxios();
  const dispatch = useDispatch();
  const user = useSelector(userSelector.getUser || {});

  const handleSubmit = async () => {
    if (!newCategory) return;

    setConfirmLoading(true);

    const data = {
      categories: [...user.categories, newCategory]
    };

    try {
      const res = await api.patch(`/api/user/${user._id}`, data);

      dispatch(userActions.setUser(res.data));
      Swal.fire({
        icon: 'success',
        title: 'Categories updated',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        setOpenModal(false);
        setConfirmLoading(false);
      })
    } catch(e) {
      setOpenModal(false);
      Swal.fire({
        title: 'Failed to update categories',
        text: e.message ?? 'Unknown error',
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  
  useEffect(() => {
    setNewCategory('');
  }, [openModal])

  return (
    <Modal
      title="Add category"
      open={openModal}
      onOk={handleSubmit}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Input
        className='mb-1'
        size="large"
        placeholder='Category name'
        value={newCategory}
        onChange={(e) => {
          setNewCategory(e.target.value);
        }}
      />
    </Modal>
  )
}

export default CategoryModal;