import { Router } from "express";
import { findAll } from './findAll';
import { create } from "./create";
import { findById } from "./findById";

const router = Router();

router.post('/post', create);
router.get('/post', findAll);
router.get('/post/:id', findById)

export default router;