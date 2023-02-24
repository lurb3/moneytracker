import { Router } from 'express';
import { UserAuthentication } from '../controllers/UserAuthentication';

const userAuthenticationRoute = new Router();
userAuthenticationRoute.post('/register', UserAuthentication.signup);
userAuthenticationRoute.post('/login', UserAuthentication.signin);

export default userAuthenticationRoute;