export type Category = 'all' | 'inWork' | 'completed';

export interface TodoRequest {
    title: string;
    isDone: boolean;
}

export interface Todo {
    id: number;
    title: string;
    created: string;
    isDone: boolean;
}

export interface TodoInfo {
    all: number
    completed: number
    inWork: number
}

export interface MetaResponse<T, N> {
    data: T[]
    info?: N
    meta: {
        totalAmount: number
    }
}

export interface ErrorInfo {
    isActiveError: boolean;
    message: string;
}

export interface UserRegistrationData {
    login: string;
    username: string;
    password: string;
    repeatedPassword?: string;
    email: string;
    phoneNumber: string;
}

export interface AuthData {
    login: string;
    password: string;
}

export interface Profile {
    id: number;
    username: string;
    email: string;
    date: string;
    isBlocked: boolean;
    roles: Role[];
    phoneNumber: string;
}

export interface Tokens {
    accessToken: string
    refreshToken: string
}

export type Role = 'ADMIN' | 'USER' | 'MODERATOR';

export type AsyncStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected';



export interface UserFilters {
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    isBlocked?: boolean;
    limit?: number;  // сколько на странице
    page?: number;  // страницу
}


export interface UsersMetaResponse<T> {
    data: T[]
    meta: {
        totalAmount: number;
        sortBy: string;
        sortOrder: 'asc' | 'desc';
    }
}

export interface UserRolesRequest {
    roles: Role[]
}

export interface UserRequest {
    username?: string;
    email?: string;
    phoneNumber?: string;
}




