import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ERROR_ARTICLE_MESSAGES } from '../../consts/errorArticleMessages';
import { handleThunkErrorMessage, uploadImage } from '@/shared/lib/firestore';

export const uploadArticleImageThunk = createAsyncThunk<
    string,
    File,
    ThunkConfig<string>
>('article/uploadArticleImage', async (file: File, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;
    const { firebaseStorage } = extra;
    if (!firebaseStorage) {
        return rejectWithValue(
            ERROR_ARTICLE_MESSAGES.FIREBASE_STORAGE_NOT_INITIALIZED,
        );
    }
    try {
        return await uploadImage(file, 'articles', firebaseStorage);
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_ARTICLE_MESSAGES.UPLOAD_IMAGE_ERROR,
            ),
        );
    }
});
