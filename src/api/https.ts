import axios, { isAxiosError } from 'axios';

import type {
    MetaResponse, Todo, Category, TodoInfo,
    TodoRequest, UserRegistrationData,
    Profile, AuthData, Tokens
} from '../types/types';


export const apiClient = axios.create({
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
        throw `Не удалось получить записи списка задач по категории`;
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

export async function registerNewUser(registrationData: UserRegistrationData): Promise<Profile> {

    try {

        const response = await apiClient.post('/auth/signup', registrationData);
        return response.data;
    }

    catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.status === 400) {
                throw 'Invalid input'
            }
            if (error.response?.status === 409) {
                throw 'User already exist.'
            }
            if (error.response?.status === 500) {
                throw 'Server error /Internal error.'
            }
        }
        throw 'Error =/'
    }
}

export async function userAuthentication(authData: AuthData): Promise<Tokens> {

    try {
        const response = await apiClient.post('/auth/signin', authData);
        return response.data;
    }

    catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.status === 400) {
                throw 'Incorrect login or password'
            }
            if (error.response?.status === 401) {
                throw 'Invalid credentials.'
            }
            if (error.response?.status === 500) {
                throw 'Server error /Internal error.'
            }
        }
        throw 'Error =/'
    }

}

export async function fetchUserProfile(accessToken: string): Promise<Profile> {

    try {
        const response = await apiClient.get('/user/profile', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    }
    catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.status === 401 || error.response?.status === 400) {
                throw 'ACCESS-TOKEN-EXPIRED'
            }
            if (error.response?.status === 500) {
                throw 'Server side error'
            }
        }
        throw 'Error'
    }
}

export async function refreshTokens(refreshToken: string): Promise<Tokens> {

    try {
        const response = await apiClient.post('/auth/refresh', { refreshToken: refreshToken });
        return response.data;
    }
    catch (error) {

        if (isAxiosError(error)) {
            if (error.response?.status === 401 || error.response?.status === 400) {
                throw 'REFRESH-TOKEN-EXPIRED'
            }
            if (error.response?.status === 500) {
                throw 'Server side error'
            }
        }
        throw 'Error'
    }
}
export async function userLogout(accessToken: string) {

    try {
        await apiClient.post('/user/logout', {}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
    }
    catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.status === 401) {
                throw 'User context not found.'
            }
            if (error.response?.status === 500) {
                throw 'Internal error.'
            }
        }
        throw 'Error =/'
    }
}





