import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, deleteObject } from 'firebase/storage';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
    getImagePathFromUrl,
    handleThunkErrorMessage,
} from '@/shared/lib/firestore';
import { ERROR_ARTICLE_MESSAGES } from '../../consts/errorArticleMessages';

export const deleteArticleImageThunk = createAsyncThunk<
    void,
    string,
    ThunkConfig<string>
>('article/deleteArticleImage', async (imagePath: string, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;
    const { firebaseStorage } = extra;

    if (!firebaseStorage) {
        return rejectWithValue(
            ERROR_ARTICLE_MESSAGES.FIREBASE_STORAGE_NOT_INITIALIZED,
        );
    }

    try {
        const decodedPath = getImagePathFromUrl(imagePath);
        const imageRef = ref(firebaseStorage, decodedPath);
        await deleteObject(imageRef);
        return undefined;
    } catch (error) {
        if (
            error instanceof Error &&
            (error as any).code === 'storage/object-not-found'
        ) {
            return rejectWithValue(
                handleThunkErrorMessage(
                    error,
                    ERROR_ARTICLE_MESSAGES.IMAGE_NOT_FOUND(imagePath),
                ),
            );
        }

        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_ARTICLE_MESSAGES.DELETE_IMAGE_ERROR,
            ),
        );
    }
});
