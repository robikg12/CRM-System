import type { TodosData, Todo } from '../types/types';



const baseUrl: string = 'https://easydev.club/api/v1/todos';


export async function fetchItems(category: string): Promise<TodosData | string> {

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
export async function createNewItem(title: string): Promise<Todo | string> {
    const newItem = { isDone: false, title: title };
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
    });
    const resData = await response.json();
    if (!response.ok) {
        throw new Error('Не удалось создать новую задачу');
    }
    return resData;
}

export async function editItem(id: number, status: boolean, title: string): Promise<Todo | string> {
    const editedItem = { isDone: status, title: title };
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedItem)
    });
    const resData = await response.json();
    if (!response.ok) {
        throw new Error('Не удалось отредактировать запись');
    }
    return resData;
}


export async function deleteItem(id: number) {
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

