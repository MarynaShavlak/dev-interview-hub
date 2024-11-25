import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const uploadImageThunk = createAsyncThunk<
    string,
    File,
    ThunkConfig<string>
>('image/upload', async (file: File, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;
    const { firebaseStorage } = extra;
    if (!firebaseStorage) {
        return rejectWithValue('Firebase storage is not initialized');
    }
    try {
        const safeFileName = encodeURIComponent(file.name);
        const uniqueFilePath = `images/users/${safeFileName}_${v4()}`;
        const imageRef = ref(firebaseStorage, uniqueFilePath);
        const uploadResult = await uploadBytes(imageRef, file);
        const { fullPath } = uploadResult.metadata;
        const pathReference = ref(firebaseStorage, fullPath);
        const url = await getDownloadURL(pathReference);
        return url;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'Failed to upload image';
        return rejectWithValue(errorMessage);
    }
});
