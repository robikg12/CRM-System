import type { ErrorInfo } from './types.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';


export interface AsyncParticle<T> {
    data: T | null;
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    error: ErrorInfo | null;
    errorCounter: number;
}

export type SliceMethod<Response = unknown, Request = void> = ReturnType<
    typeof createAsyncThunk<Response, Request>
>;

export interface AsyncDataStatus {
    hasError: boolean;
    isIdle: boolean;
    isLoading: boolean;
    isLoadingOrIdle: boolean;
    isLoaded: boolean;
    isLoadedOrError: boolean;
}