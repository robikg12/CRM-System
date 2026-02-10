import type { ErrorInfo } from './types.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';


export interface IAsyncParticle<T> {
    data: T | null;
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    error: ErrorInfo | null;
    errorCounter: number;
}

export type TSliceMethod<Response = unknown, Request = void> = ReturnType<
    typeof createAsyncThunk<Response, Request>
>;

export interface IAsyncDataStatus {
    hasError: boolean;
    isIdle: boolean;
    isLoading: boolean;
    isLoadingOrIdle: boolean;
    isLoaded: boolean;
    isLoadedOrError: boolean;
}