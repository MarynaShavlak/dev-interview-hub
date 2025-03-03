import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { uploadImage } from '@/shared/lib/firestore';

export const uploadUserProfileImageThunk = createAsyncThunk<
    string,
    File,
    ThunkConfig<string>
>('profile/uploadUserProfileImag', async (file: File, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;
    const { firebaseStorage } = extra;
    if (!firebaseStorage) {
        return rejectWithValue('Firebase storage is not initialized');
    }
    try {
        return await uploadImage(file, 'users', firebaseStorage);
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'Failed to upload image';
        return rejectWithValue(errorMessage);
    }
});
