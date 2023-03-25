import React, { useEffect, useState, useRef, useContext } from 'react';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Button, DatePicker } from 'antd';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import useAxios from 'utils/axios.interceptors';
import TransactionsForm from './TransactionsForm';
import CategoryPlaceholder from '../../assets/category-placeholder.svg';
import './transactionsOverview.scss';

const TransactionsOverviewPage = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ openForm, setOpenForm ] = useState(false);
  const [ timeInterval, setTimeInterval ] = useState([dayjs(), dayjs()]);
  const [ userExpenses, setUserExpenses ] = useState([]);

  const apiRef = useRef(useAxios());
  const { RangePicker } = DatePicker;

  const dateFormat = 'DD-MM-YYYY';

  const loadData = async () => {
    setIsLoading(true);
    try {
      const expenses = await apiRef.current.get('/api/user_expenses', {
        params: {
          fromDate: timeInterval[0],
          toDate: timeInterval[1]
        }
      });
      setUserExpenses(expenses.data);
      setIsLoading(false);
    } catch (e) {
      Swal.fire({
        title: 'Failed to load transactions',
        text: e.message,
        icon: 'error',
        confirmButtonText: 'Close',
      })
      setIsLoading(false);
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
            <RangePicker
              defaultValue={timeInterval}
              className='inputField'
              format={dateFormat}
              onChange={(e, value) => setTimeInterval(value)}
            />
          </div>
          <Button type="primary" size='large' onClick={loadData} loading={isLoading}>
            Load transactions
          </Button>
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
          <FontAwesomeIcon onClick={() => setOpenForm(true)} icon={faCirclePlus} size='3x' color='#00b96b'/>
        </div>
      </div>
    </div>
  )
}

export default TransactionsOverviewPage;