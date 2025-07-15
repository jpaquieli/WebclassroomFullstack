import { IUser } from '@/entities/models/userInterface';

export interface ICreateUserRepository {
  create(user: IUser): Promise<IUser | undefined>
}