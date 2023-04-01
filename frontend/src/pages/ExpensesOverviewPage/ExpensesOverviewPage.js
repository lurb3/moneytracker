import { Button, DatePicker } from 'antd';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as expensesActions, selectors as expensesSelector } from 'store/reducers/expensesReducer';
import Swal from 'sweetalert2';
import useAxios from 'utils/axios.interceptors';
import CategoryPlaceholder from '../../assets/category-placeholder.svg';
import './expensesOverview.scss';

const ExpensesOverviewPage = () => {
  const dateFormat = 'DD-MM-YYYY';
  const [ isLoading, setIsLoading ] = useState(false);
  const [ timeInterval, setTimeInterval ] = useState([dayjs(), dayjs()]);
  const expenses = useSelector(expensesSelector.getExpenses || []);
  const dispatch = useDispatch();
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
      dispatch(expensesActions.loadExpenses(expenses.data));
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
            expenses.map((expense) => (
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
      </div>
    </div>
  )
}

export default ExpensesOverviewPage;