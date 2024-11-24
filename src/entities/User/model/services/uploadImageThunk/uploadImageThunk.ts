import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, uploadBytes } from 'firebase/storage';
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
        console.log('file', file);
        const uniqueFilePath = `images/users/${file.name}_${v4()}`;
        const imageRef = ref(firebaseStorage, uniqueFilePath);
        console.log('imageRef', imageRef);
        const result = await uploadBytes(imageRef, file);
        console.log('image uploaded');
        return imageRef.fullPath;
    } catch (error) {
        return rejectWithValue('Failed to upload image');
    }
});
