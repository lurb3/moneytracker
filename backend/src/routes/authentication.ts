import { Router } from 'express';
import { UserAuthenticationController } from '../controllers/UserAuthenticationController';
import verifyToken from '../middleware/authentication';
import validateSchema from '../middleware/validateSchema';
import userSchema from '../schemas/userSchema';

const userAuthenticationRoute = Router();

userAuthenticationRoute.post('/register', validateSchema(userSchema), UserAuthenticationController.create);
userAuthenticationRoute.post('/login', UserAuthenticationController.signin);
userAuthenticationRoute.get('/current', verifyToken, UserAuthenticationController.getMe);

export default userAuthenticationRoute;