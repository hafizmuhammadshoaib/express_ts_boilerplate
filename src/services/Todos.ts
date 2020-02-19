import { getConnection } from 'typeorm';
import { Todo } from '../entity'
import { ITodoUpdate } from 'src/inputs/TodoInputs';
export function addTodo(title: string, item: string) {
    const todoitemRepo = getConnection().getRepository(Todo);
    return todoitemRepo.save(todoitemRepo.create({
        item,
        title
    }))

}

export function getAllTodos(page: number, perPage: number) {
    const todoitemRepo = getConnection().getRepository(Todo);
    return todoitemRepo.find({ skip: ((perPage * page) - perPage), take: perPage });
}

export function updateTodo(payload: ITodoUpdate) {

    const todoitemRepo = getConnection().getRepository(Todo);
    return todoitemRepo.update(payload.id, { ...payload });
}

export function deleteTodo(id: number) {
    const todoitemRepo = getConnection().getRepository(Todo);
    return todoitemRepo.delete(id);

}
export function getCount() {
    const todoitemRepo = getConnection().getRepository(Todo);
    return todoitemRepo.count();
}