import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from '@reduxjs/toolkit';
import type { ErrorInfo } from "../../types/types.ts";

interface uiState {
    isLoading: boolean;
    errorInfo: ErrorInfo;
    authErrorInfo: ErrorInfo;
};

const initialState: uiState = {
    isLoading: true,
    errorInfo: {
        isActiveError: false,
        message: ''
    },
    authErrorInfo: {
        isActiveError: false,
        message: ''
    }
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setErrorInfo: (state, action: PayloadAction<ErrorInfo>) => {
            state.errorInfo = action.payload;
        },
        setAuthErrorInfo: (state, action: PayloadAction<ErrorInfo>) => {
            state.authErrorInfo = action.payload;
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;