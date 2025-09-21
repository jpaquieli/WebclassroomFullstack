import { User } from '@/entities/interface/userEntity';
import { ICreateUserRepository } from '@/repositories/interface/createUserRepository';
import { IFindUserByUsernameRepository } from '@/repositories/interface/findUserByUsername';
import { UserAlreadyExistsError } from './errors/userAlreadyExistsError';

export class CreateUserUseCase {
  constructor(private createUserRepository: ICreateUserRepository,
    private findUserByUsernameRepository: IFindUserByUsernameRepository
  ) {}

  async handler(user: User): Promise<User | undefined> {
    const existingUser = await this.findUserByUsernameRepository.findByUsername(user.username);

    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    return this.createUserRepository.create(user);
  }
}