import { Router } from 'express';
import { UserSettingsController } from '../controllers/UserSettingsController';

const userSettingsRoute = new Router();
userSettingsRoute.post('/user_settings/:userId', UserSettingsController.update);

export default userSettingsRoute;