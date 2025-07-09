import { Router } from 'express';
import { findAll } from './findAll';
import { create } from './create';
import { findById } from './findById';
import { deletePost } from './delete';
import { search } from './search';
import { edit } from './edit';

const router = Router();

router.post('/post', create);
router.get('/post', findAll);
router.get('/post/search', search);
router.get('/post/:id', findById);
router.put('/post/:id', edit);
router.delete('/post/:id', deletePost);

export default router;