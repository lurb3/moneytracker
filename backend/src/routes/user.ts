import { Router } from 'express';
import { UserController } from "../controllers/UserController";
import verifyToken from '../middleware/authentication';

const userRoute = Router();

userRoute.get('/user/:userId', verifyToken, UserController.show);
userRoute.delete('/user/:userId', verifyToken, UserController.delete);
userRoute.patch('/user/:userId', verifyToken, UserController.update);

export default userRoute;