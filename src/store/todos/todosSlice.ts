import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { Category } from '../../types/types.ts';

import { todosInitialState } from '../initialState.ts';

import { addAsyncBuilderCases } from '../utils.ts';
import { refreshTodosData } from './todosActions.ts';

export const todosEntitySlice = createSlice({
    name: 'todos',
    initialState: todosInitialState,
    reducers: {
        setCurrentCategory: (state, action: PayloadAction<Category>) => {
            state.currentCategory = action.payload;
        },
    },
    extraReducers(builder) {
        addAsyncBuilderCases(builder, refreshTodosData, "asyncData");
    }
});

export const todosActions = todosEntitySlice.actions;
export default todosEntitySlice.reducer;