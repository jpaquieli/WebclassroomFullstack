import { database } from "@/lib/pg/db";
import { IPost } from "@/entities/models/postInterface";
import { ICreatePostRepository } from "../interface/createPostRepositoryInterface";

export class CreatePostRepository implements ICreatePostRepository {
    async create ({    
        title,
        content,
        dateTime,
        author,
    }: IPost): Promise<IPost> {
        const result = await database.clientInstance?.query(
            'INSERT INTO post (title, content, dateTime, author) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, content, dateTime, author] 
        )

        return result?.rows[0]
    }
}