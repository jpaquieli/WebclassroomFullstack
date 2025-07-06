import { database } from "@/lib/pg/db";
import { IDeletePostRepository } from "../interface/deletePostInterfaceRepository";

export class DeletePostRepository implements IDeletePostRepository {
    async delete(id: number): Promise<void> {
        const result = await database.clientInstance?.query(
            'DELETE FROM post WHERE id = $1',
            [id]
        )
    }
}