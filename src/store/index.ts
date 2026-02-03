import { configureStore } from '@reduxjs/toolkit';

import todosReducer from './todos-slice.ts';
import uiReducer from './ui-slice.ts';
import userReducer from './user-slice.ts'

export const store = configureStore({
    reducer: {
        todos: todosReducer,
        ui: uiReducer,
        user: userReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;