import type { MetaResponse, Todo, Category, TodoInfo, TodoRequest } from '../types/types';

import axios from 'axios';


const apiClient = axios.create({
    baseURL: 'https://easydev.club/api/v1'
});

export async function fetchTodosData(category: Category): Promise<MetaResponse<Todo, TodoInfo>> {

    try {
        const response = await apiClient.get('/todos', {
            params: {
                filter: category
            }
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Не удалось получить записи списка задач по категории`);
    }
}


// TODO изучить что такое .then
export async function createNewItem(todoRequest: TodoRequest): Promise<Todo> {

    try {
        const response = await apiClient.post('/todos', todoRequest);
        return response.data;
    }
    catch (error) {
        throw new Error(`Не удалось создать новую задачу `);
    }
}


export async function editItem(id: number, todoRequest: TodoRequest): Promise<Todo> {

    try {
        // По идее это не квери параметр, так что оставил url в строке
        const response = await apiClient.put(`/todos/${id}`, todoRequest);
        return response.data;
    }
    catch (error) {
        throw new Error(`Не удалось отредактировать запись `);
    }
}


export async function deleteItem(id: number): Promise<void> {

    try {
        // По идее это не квери параметр, так что оставил url в строке
        await apiClient.delete(`/todos/${id}`);

    }
    catch (error) {
        throw new Error(`Не удалось удалить запись `);
    }
}

