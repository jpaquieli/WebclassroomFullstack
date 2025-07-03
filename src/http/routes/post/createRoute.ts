import { Router } from "express";
import { create } from '../../controllers/post/create';

const router = Router();

router.post('/post', create);

export default router;