import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { handleThunkErrorMessage, uploadImage } from '@/shared/lib/firestore';
import { ERROR_PROFILE_CARD_MESSAGES } from '../../consts/errorProfileCardMessages';

export const uploadUserProfileImageThunk = createAsyncThunk<
    string,
    File,
    ThunkConfig<string>
>('profile/uploadUserProfileImag', async (file: File, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;
    const { firebaseStorage } = extra;
    if (!firebaseStorage) {
        return rejectWithValue(
            ERROR_PROFILE_CARD_MESSAGES.FIREBASE_STORAGE_NOT_INITIALIZED,
        );
    }
    try {
        return await uploadImage(file, 'users', firebaseStorage);
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_PROFILE_CARD_MESSAGES.UPLOAD_IMAGE_ERROR,
            ),
        );
    }
});
