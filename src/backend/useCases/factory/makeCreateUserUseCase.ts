import { CreateUserRepository } from '@/repositories/pg/createUserRepository';
import { FindUserByUsernameRepository } from '@/repositories/pg/findUserByUsernameRepository'; // importe seu outro repo
import { CreateUserUseCase } from '../createUser';

export function makeCreateUserUseCase() {
  const createUserRepository = new CreateUserRepository();
  const findUserByUsernameRepository = new FindUserByUsernameRepository();

  const createUserUseCase = new CreateUserUseCase(
    createUserRepository,
    findUserByUsernameRepository
  );

  return createUserUseCase;
}