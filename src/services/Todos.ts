import { getConnection } from 'typeorm';
import { Todo } from '../entity'
import { ITodoUpdate, ITodoInsert, ITodoDelete } from 'src/inputs/TodoInputs';

export function addTodo(payload: ITodoInsert) {
    const todoitemRepo = getConnection().getRepository(Todo);
    return todoitemRepo.save(todoitemRepo.create(payload));

}

export function getAllTodos(page: number, perPage: number) {
    const todoitemRepo = getConnection().getRepository(Todo);
    return todoitemRepo.find({ skip: ((perPage * page) - perPage), take: perPage });
}

export function updateTodo(payload: ITodoUpdate) {

    const todoitemRepo = getConnection().getRepository(Todo);
    return todoitemRepo.update(payload.id, { ...payload });
}

export function deleteTodo(payload: ITodoDelete) {
    const todoitemRepo = getConnection().getRepository(Todo);
    return todoitemRepo.delete(payload.id);

}
export function getCount() {
    const todoitemRepo = getConnection().getRepository(Todo);
    return todoitemRepo.count();
}