export interface IDeletePostRepository {
    delete(id: number): Promise<void>;
}