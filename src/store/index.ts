import { configureStore } from '@reduxjs/toolkit';

import todosReducer from './todos/todosSlice.ts';
import userReducer from './user/userSlice.ts'

export const store = configureStore({
    reducer: {
        todos: todosReducer,
        user: userReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;