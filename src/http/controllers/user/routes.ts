import { Router } from 'express';
import { create } from './create';
import { signin } from './signIn';

const userRouter = Router();

userRouter.post('/user', create);
userRouter.post('/user/signin', signin);

export default userRouter;