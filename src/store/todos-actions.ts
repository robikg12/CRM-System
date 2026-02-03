import { fetchTodosData } from '../api/https.ts';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { todosActions } from './todos-slice.ts';
import { uiActions } from './ui-slice.ts';
import type { RootState } from './index.ts';


export const refreshTodosData = createAsyncThunk(
    'refreshTodosData',
    async (_, thunkAPI) => {

        const state = thunkAPI.getState() as RootState;
        const currentCategory = state.todos.currentCategory;

        try {
            const resData = await fetchTodosData(currentCategory);
            thunkAPI.dispatch(todosActions.setTodosData(resData));
        }
        catch (error) {
            if (error instanceof Error) {
                thunkAPI.dispatch(uiActions.setErrorInfo({
                    isActiveError: true,
                    message: error.message
                }));
            }
        }
    }
);