import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom'; 
import Logo from 'assets/entry-page-logo.svg';
import './entry.scss'

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
        <button className='signUpButton' >Sign Up</button>
        <button className='loginButton' onClick={() => changeRoute('/login')}>Login</button>
      </div>
    </div>
  )
}

export default EntryPage;