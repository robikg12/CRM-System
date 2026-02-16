import { fetchTodosData } from '../../api/https.ts';

import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../index.ts';

import type { SliceMethod } from '../../types/async.ts';
import type { MetaResponse, Todo, TodoInfo } from '../../types/types.ts';


export const refreshTodosData: SliceMethod<MetaResponse<Todo, TodoInfo>, undefined> = createAsyncThunk<MetaResponse<Todo, TodoInfo>, undefined>('todos/refreshData', async (_, thunkAPI) => {

    const state = thunkAPI.getState() as RootState;
    const currentCategory = state.todos.currentCategory;
    try {
        return await fetchTodosData(currentCategory);
    } catch (e) {
        return thunkAPI.rejectWithValue(e as string)
    }
});
