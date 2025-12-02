import type { MetaResponse, Todo, Category, TodoInfo, TodoRequest } from '../types/types';

import axios from 'axios';

//Точно не знаю как правильно инстансы называть =(
const todosApi = axios.create({
    baseURL: 'https://easydev.club/api/v1'
});

export async function fetchTodosData(category: Category): Promise<MetaResponse<Todo, TodoInfo>> {

    try {
        const response = await todosApi.get('/todos', {
            params: {
                filter: category
            }
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Не удалось получить записи списка задач по категории  / ${error}`);
    }
}


// TODO изучить что такое .then
export async function createNewItem(todoRequest: TodoRequest): Promise<Todo> {

    try {
        const response = await todosApi.post('/todos', todoRequest);
        return response.data;
    }
    catch (error) {
        throw new Error(`Не удалось создать новую задачу / ${error}`);
    }
}


export async function editItem(id: number, todoRequest: TodoRequest): Promise<Todo> {

    try {
        // По идее это не квери параметр, так что оставил url в строке
        const response = await todosApi.put(`/todos/${id}`, todoRequest);
        return response.data;
    }
    catch (error) {
        throw new Error(`Не удалось отредактировать запись / ${error}`);
    }
}


export async function deleteItem(id: number): Promise<Response> {

    try {
        // По идее это не квери параметр, так что оставил url в строке
        const response = await todosApi.delete(`/todos/${id}`);
        return response.data;
    }
    catch (error) {
        throw new Error(`Не удалось удалить запись / ${error}`);
    }
}

