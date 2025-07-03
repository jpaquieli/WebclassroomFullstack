import { Router } from "express";
import { findAll } from '../../controllers/post/findAll';

const router = Router();

router.get('/post', findAll);

export default router;