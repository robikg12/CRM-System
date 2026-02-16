import type { Category, MetaResponse, Profile, Todo, TodoInfo } from "../types/types.ts";
import type { AsyncParticle } from "../types/async.ts";


export interface UserState {
    asyncData: AsyncParticle<Profile>;
    isAuthorized: boolean;
}

export const userInitialState: UserState = {
    asyncData: {
        data: null,
        error: null,
        errorCounter: 0,
        status: 'idle'
    },
    isAuthorized: false
};

export interface TodosState {
    asyncData: AsyncParticle<MetaResponse<Todo, TodoInfo>>,
    currentCategory: Category
}

export const todosInitialState: TodosState = {
    asyncData: {
        data: null,
        error: null,
        errorCounter: 0,
        status: 'idle'
    },
    currentCategory: 'all'
}