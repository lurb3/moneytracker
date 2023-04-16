import { Router } from 'express';
import { UserExpensesController } from '../controllers/UserExpensesController';
import verifyToken from '../middleware/authentication';
import validateSchema from '../middleware/validateSchema';
import userExpensesSchema from '../schemas/userExpensesSchema';

const userExpensesRoute = Router();

userExpensesRoute.get('/user_expenses/', verifyToken, UserExpensesController.index);
userExpensesRoute.post('/user_expenses/', validateSchema(userExpensesSchema), verifyToken, UserExpensesController.create);
userExpensesRoute.put('/user_expenses/:expense', validateSchema(userExpensesSchema), verifyToken, UserExpensesController.update);

export default userExpensesRoute;