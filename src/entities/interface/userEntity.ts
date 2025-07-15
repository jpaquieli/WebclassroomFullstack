import { IUser } from '../models/userInterface';

export class User implements IUser {
    id?: number | undefined;
    username: string;
    password: string;
    role: string;

constructor(username: string, password: string, role: string) {
    this.username = username;
    this.password = password;
    this.role = role;
 }
}