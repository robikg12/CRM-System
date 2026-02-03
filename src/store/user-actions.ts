import { createAsyncThunk } from '@reduxjs/toolkit';


import { getUserProfile, refreshAccessToken } from '../api/https.ts';


export const getProfile = createAsyncThunk('getProfile', async (_, thunkApi) => {


    let accessToken = localStorage.getItem('accessToken');
    let refreshToken = localStorage.getItem('refreshToken');



    if (!accessToken || !refreshToken) {
        return thunkApi.rejectWithValue('denied');
    }
    try {
        const profile = await getUserProfile(accessToken);
        return profile;
    }
    catch (error: any) {
        if (error.response?.status !== 401) {
            return thunkApi.rejectWithValue('Непонятная ошибка');
        }

        try {
            const tokens = await refreshAccessToken(refreshToken);

            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);
            const profile = await getUserProfile(tokens.accessToken);
            return profile;
        }
        catch (error: any) {
            if (error.response?.status === 401) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                return thunkApi.rejectWithValue('denied');
            }
        }
    }
});






// export const getProfile = createAsyncThunk<Profile | 'denied' | undefined>(
//     'getProfile',
//     async () => {

//         try {
//             const accessToken = localStorage.getItem('accessToken');
//             const refreshToken = localStorage.getItem('refreshToken');

//             if (!refreshToken || !accessToken) {
//                 localStorage.removeItem('accessToken');
//                 localStorage.removeItem('refreshToken');
//                 return 'denied';
//             }

//             const profileData = await fetchProfile(accessToken);
//             if (profileData === 'ACCESS-TOKEN-EXPIRED') {

//                 const refreshedTokens = await refreshTokens(refreshToken);
//                 if (refreshedTokens === 'REFRESH-TOKEN-EXPIRED') {
//                     localStorage.removeItem('accessToken');
//                     localStorage.removeItem('refreshToken');
//                     return 'denied';
//                 }
//                 if (typeof refreshedTokens === 'object') {
//                     localStorage.setItem('accessToken', refreshedTokens.accessToken);
//                     localStorage.setItem('refreshToken', refreshedTokens.refreshToken);

//                     const newProfileData = await fetchProfile(refreshedTokens.accessToken);
//                     if (typeof newProfileData === 'object') {
//                         return newProfileData;
//                     }
//                 }
//             }
//             else (typeof profileData === 'object') {
//                 return profileData;
//             }
//         }
//         catch (error) {

//         }
//     }
// );
