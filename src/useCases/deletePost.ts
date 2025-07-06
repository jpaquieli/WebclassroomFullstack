import { IDeletePostRepository } from "@/repositories/interface/deletePostInterfaceRepository";

export class DeletePostUseCase {
    constructor(private createPostRepository: IDeletePostRepository) {}

    async handler(id: number): Promise<void> {
        return this.createPostRepository.delete(id)
    }
}