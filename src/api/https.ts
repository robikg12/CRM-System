import type { MetaResponse, Todo, Category, TodoInfo, TodoRequest } from '../types/types';

import axios from 'axios';

axios.defaults.baseURL = 'https://easydev.club/api/v1'


export async function fetchTodosData(category: Category): Promise<MetaResponse<Todo, TodoInfo>> {

    try {
        const response = await axios.get('/todos', {
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
        const response = await axios.post('/todos', todoRequest);
        return response.data;
    }
    catch (error) {
        throw new Error(`Не удалось создать новую задачу / ${error}`);
    }
}


export async function editItem(id: number, todoRequest: TodoRequest): Promise<Todo> {

    try {
        const response = await axios.put(`/todos/${id}`, todoRequest);
        return response.data;
    }
    catch (error) {
        throw new Error(`Не удалось отредактировать запись / ${error}`);
    }
}


export async function deleteItem(id: number): Promise<Response> {

    try {
        const response = await axios.delete(`/todos/${id}`);
        return response.data;
    }
    catch (error) {
        throw new Error(`Не удалось удалить запись / ${error}`);
    }
}

