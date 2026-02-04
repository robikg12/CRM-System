import { createAsyncThunk } from '@reduxjs/toolkit';

import { getUserProfile, refreshAccessToken } from '../api/https.ts';

import { uiActions } from './ui-slice.ts';

export const getProfile = createAsyncThunk('getProfile', async (_, thunkApi) => {


    let accessToken = localStorage.getItem('accessToken');
    let refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken || !refreshToken) {

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return thunkApi.rejectWithValue('denied');
    }

    const profileResponse = await getUserProfile(accessToken);
    if (typeof profileResponse === 'object') {
        return profileResponse;
    }
    else if (profileResponse === 'ACCESS-TOKEN-EXPIRED') {

        const tokenResponse = await refreshAccessToken(refreshToken);

        if (tokenResponse === 'REFRESH-TOKEN-EXPIRED') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

            return thunkApi.rejectWithValue('denied');
        }
        else if (typeof tokenResponse === 'object') {

            localStorage.setItem('accessToken', tokenResponse.accessToken);
            localStorage.setItem('refreshToken', tokenResponse.refreshToken);

            return 'relaunch' // Придумал хитрый способ, т.к в async thunk давольно
            //  сложно сделать рекурсию как понял, чтобы заново вызывался useEffect 
        }
        else {
            //Тут тоже, в этих двух местах ниже не стал просто возвращать rejectValue
            //  так как посмотрел, что вроде изменить значение стейста из другого слайса сложно.
            thunkApi.dispatch(uiActions.setErrorInfo({
                isActiveError: true,
                message: tokenResponse
            }));
            return thunkApi.rejectWithValue('error');
        }
    }
    else {
        thunkApi.dispatch(uiActions.setErrorInfo({
            isActiveError: true,
            message: profileResponse
        }));
        return thunkApi.rejectWithValue('error');
    }
});


