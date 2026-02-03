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

export interface UserRegistration {
    login: string;
    username: string; //подумать как перевести "логин"
    password: string;
    email: string;
    phoneNumber: string;
}

export interface AuthData {
    login: string;
    password: string;
}

export interface ClientSideUserRegistration extends UserRegistration {
    repeatedPassword: string;
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

export interface Token {
    accessToken: string
    refreshToken: string
}

export type Role = 'ADMIN' | 'USER' | 'MODERATOR';