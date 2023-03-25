import React, { useEffect, useState, useRef, useContext } from 'react';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import useAxios from 'utils/axios.interceptors';
import TransactionsForm from './TransactionsForm';
import ArrowRight from '../../assets/arrow-right.svg';
import CategoryPlaceholder from '../../assets/category-placeholder.svg';
import './transactionsOverview.scss';

const TransactionsOverviewPage = () => {
  const [ userExpenses, setUserExpenses ] = useState([]);
  const [ openForm, setOpenForm ] = useState(false);
  const apiRef = useRef(useAxios());

  const loadData = async () => {
  
    try {
      const expenses = await apiRef.current.get('/api/user_expenses', {
        params: {
          fromDate: '15-02-2023',
          toDate: '20-03-2023'
        }
      });
      setUserExpenses(expenses.data);
    } catch (e) {
      Swal.fire({
        title: 'Failed to load transactions',
        text: e.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className='pageWrapper'>
      <TransactionsForm isOpen={openForm} setIsOpen={setOpenForm} loadTransactions={loadData} />
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
              <div className='transactionsCard' key={expense._id}>
                <img className='categoryImage' src={CategoryPlaceholder} alt='Category placeholder'/>
                <div className='cardContent'>
                  <span className='transactionName'>{expense.name}</span>
                  {expense.description && <span className='transactionDescription'>{expense.description}</span>}
                </div>
                <div className='cardContent' style={{marginLeft: 'auto'}}>
                  <span className='transactionTotal'>- {expense.total} €</span>
                  <span className='transactionDate'>{format(new Date(expense.date), 'dd-MM-yyyy')}</span>
                </div>
              </div>
            ))
          }
        </div>
        <div className='transactionsFooter'>
          <FontAwesomeIcon onClick={() => setOpenForm(true)} icon={faCirclePlus} size='3x' color='green'/>
        </div>
      </div>
    </div>
  )
}

export default TransactionsOverviewPage;