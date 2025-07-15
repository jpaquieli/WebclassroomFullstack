import { User } from '@/entities/interface/userEntity';
import { ICreateUserRepository } from '@/repositories/interface/createUserRepository';

export class CreateUserUseCase {
  constructor(private userRepository: ICreateUserRepository) {}

  async handler(user: User): Promise<User | undefined> {
    return this.userRepository.create(user);
  }
}