import express from 'express';
import createRoute  from './http/routes/post/createRoute'
import findAllRoute from './http/routes/post/findAllRoute';

export const app = express();

app.use(express.json());
app.use('/v1', createRoute);
app.use('/v1', findAllRoute)