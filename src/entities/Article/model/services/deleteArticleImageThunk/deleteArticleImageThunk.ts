import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, deleteObject } from 'firebase/storage';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getImagePathFromUrl } from '@/shared/lib/firestore/getImagePathFromUrl/getImagePathFromUrl';

export const deleteArticleImageThunk = createAsyncThunk<
    void,
    string,
    ThunkConfig<string>
>('image/delete', async (imagePath: string, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;
    const { firebaseStorage } = extra;

    if (!firebaseStorage) {
        return rejectWithValue('Firebase storage is not initialized');
    }

    try {
        const decodedPath = getImagePathFromUrl(imagePath);
        const imageRef = ref(firebaseStorage, decodedPath);
        await deleteObject(imageRef);
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'Failed to delete image';
        return rejectWithValue(errorMessage);
    }
});
