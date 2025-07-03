import { Router } from "express";
import { findAll } from './findAll';
import { create } from "./create";

const router = Router();

router.post('/post', create);
router.get('/post', findAll);

export default router;