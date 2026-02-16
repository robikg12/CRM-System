import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { userInitialState } from "../initialState.ts";

import { addAsyncBuilderCases } from "../utils.ts";

import { getProfile } from "./userActions.ts";



export const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        setIsAuthorized: (state, action: PayloadAction<boolean>) => {
            state.isAuthorized = action.payload;
        },
        setIdleStatus: (state) => {
            state.asyncData.status = 'idle';
        }
    },
    extraReducers(builder) {
        addAsyncBuilderCases(builder, getProfile, "asyncData")
    }
});







export const userActions = userSlice.actions;
export default userSlice.reducer;