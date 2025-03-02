import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ERROR_ARTICLE_MESSAGES } from '../../consts/errorArticleMessages';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';

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
        const safeFileName = encodeURIComponent(file.name);
        const uniqueFilePath = `images/articles/${safeFileName}_${v4()}`;
        const imageRef = ref(firebaseStorage, uniqueFilePath);
        const uploadResult = await uploadBytes(imageRef, file);
        const { fullPath } = uploadResult.metadata;
        const pathReference = ref(firebaseStorage, fullPath);

        return await getDownloadURL(pathReference);
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_ARTICLE_MESSAGES.UPLOAD_IMAGE_ERROR,
            ),
        );
    }
});
