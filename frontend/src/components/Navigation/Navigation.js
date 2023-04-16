import { faCirclePlus, faGear, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'antd';
import ExpensesForm from 'pages/ExpensesOverviewPage/ExpensesForm';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from 'utils/auth';
import './navigation.scss';

const Navigation = () => {
  const [ openForm, setOpenForm ] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const items = [
    {
      label: 'Settings',
      onClick: () => navigate('/user-settings'),
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: 'Logout',
      onClick: auth.logout,
      key: '3',
    },
  ];

  return (
    <>
      <ExpensesForm isOpen={openForm} setIsOpen={setOpenForm} />
      <div className='bottomNavigation'>
        <FontAwesomeIcon icon={faHouse} size='2x' color='#4a4a4a' onClick={() => navigate('/expenses-overview')} className='cursor'/>
        <FontAwesomeIcon onClick={() => setOpenForm(true)} icon={faCirclePlus} size='3x' color='#00b96b' className='cursor'/>
        <Dropdown
          menu={{
            items,
          }}
          trigger={['click']}
          className='cursor'
        >
          <FontAwesomeIcon icon={faGear} size='2x' color='#4a4a4a'/>
        </Dropdown>
      </div>
    </>
  )
}

export default Navigation;