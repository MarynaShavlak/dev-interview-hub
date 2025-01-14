import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const uploadArticleImageThunk = createAsyncThunk<
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
        const uniqueFilePath = `images/articles/${safeFileName}_${v4()}`;
        const imageRef = ref(firebaseStorage, uniqueFilePath);
        const uploadResult = await uploadBytes(imageRef, file);
        const { fullPath } = uploadResult.metadata;
        const pathReference = ref(firebaseStorage, fullPath);
        return rejectWithValue('');
        // return await getDownloadURL(pathReference);
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'Failed to upload image';
        return rejectWithValue(errorMessage);
    }
});
