import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchUserProfile, refreshTokens, userAuthentication, registerNewUser, userLogout } from '../../api/https.ts';
import type { Profile, AuthData, UserRegistrationData } from '../../types/types.ts';

import { isAxiosError } from 'axios';

export let accessToken: string | null = null;


export const getProfile = createAsyncThunk<Profile, undefined, { rejectValue: string }>('user/getProfile', async (_, thunkAPI) => {
    try {
        return await fetchUserProfile();
    } catch (e) {
        if (isAxiosError(e)) {
            if (e.response?.status === 400) {
                return thunkAPI.rejectWithValue('Нет такого пользователя');
            }
            else if (e.response?.status === 500) {
                return thunkAPI.rejectWithValue('Серверная ошибка =/');
            }
        }
        return thunkAPI.rejectWithValue('Ошибка =/');
    }
});

export const checkAuth = createAsyncThunk<void, undefined, { rejectValue: string }>('user/checkAuth', async (_, thunkAPI) => {

    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
        //Тут поставил пустую строку, чтобы когда пользователь только зайдёт на сайт - то ему бы не показывало, что отсутствует рефреш токен
        return thunkAPI.rejectWithValue('');
    }

    try {
        const tokens = await refreshTokens(refreshToken);

        accessToken = tokens.accessToken;
        localStorage.setItem('refreshToken', tokens.refreshToken);

        await thunkAPI.dispatch(getProfile());
    }
    catch (e) {
        if (isAxiosError(e)) {
            if (e.response?.status === 400) {
                return thunkAPI.rejectWithValue('Ошибка связанная с json запросом');
            }
            if (e.response?.status === 401) {
                return thunkAPI.rejectWithValue('Токен истёк');
            }
            if (e.response?.status === 500) {
                return thunkAPI.rejectWithValue('Серверная ошибка');
            }
        }
        return thunkAPI.rejectWithValue('Ошибка =/');
    }
});

export const login = createAsyncThunk<void, AuthData, { rejectValue: string }>('user/login', async (authData, thunkAPI) => {

    try {
        const tokens = await userAuthentication(authData);
        accessToken = tokens.accessToken;
        localStorage.setItem('refreshToken', tokens.refreshToken);

    }
    catch (e) {
        if (isAxiosError(e)) {
            if (e.response?.status === 400) {
                return thunkAPI.rejectWithValue('Неверные данные =/');
            }
            if (e.response?.status === 401) {
                return thunkAPI.rejectWithValue('Неверные реквезиты для входа =/');
            }
            if (e.response?.status === 500) {
                return thunkAPI.rejectWithValue('Серверная ошибка');
            }
        }
        return thunkAPI.rejectWithValue('Ошибка =/');
    }
});

export const registration = createAsyncThunk<void, UserRegistrationData, { rejectValue: string }>('user/registration', async (registrationData, thunkAPI) => {

    try {
        delete registrationData.repeatedPassword;
        await registerNewUser(registrationData);
    }
    catch (e) {
        if (isAxiosError(e)) {
            if (e.response?.status === 400) {
                return thunkAPI.rejectWithValue('Неверные данные =/');
            }
            if (e.response?.status === 409) {
                return thunkAPI.rejectWithValue('Такой пользователь уже существует =/');
            }
            if (e.response?.status === 500) {
                return thunkAPI.rejectWithValue('Серверная ошибка');
            }
        }
        return thunkAPI.rejectWithValue('Ошибка =/');
    }
});

export const logout = createAsyncThunk<void, undefined, { rejectValue: string }>('user/logout', async (_, thunkAPI) => {

    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {

        localStorage.removeItem('refreshToken'); //а вдруг это пустая строка)
        accessToken = null;
        return thunkAPI.rejectWithValue('Токена нет =/');
    }

    try {
        const tokens = await refreshTokens(refreshToken);
        accessToken = tokens.accessToken;
        await userLogout();
        localStorage.removeItem('refreshToken');
        accessToken = null;
    }
    catch (e) {
        accessToken = null;
        localStorage.removeItem('refreshToken');
        if (isAxiosError(e)) {
            if (e.response?.status === 401) {
                return thunkAPI.rejectWithValue('Контекст пользователя не найден =/');
            }
            if (e.response?.status === 500) {
                return thunkAPI.rejectWithValue('Серверная ошибка =/');
            }
        }
        return thunkAPI.rejectWithValue('Ошибка =/');
    }
});
