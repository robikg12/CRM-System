import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { Todo, TodoInfo, MetaResponse, Category } from '../types/types.ts';


interface Todos {
    currentCategory: Category;
    todosData: MetaResponse<Todo, TodoInfo>;
}




const initialState: Todos = {
    currentCategory: 'all',
    todosData: {
        data: [],
        info: {
            all: 0,
            inWork: 0,
            completed: 0
        },
        meta: {
            totalAmount: 0
        }
    }
}

export const todosEntitySlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setCurrentCategory: (state, action: PayloadAction<Category>) => {
            state.currentCategory = action.payload;
        },
        setTodosData: (state, action: PayloadAction<MetaResponse<Todo, TodoInfo>>) => {
            state.todosData = action.payload;
        }
    }
});

export const todosActions = todosEntitySlice.actions;
export default todosEntitySlice.reducer;