import React, { useEffect, useState } from 'react';
import request from 'utils/axios.interceptors';
import TransactionsForm from './TransactionsForm';
import ArrowRight from '../../assets/arrow-right.svg';
import './transactionsOverview.scss';

const TransactionsOverviewPage = () => {
  const [ userExpenses, setUserExpenses ] = useState([]);
  const [ openForm, setOpenForm ] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try{
        const expenses = await request.get('/api/user_expenses', {
          params: {
            fromDate: '15-02-2023',
            toDate: '20-03-2023'
          }
        });
        setUserExpenses(expenses.data);
      } catch (error) {
        console.log('Error:', error.message);
      }
    }

    loadData();
  }, [])

  return (
    <div className='pageWrapper'>
      <TransactionsForm isOpen={openForm} setIsOpen={setOpenForm} />
      <h1>Transactions Overview</h1>
      <div className='transactionsWrapper'>
        <div className='transactionsHeader'>
          <div className='transactionsNavigation'>
            <div>Month</div>
            <div>Hamburguer</div>
          </div>
          <button className='financialButton'>
            See your financial report
            <img alt='arrow right' src={ArrowRight}/>
          </button>
        </div>

        <div className='transactionsContent'>
          {
            userExpenses.map((expense) => (
              <div key={expense._id}>
                {expense.description}
              </div>
            ))
          }
        </div>
        <div className='transactionsFooter'>
          <div className='primaryLink' onClick={() => setOpenForm(true)}>
            Add expense
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionsOverviewPage;