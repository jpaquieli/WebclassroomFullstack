import { makeCreateUserUseCase } from '@/useCases/factory/makeCreateUserUseCase';
import { hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function create(req: Request, res: Response) {
  const registerBodySchema = z.object({
    username: z.string(),
    password: z.string(),
    role: z.string()
  });

  const { username, password, role } = registerBodySchema.parse(req.body);

  const hashedPassword = await hash(password, 8);

  const userWithHashedPassword = { username, password: hashedPassword, role};

  const createUserUseCase = makeCreateUserUseCase();

  const user = await createUserUseCase.handler(userWithHashedPassword);

  res.status(201).send({ id: user?.id, username: user?.username, role: user?.role });
}