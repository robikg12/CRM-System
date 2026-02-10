import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserProfile } from '../../api/https.ts';
import type { Profile } from '../../types/types';
import type { TSliceMethod } from '../../types/async';


export const getProfile: TSliceMethod<Profile, string> = createAsyncThunk<Profile, string>('user/getProfile', async (accessToken, { rejectWithValue }) => {
    try {
        return await fetchUserProfile(accessToken);
    } catch (e) {
        return rejectWithValue(e as string)
    }
});


// export const getProfile = createAsyncThunk('getProfile', async (_, thunkApi) => {


//     const recursion = async () => {

//         const refreshToken = localStorage.getItem('refreshToken');

//         if (!refreshToken) {
//             localStorage.removeItem('refreshToken');
//             return thunkApi.rejectWithValue('denied');
//         }

//         if (!accessToken) {
//             const tokenResponse = await refreshAccessToken(refreshToken);

//             if (tokenResponse === 'REFRESH-TOKEN-EXPIRED') {
//                 localStorage.removeItem('refreshToken');

//                 return thunkApi.rejectWithValue('denied');
//             }
//             else if (typeof tokenResponse === 'object') {

//                 accessToken = tokenResponse.accessToken;
//                 localStorage.setItem('refreshToken', tokenResponse.refreshToken);

//                 return await recursion();
//             }
//             else {
//                 //Тут тоже, в этих двух местах ниже не стал просто возвращать rejectValue
//                 //  так как посмотрел, что вроде изменить значение стейта из другого слайса сложно.
//                 thunkApi.dispatch(uiActions.setErrorInfo({
//                     isActiveError: true,
//                     message: tokenResponse
//                 }));
//                 return thunkApi.rejectWithValue('error');
//             }
//         }

//         const profileResponse = await getUserProfile(accessToken);
//         if (typeof profileResponse === 'object') {
//             return profileResponse;
//         }
//         else if (profileResponse === 'ACCESS-TOKEN-EXPIRED') {

//         }
//         else {
//             thunkApi.dispatch(uiActions.setErrorInfo({
//                 isActiveError: true,
//                 message: profileResponse
//             }));
//             return thunkApi.rejectWithValue('error');
//         }
//     }
//     return await recursion();
// });

// export const logout = createAsyncThunk('logout', async (_, thunkApi) => {

//     const refreshToken = localStorage.getItem('refreshToken');

//     if (!refreshToken) {
//         thunkApi.dispatch(userActions.setIsAuthorized(false));
//         thunkApi.dispatch(uiActions.setErrorInfo({ isActiveError: true, message: 'Непонятная ошибка =/' }));
//         return
//     }

//     const tokenResponse = await refreshAccessToken(refreshToken);

//     if (tokenResponse === 'REFRESH-TOKEN-EXPIRED') {
//         localStorage.removeItem('refreshToken');
//         thunkApi.dispatch(userActions.setIsAuthorized(false));
//         thunkApi.dispatch(uiActions.setErrorInfo({ isActiveError: true, message: 'Refresh token expired' }));
//         return
//     }
//     if (typeof tokenResponse === 'string') {
//         thunkApi.dispatch(uiActions.setErrorInfo({ isActiveError: true, message: tokenResponse }));
//         return
//     }

//     const accessToken = tokenResponse.accessToken;
//     localStorage.setItem('refreshToken', tokenResponse.refreshToken);

//     const errorResponse = await userLogout(accessToken);

//     if (errorResponse) {
//         thunkApi.dispatch(uiActions.setErrorInfo({ isActiveError: true, message: errorResponse }));
//         return
//     }
//     localStorage.removeItem('refreshToken');
//     thunkApi.dispatch(userActions.setIsAuthorized(false));
// });

