import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectors as userSelectors } from 'store/reducers/userReducer';
import Currency from './Currency/Currency';
import TotalBudget from './TotalBudget/TotalBudget';
import './userSettings.scss';

const UserSettings = () => {
  const userSettings = useSelector(userSelectors.getSettings);
  const settings = [
    {
      title: 'Currency',
      content: (
        <>
          EUR <FontAwesomeIcon className='settingItemIcon' icon={faAngleRight} />
        </>
      ),
      onClick: () => setRenderComponent('currency')
    },
    {
      title: 'Total Budget',
      content: (
        <>
          {userSettings?.totalBudget || 0} € <FontAwesomeIcon className='settingItemIcon' icon={faAngleRight} />
        </>
      ),
      onClick: () => setRenderComponent('totalBudget')
    }
  ];

  const settingsComponents = {
    default: (
      settings.map((item) => (
        <div className='settingList' key={item.title} onClick={item.onClick}>
          <span className='settingTitle'>{item.title}</span>
          <span className='settingContent'>{item.content}</span>
        </div>
      ))
    ),
    totalBudget: <TotalBudget />,
    currency: <Currency />
  }
  const [ renderComponent, setRenderComponent ] = useState('default');

  return (
    <div className='pageWrapper'>
      <div className='settingsHeader'>
        {
          renderComponent !== 'default' ? (
            <span>
              <FontAwesomeIcon className='settingItemIcon goBackArrow' icon={faAngleLeft} onClick={() => setRenderComponent('default')}/>
            </span>
          ) : ''
        }
        <h1>Settings</h1>
      </div>
      {settingsComponents[renderComponent]}
    </div>
  )
}

export default UserSettings;