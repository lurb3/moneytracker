import { Router } from 'express';
import { UserSettingsController } from '../controllers/UserSettingsController';
import verifyToken from '../middleware/authentication'; 

const userSettingsRoute = new Router();

userSettingsRoute.post('/user_settings/:userId', verifyToken, UserSettingsController.update);

export default userSettingsRoute;