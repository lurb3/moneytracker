import Logo from 'assets/entry-page-logo.svg';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './entry.scss';

const EntryPage = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const changeRoute = (route) => {
    navigate(route);
  }

  if (token) return <Navigate to='/expenses-overview' replace />;

  return (
    <div className='entryPageWrapper'>
      <div className='entryLogo'>
        <img alt='entry-logo' src={Logo} />
      </div>
      <div className='entryHeader'>
        <h1>Gain total control of your money</h1>
        <p>Become your own money manager and make every cent count</p>
      </div>
      <div className='entryFooter'>
        <button className='secondaryButton' >Sign Up</button>
        <button className='primaryButton' onClick={() => changeRoute('/login')}>Login</button>
      </div>
    </div>
  )
}

export default EntryPage;