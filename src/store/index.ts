import { configureStore } from '@reduxjs/toolkit';

import todosReducer from './todos/todosSlice.ts';
import uiReducer from './ui/uiSlice.ts';
import userReducer from './user/userSlice.ts'

export const store = configureStore({
    reducer: {
        todos: todosReducer,
        ui: uiReducer,
        user: userReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;