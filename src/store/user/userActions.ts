import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserProfile } from '../../api/https.ts';
import type { Profile } from '../../types/types.ts';
import type { SliceMethod } from '../../types/async.ts';


export const getProfile: SliceMethod<Profile, string> = createAsyncThunk<Profile, string>('user/getProfile', async (accessToken, { rejectWithValue }) => {
    try {
        return await fetchUserProfile(accessToken);
    } catch (e) {
        return rejectWithValue(e as string)
    }
});

