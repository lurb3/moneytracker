import { Router } from 'express';
import userExpensesSchema from '../schemas/userExpensesSchema';
import validateSchema from '../middleware/validateSchema';
import { UserExpensesController } from '../controllers/UserExpensesController';
import verifyToken from '../middleware/authentication'; 

const userExpensesRoute = Router();

userExpensesRoute.get('/user_expenses/', verifyToken, UserExpensesController.index);
userExpensesRoute.post('/user_expenses/', validateSchema(userExpensesSchema), verifyToken, UserExpensesController.create);

export default userExpensesRoute;