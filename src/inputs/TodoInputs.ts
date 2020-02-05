export interface ITodoInsert {
    item: string,
    title: string
}
export interface ITodoUpdate {
    id: number,
    item?: string,
    title?: string
}
export interface ITodoDelete {
    id: number
}