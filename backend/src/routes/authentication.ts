import { Router } from 'express';
import userSchema from '../schemas/userSchema';
import validateSchema from '../middleware/validateSchema';
import { UserAuthenticationController } from '../controllers/UserAuthenticationController';

const userAuthenticationRoute = Router();

userAuthenticationRoute.post('/register', validateSchema(userSchema), UserAuthenticationController.create);
userAuthenticationRoute.post('/login', UserAuthenticationController.signin);

export default userAuthenticationRoute;