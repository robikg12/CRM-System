import { fetchTodos, createNewItem, editItem, deleteItem } from '../../api/https.ts';

import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../index.ts';

import type { MetaResponse, Todo, TodoInfo, TodoRequest } from '../../types/types.ts';


export const refreshTodosData = createAsyncThunk<MetaResponse<Todo, TodoInfo>, undefined, { rejectValue: string }>('todos/refreshData', async (_, thunkAPI) => {

    const state = thunkAPI.getState() as RootState;
    const currentCategory = state.todos.currentCategory;
    try {
        return await fetchTodos(currentCategory);
    } catch (e) {
        return thunkAPI.rejectWithValue('Не удалось получить записи');
    }
});

export const createTodo = createAsyncThunk<MetaResponse<Todo, TodoInfo>, TodoRequest, { rejectValue: string }>('todos/createTodo', async (todoRequest, thunkAPI) => {

    const state = thunkAPI.getState() as RootState;
    const currentCategory = state.todos.currentCategory;
    try {
        await createNewItem(todoRequest);
        return await fetchTodos(currentCategory);
    }
    catch (e) {
        return thunkAPI.rejectWithValue('Не удалось создать запись');
    }
});

export const editTodo = createAsyncThunk<MetaResponse<Todo, TodoInfo>, { id: number, request: TodoRequest }, { rejectValue: string }>('todos/editTodo', async (todo, thunkAPI) => {

    const state = thunkAPI.getState() as RootState;
    const currentCategory = state.todos.currentCategory;
    try {
        await editItem(todo.id, todo.request);
        return await fetchTodos(currentCategory);
    }
    catch (e) {

        return thunkAPI.rejectWithValue('Не удалось отредактировать запись');
    }
});

export const deleteTodo = createAsyncThunk<MetaResponse<Todo, TodoInfo>, number, { rejectValue: string }>('todos/deleteTodo', async (todoId, thunkAPI) => {

    const state = thunkAPI.getState() as RootState;
    const currentCategory = state.todos.currentCategory;
    try {
        await deleteItem(todoId);
        return await fetchTodos(currentCategory);
    }
    catch (e) {

        return thunkAPI.rejectWithValue('Не удалось удалить запись');
    }
});