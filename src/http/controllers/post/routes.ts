import { Router } from 'express';
import { findAll } from './findAll';
import { create } from './create';
import { findById } from './findById';
import { deletePost } from './delete';
import { search } from './search';
import { edit } from './edit';

const postRouter = Router();

postRouter.post('/post', create);
postRouter.get('/post', findAll);
postRouter.get('/post/search', search);
postRouter.get('/post/:id', findById);
postRouter.put('/post/:id', edit);
postRouter.delete('/post/:id', deletePost);

export default postRouter;