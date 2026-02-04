import { createSlice } from "@reduxjs/toolkit";

import type { Profile } from "../types/types.ts";
import { getProfile } from './user-actions.ts';

type FetchingStatus = 'idle' | 'loading' | 'denied' | 'good';

const initialState: { fetchingStatus: FetchingStatus, userProfile: Profile } = {
    fetchingStatus: 'idle',
    userProfile: {
        id: 0,
        username: '',
        email: '',
        date: '',
        isBlocked: false,
        roles: [],
        phoneNumber: ''
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setDeniedStatus: (state) => {
            state.fetchingStatus = 'denied';
        },
        setIdleStatus: (state) => { // Костыль, т.к если сделать логаут и сразу после этого войти,
            //  то страница перенаправится на авторизацию, т.к последнее состояние было 'denied'
            state.fetchingStatus = 'idle';
        }
    },
    extraReducers(builder) {
        builder.addCase(getProfile.pending, (state) => {
            state.fetchingStatus = 'loading';
        });
        builder.addCase(getProfile.fulfilled, (state, action) => {
            const response = action.payload;

            if (typeof response === 'object') {
                state.userProfile = response;
                state.fetchingStatus = 'good';
            }
            if (response === 'relaunch') {
                state.fetchingStatus = 'idle';
            }
        });
        builder.addCase(getProfile.rejected, (state, action) => {
            if (action.payload === 'denied') {
                state.fetchingStatus = 'denied';
            }
            else if (action.payload === 'error') {
                state.fetchingStatus = 'idle';
            }
        });
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;