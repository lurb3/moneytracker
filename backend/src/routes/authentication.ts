import { Router } from 'express';
import { UserAuthenticationController } from '../controllers/UserAuthenticationController';

const userAuthenticationRoute = new Router();

userAuthenticationRoute.post('/register', UserAuthenticationController.signup);
userAuthenticationRoute.post('/login', UserAuthenticationController.signin);

export default userAuthenticationRoute;