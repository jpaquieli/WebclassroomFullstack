import express from 'express';
import cors from 'cors';
import userRouter from './http/controllers/user/routes';
import postRouter from './http/controllers/post/routes';
import { validateJwt } from './http/middlewares/jwtValidate';

export const app = express();

// 🔧 Configura CORS corretamente para aceitar Authorization e Content-Type
app.use(
  cors({
    origin: 'http://localhost:5173', // URL do seu frontend
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Middleware para interpretar JSON
app.use(express.json());

// Rotas públicas antes do JWT
app.use('/v1', userRouter);

// Middleware de autenticação JWT
app.use(validateJwt);

// Rotas protegidas
app.use('/v1', postRouter);