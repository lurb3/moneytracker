import { Router } from 'express';
import { UserController } from "../controllers/UserController";
import verifyToken from '../middleware/authentication'; 

const userRoute = new Router();
userRoute.get('/user/:userId', verifyToken, UserController.show);
userRoute.delete('/user/:userId', verifyToken, UserController.delete);

export default userRoute;