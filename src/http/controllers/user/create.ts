import { makeCreateUserUseCase } from '@/useCases/factory/makeCreateUserUseCase';
import { hash } from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Deixa explícito o tipo para o TS
export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const registerBodySchema = z.object({
      username: z.string(),
      password: z.string(),
      role: z
        .string()
        .transform((val) => val.toLowerCase())
        .refine((val) => val === 'professor' || val === 'aluno', {
          message: 'Role deve ser do tipo professor ou aluno',
        }),
    });

    const parseResult = registerBodySchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        message: 'Erro de validação',
        issues: parseResult.error.errors.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        })),
      });
      return;
    }

    const { username, password, role } = parseResult.data;

    const hashedPassword = await hash(password, 8);

    const createUserUseCase = makeCreateUserUseCase();

    const user = await createUserUseCase.handler({ username, password: hashedPassword, role });

    res.status(200).send(`Usuário ${user?.username} criado.`);
  } catch (error) {
    // Captura erros inesperados e passa para o middleware de erro do Express
    next(error);
  }
};