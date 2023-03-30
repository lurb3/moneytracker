import { faCirclePlus, faGear, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExpensesForm from 'pages/ExpensesOverviewPage/ExpensesForm';
import React, { useState } from 'react';
import './navigation.scss';

const Navigation = () => {
  const [ openForm, setOpenForm ] = useState(false);
  return (
    <>
      <ExpensesForm isOpen={openForm} setIsOpen={setOpenForm} loadExpenses={() => {}} />
      <div className='bottomNavigation'>
        <FontAwesomeIcon icon={faHouse} size='2x' color='#4a4a4a'/>
        <FontAwesomeIcon onClick={() => setOpenForm(true)} icon={faCirclePlus} size='3x' color='#00b96b'/>
        <FontAwesomeIcon icon={faGear} size='2x' color='#4a4a4a'/>
      </div>
    </>
  )
}

export default Navigation;