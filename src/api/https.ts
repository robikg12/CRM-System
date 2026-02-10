import axios, { isAxiosError } from 'axios';

import type {
    MetaResponse, Todo, Category, TodoInfo,
    TodoRequest, UserRegistration, ClientSideUserRegistration,
    Profile, AuthData, Token,
    ErrorInfo
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

export async function registerNewUser(registrationData: ClientSideUserRegistration): Promise<Profile | ErrorInfo> {

    try {
        const { login, username, password, email, phoneNumber } = registrationData;
        const registrationDataForRequest: UserRegistration = { login, username, password, email, phoneNumber };

        const response = await apiClient.post('/auth/signup', registrationDataForRequest);
        return response.data;
    }

    catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.status === 400) {
                return {
                    isActiveError: true,
                    message: `Invalid input`
                }
            }
            if (error.response?.status === 409) {
                return {
                    isActiveError: true,
                    message: `User already exist.`
                }
            }
            if (error.response?.status === 500) {
                return {
                    isActiveError: true,
                    message: `Server error /Internal error.`
                }
            }
        }
        return {
            isActiveError: true,
            message: `Error =/`
        }
    }
}

export async function userAuthentication(authData: AuthData): Promise<Token | ErrorInfo> {

    try {
        const response = await apiClient.post('/auth/signin', authData);
        return response.data;
    }

    catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.status === 400) {
                return {
                    isActiveError: true,
                    message: `Incorrect login or password`
                }
            }
            if (error.response?.status === 401) {
                return {
                    isActiveError: true,
                    message: `Invalid credentials.`
                }
            }
            if (error.response?.status === 500) {
                return {
                    isActiveError: true,
                    message: `Server error /Internal error.`
                }
            }
        }
        return {
            isActiveError: true,
            message: `Error =/`
        }
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

export async function refreshAccessToken(refreshToken: string): Promise<Token> {

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





