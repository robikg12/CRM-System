import type { MetaResponse, Todo, Category, TodoInfo, TodoRequest } from '../types/types';



const baseUrl: string = 'https://easydev.club/api/v1/todos';


export async function fetchTodosData(category: Category): Promise<MetaResponse<Todo, TodoInfo> | never> {

    const params = {
        filter: category
    };
    const queryParams = new URLSearchParams(params);

    const response = await fetch(`${baseUrl}?${queryParams}`);
    const resData = await response.json();
    if (!response.ok) {
        throw new Error('Не удалось получить записи списка задач по категории');
    }

    return resData;
}


// TODO изучить что такое .then
export async function createNewItem(todoRequest: TodoRequest): Promise<Todo | never> {

    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todoRequest)
    });
    const resData = await response.json();
    if (!response.ok) {
        throw new Error('Не удалось создать новую задачу');
    }
    return resData;
}

export async function editItem(id: number, todoRequest: TodoRequest): Promise<Todo | never> {

    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todoRequest)
    });
    const resData = await response.json();
    if (!response.ok) {
        throw new Error('Не удалось отредактировать запись');
    }
    return resData;
}


export async function deleteItem(id: number): Promise<Response | never> {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });


    if (!response.ok) {
        throw new Error('Не удалось удалить запись');
    }

    return response;
}

