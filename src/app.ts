import express from 'express';
import routes  from './http/controllers/post/routes'

export const app = express();

app.use(express.json());
app.use('/v1', routes);