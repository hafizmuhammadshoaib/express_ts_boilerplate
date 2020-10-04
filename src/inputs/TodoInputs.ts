import { User } from 'src/entity';

export interface ITodoInsert {
    item: string,
    title: string,
}
export interface ITodoUpdate {
    id: number,
    item?: string,
    title?: string
}
export interface ITodoDelete {
    id: number
}
export interface ITodoSave {
    item: string,
    title: string,
    user: User
}