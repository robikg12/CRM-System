import type { ActionReducerMapBuilder, Draft } from "@reduxjs/toolkit";

import type { AsyncParticle, SliceMethod, AsyncDataStatus } from "../types/async.ts";



//Здесь у меня постоянно выдовало ошибки, поэтому попросил Grok кое-как исправить =(

export const addAsyncBuilderCases = <State, RQ, RS>(
    builder: ActionReducerMapBuilder<State>,
    sliceMethod: SliceMethod<RQ, RS>,
    key: keyof State
) => {
    builder
        .addCase(sliceMethod.pending, (state: Draft<State>) => {
            (state as any)[key].status = 'pending';
        })
        .addCase(sliceMethod.fulfilled, (state: Draft<State>, action) => {
            const particle = (state as any)[key] as AsyncParticle<any>;
            particle.status = 'fulfilled';
            particle.errorCounter = 0;
            particle.data = action.payload;
        })
        .addCase(sliceMethod.rejected, (state: Draft<State>, action) => {
            const particle = (state as any)[key] as AsyncParticle<any>;
            particle.error = { isActiveError: true, message: action.payload as string };
            particle.errorCounter = (particle.errorCounter ?? 0) + 1;
            particle.status = 'rejected';
        });
};

// Хелпер для статуса асинхронных данных
// data - Асинхронные данные
export const getAsyncDataStatus = (data: AsyncParticle<unknown>): AsyncDataStatus => ({
    hasError: data?.status === 'rejected',
    isIdle: data?.status === 'idle',
    isLoading: data?.status === 'pending',
    isLoadingOrIdle: data?.status === 'pending' || data?.status === 'idle',
    isLoaded: data?.status === 'fulfilled',
    isLoadedOrError: data?.status === 'fulfilled' || data?.status === 'rejected'
});

