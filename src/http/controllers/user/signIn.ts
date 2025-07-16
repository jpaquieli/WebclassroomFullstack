import { InvalidCredentialsError } from '@/useCases/errors/invalidCredentialsError';
import { makeSigninUseCase } from '@/useCases/factory/makeSignInUseCase';
import { compare } from 'bcryptjs';
import { Request, Response } from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { env } from '@/env';

export async function signin(req: Request, res: Response) {
  const registerBodySchema = z.object({
    username: z.string(),
    password: z.string(),
  });

  const { username, password } = registerBodySchema.parse(req.body);

  const signinUseCase = makeSigninUseCase();

  const user = await signinUseCase.handler(username);

  const doestPasswordMatch = await compare(password, user.password);

  if (!doestPasswordMatch) {
    throw new InvalidCredentialsError();
  }

  const token = jwt.sign({ username }, env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(200).json({ token });
}