import type { ActionReducerMapBuilder, Draft } from "@reduxjs/toolkit";

import type { IAsyncParticle, TSliceMethod, IAsyncDataStatus } from "../types/async.ts";



//Здесь у меня постоянно выдовало ошибки, поэтому попросил Grok кое-как исправить =(

export const addAsyncBuilderCases = <TState, RQ, RS>(
    builder: ActionReducerMapBuilder<TState>,
    sliceMethod: TSliceMethod<RQ, RS>,
    key: keyof TState
) => {
    builder
        .addCase(sliceMethod.pending, (state: Draft<TState>) => {
            (state as any)[key].status = 'pending';
        })
        .addCase(sliceMethod.fulfilled, (state: Draft<TState>, action) => {
            const particle = (state as any)[key] as IAsyncParticle<any>;
            particle.status = 'fulfilled';
            particle.errorCounter = 0;
            particle.data = action.payload;
        })
        .addCase(sliceMethod.rejected, (state: Draft<TState>, action) => {
            const particle = (state as any)[key] as IAsyncParticle<any>;
            particle.error = { isActiveError: true, message: action.payload as string };
            particle.errorCounter = (particle.errorCounter ?? 0) + 1;
            particle.status = 'rejected';
        });
};

// Хелпер для статуса асинхронных данных
// data - Асинхронные данные
export const getAsyncDataStatus = (data: IAsyncParticle<unknown>): IAsyncDataStatus => ({
    hasError: data?.status === 'rejected',
    isIdle: data?.status === 'idle',
    isLoading: data?.status === 'pending',
    isLoadingOrIdle: data?.status === 'pending' || data?.status === 'idle',
    isLoaded: data?.status === 'fulfilled',
    isLoadedOrError: data?.status === 'fulfilled' || data?.status === 'rejected'
});

