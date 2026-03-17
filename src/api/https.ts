import axios from 'axios';

import type {
    MetaResponse, Todo, Category, TodoInfo,
    TodoRequest,

    UserRegistrationData,
    Profile, AuthData, Tokens,

    UserFilters, UsersMetaResponse, User, UserRequest,
    Roles
} from '../types/types';

import { accessToken } from '../store/user/userActions';

export const apiClient = axios.create({
    baseURL: 'https://easydev.club/api/v1',
    headers: {
        'Content-Type': 'application/json',
    }
});



//Код не мой, тестирую
apiClient.interceptors.request.use(
    async (config) => {

        if (config.headers) {
            if (accessToken) {

                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



export async function fetchTodos(category: Category): Promise<MetaResponse<Todo, TodoInfo>> {

    const response = await apiClient.get('/todos', {
        params: {
            filter: category
        }
    });
    return response.data;
}


export async function createNewItem(todoRequest: TodoRequest): Promise<Todo> {

    const response = await apiClient.post('/todos', todoRequest);
    return response.data;
}


export async function editItem(id: number, todoRequest: TodoRequest): Promise<Todo> {

    const response = await apiClient.put(`/todos/${id}`, todoRequest);
    return response.data;
}


export async function deleteItem(id: number): Promise<void> {

    await apiClient.delete(`/todos/${id}`);
}

export async function registerNewUser(registrationData: UserRegistrationData): Promise<Profile> {
    const response = await apiClient.post('/auth/signup', registrationData);
    return response.data;
}

export async function userAuthentication(authData: AuthData): Promise<Tokens> {
    const response = await apiClient.post('/auth/signin', authData);
    return response.data;
}

export async function fetchUserProfile(): Promise<Profile> {

    const response = await apiClient.get('/user/profile');
    return response.data;
}


export async function refreshTokens(refreshToken: string): Promise<Tokens> {
    const response = await apiClient.post('/auth/refresh', { refreshToken: refreshToken });
    return response.data;
}

export async function userLogout() {
    await apiClient.post('/user/logout');
}

export async function fetchUsers(filterRequest: UserFilters): Promise<UsersMetaResponse<User>> {
    const response = await apiClient.get('/admin/users', {
        params: filterRequest
    });
    return response.data;
}

export async function fetchUser(userId: string): Promise<User> {
    const response = await apiClient.get(`/admin/users/${userId}`);
    return response.data;
}

export async function blockUser(userId: string): Promise<User> {
    const response = await apiClient.post(`/admin/users/${userId}/block`);
    return response.data;
}

export async function unblockUser(userId: string): Promise<User> {
    const response = await apiClient.post(`/admin/users/${userId}/unblock`)
    return response.data;
}

export async function updateUserProfile(userId: string, userData: UserRequest): Promise<User> {

    const response = await apiClient.put(`/admin/users/${userId}`, userData);
    return response.data;
}

export async function deleteUser(userId: string): Promise<void> {
    await apiClient.delete(`/admin/users/${userId}`);
}

export async function updateUserRoles(userId: string, roles: Roles[]): Promise<User> {

    const response = await apiClient.post(`/admin/users/${userId}/rights`, { roles: roles });
    return response.data;
}
