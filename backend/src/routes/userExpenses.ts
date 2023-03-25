import { Router } from 'express';
import { UserExpensesController } from '../controllers/UserExpensesController';
import verifyToken from '../middleware/authentication'; 

const userExpensesRoute = Router();

userExpensesRoute.get('/user_expenses/', verifyToken, UserExpensesController.index);
userExpensesRoute.post('/user_expenses/', verifyToken, UserExpensesController.create);

export default userExpensesRoute;