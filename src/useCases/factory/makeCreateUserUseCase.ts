import { CreateUserRepository } from '@/repositories/pg/createUserRepository';
import { CreateUserUseCase } from '../createUser';

export function makeCreateUserUseCase() {
  const createUserRepository = new CreateUserRepository();
  const createUserUseCase = new CreateUserUseCase(createUserRepository);

  return createUserUseCase;
}