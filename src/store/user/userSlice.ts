import { createSlice } from "@reduxjs/toolkit";

import type { Profile, AsyncStatus } from "../../types/types";

import { getProfile, checkAuth, login, registration, logout } from "./userActions";

const initialState: {
    profile: Profile;
    isAuthorized: boolean;
    status: AsyncStatus;
    authStatus: AsyncStatus;
    error: {
        message: string | null;
        count: number;
        // В общем, сделал ошибку как объект, чтобы, например,
        //  если несколько раз выпадет ошибка с таким же текстом,
        //  то заново приходило бы уведомление об ошибке, т.к будет новый объект

        //UPD: Не сработало) видимо redux понимает, что это одно и то же, добавлю тогда счётчик ошибок что-ли
    }
} = {
    profile: {
        id: 0,
        username: '',
        email: '',
        date: '',
        isBlocked: false,
        roles: [],
        phoneNumber: ''
    },
    isAuthorized: false,
    status: 'idle',
    authStatus: 'idle',
    error: {
        message: null,
        count: 0
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(getProfile.fulfilled, (state, action) => {
            // state.status = 'fulfilled';
            state.error.message = null;
            state.profile = action.payload;
            // Посмотреть ещё про isAuthorized
        })
            .addCase(getProfile.rejected, (state, action) => {
                // state.status = 'rejected';
                if (action.payload) {
                    state.error.message = action.payload;
                    state.error.count++;
                }
            });


        builder.addCase(checkAuth.pending, (state) => {
            state.status = 'pending';
        })
            .addCase(checkAuth.fulfilled, (state) => {
                state.isAuthorized = true;
                state.status = 'fulfilled';
                state.error.message = null;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.status = 'rejected';
                if (action.payload) {
                    state.error.message = action.payload;
                    state.error.count++;
                }
            });


        builder.addCase(login.pending, (state) => {
            state.authStatus = 'pending';
        })
            .addCase(login.fulfilled, (state) => {
                state.isAuthorized = true;
                state.authStatus = 'fulfilled';
                state.error.message = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.authStatus = 'rejected';
                if (action.payload) {
                    state.error.message = action.payload;
                    state.error.count++;
                }
            });


        builder.addCase(registration.pending, (state) => {
            state.authStatus = 'pending';
        })
            .addCase(registration.fulfilled, (state) => {
                state.authStatus = 'fulfilled';
                //Не стал записывать данные профиля, т.к по идее пользователь может просто зарегистрироваться, но не входить. 
                state.error.message = null;
            })
            .addCase(registration.rejected, (state, action) => {
                state.authStatus = 'rejected';
                if (action.payload) {
                    state.error.message = action.payload;
                    state.error.count++;
                }
            });

        builder.addCase(logout.pending, (state) => {
            // state.status = 'pending';
            state.authStatus = 'idle';
        })
            .addCase(logout.fulfilled, (state) => {
                state.isAuthorized = false;
                state.profile = initialState.profile;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isAuthorized = false;
                // state.status = 'rejected';
                state.profile = initialState.profile;
                if (action.payload) {
                    state.error.message = action.payload;
                }
                state.error.count++;
            })
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;