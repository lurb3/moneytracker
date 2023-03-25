import React, { useEffect, useState, useRef } from 'react';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Button, DatePicker } from 'antd';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import useAxios from 'utils/axios.interceptors';
import ExpensesForm from './ExpensesForm';
import CategoryPlaceholder from '../../assets/category-placeholder.svg';
import './expensesOverview.scss';

const ExpensesOverviewPage = () => {
  const dateFormat = 'DD-MM-YYYY';
  const [ isLoading, setIsLoading ] = useState(false);
  const [ openForm, setOpenForm ] = useState(false);
  const [ timeInterval, setTimeInterval ] = useState([dayjs(), dayjs()]);
  const [ userExpenses, setUserExpenses ] = useState([]);

  const apiRef = useRef(useAxios());
  const { RangePicker } = DatePicker;

  const loadData = async () => {
    setIsLoading(true);

    try {
      const expenses = await apiRef.current.get('/api/user_expenses', {
        params: {
          fromDate: dayjs(timeInterval[0], 'DD-MM-YYYY').format(dateFormat),
          toDate: dayjs(timeInterval[1], 'DD-MM-YYYY').format(dateFormat)
        }
      });
      setUserExpenses(expenses.data);
      setIsLoading(false);
    } catch (e) {
      Swal.fire({
        title: 'Failed to load expenses',
        text: e.message ?? 'Unknown error',
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
      <ExpensesForm isOpen={openForm} setIsOpen={setOpenForm} loadExpenses={loadData} />
      <h1>Expenses Overview</h1>
      <div className='expensesWrapper'>
        <div className='expensesHeader'>
          <div className='expensesNavigation'>
            <RangePicker
              defaultValue={timeInterval}
              className='inputField'
              format={dateFormat}
              onChange={(e, value) => setTimeInterval(value)}
            />
          </div>
          <Button type="primary" size='large' onClick={loadData} loading={isLoading}>
            Load expenses
          </Button>
        </div>

        <div className='expensesContent'>
          {
            userExpenses.map((expense) => (
              <div className='expensesCard' key={expense._id}>
                <img className='categoryImage' src={CategoryPlaceholder} alt='Category placeholder'/>
                <div className='cardContent'>
                  <span className='expenseName'>{expense.name}</span>
                  {expense.description && <span className='expenseDescription'>{expense.description}</span>}
                </div>
                <div className='cardContent' style={{marginLeft: 'auto'}}>
                  <span className='expenseTotal'>- {expense.total} €</span>
                  <span className='expenseDate'>{format(new Date(expense.date), 'dd-MM-yyyy')}</span>
                </div>
              </div>
            ))
          }
        </div>
        <div className='expensesFooter'>
          <FontAwesomeIcon onClick={() => setOpenForm(true)} icon={faCirclePlus} size='3x' color='#00b96b'/>
        </div>
      </div>
    </div>
  )
}

export default ExpensesOverviewPage;