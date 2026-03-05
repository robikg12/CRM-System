import type { RootState } from '../index.ts';

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { MetaResponse, Todo, TodoInfo, AsyncStatus, Category } from '../../types/types.ts';

import { refreshTodosData, createTodo, editTodo, deleteTodo } from './todosActions.ts';


const initialState: {
    todos: MetaResponse<Todo, TodoInfo>;
    currentCategory: Category;
    status: AsyncStatus;
    error: {
        message: string | null;
        count: number;
    }

} = {
    todos: {
        data: [],
        info: {
            all: 0,
            inWork: 0,
            completed: 0,
        },
        meta: {
            totalAmount: 0
        },

    },
    currentCategory: 'all',
    status: 'idle',
    error: {
        message: null,
        count: 0
    }
}

export const todosEntitySlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setCurrentCategory: (state, action: PayloadAction<Category>) => {
            state.currentCategory = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(refreshTodosData.pending, (state) => {
            state.status = 'pending';
        })
            .addCase(refreshTodosData.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error.message = null;
                state.todos = action.payload;
            })
            .addCase(refreshTodosData.rejected, (state, action) => {
                state.status = 'rejected';
                if (action.payload) {
                    state.error.message = action.payload;
                    state.error.count++;
                }
            });



        builder.addCase(createTodo.pending, (state) => {
            state.status = 'pending';
        })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error.message = null;
                state.todos = action.payload;
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.status = 'rejected';
                if (action.payload) {
                    state.error.message = action.payload;
                    state.error.count++;
                }
            });


        builder.addCase(editTodo.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.todos = action.payload;
        })
            .addCase(editTodo.rejected, (state, action) => {
                state.status = 'rejected';
                if (action.payload) {
                    state.error.message = action.payload;
                    state.error.count++;
                }
            });



        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.todos = action.payload;
        })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.status = 'rejected';
                if (action.payload) {
                    state.error.message = action.payload;
                    state.error.count++;
                }
            })
    }
});

export const selectTodoInfo = (state: RootState) => state.todos.todos.info;

export const todosActions = todosEntitySlice.actions;
export default todosEntitySlice.reducer;