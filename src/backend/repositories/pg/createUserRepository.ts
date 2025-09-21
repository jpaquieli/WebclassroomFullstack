import { database } from '@/lib/pg/db';
import { ICreateUserRepository } from '../interface/createUserRepository';
import { IUser } from '@/entities/models/userInterface';

export class CreateUserRepository implements ICreateUserRepository {
public async create({
    username,
    password,
    role
  }: IUser): Promise<IUser | undefined> {
    const result = await database.clientInstance?.query<IUser>(
      'INSERT INTO "users" (username, password, role) VALUES ($1, $2, $3) RETURNING *',
      [username, password, role],
    );

    return result?.rows[0];
  }
}