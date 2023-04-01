import { DownOutlined } from '@ant-design/icons';
import { faCirclePlus, faGear, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, Space } from 'antd';
import ExpensesForm from 'pages/ExpensesOverviewPage/ExpensesForm';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './navigation.scss';

const Navigation = () => {
  const [ openForm, setOpenForm ] = useState(false);
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
      onClick: () => {},
      key: '3',
    },
  ];

  return (
    <>
      <ExpensesForm isOpen={openForm} setIsOpen={setOpenForm} loadExpenses={() => {}} />
      <div className='bottomNavigation'>
        <FontAwesomeIcon icon={faHouse} size='2x' color='#4a4a4a' onClick={() => navigate('/expenses-overview')}/>
        <FontAwesomeIcon onClick={() => setOpenForm(true)} icon={faCirclePlus} size='3x' color='#00b96b'/>
        <Dropdown
          menu={{
            items,
          }}
          trigger={['click']}
        >
          <FontAwesomeIcon icon={faGear} size='2x' color='#4a4a4a'/>
        </Dropdown>
      </div>
    </>
  )
}

export default Navigation;