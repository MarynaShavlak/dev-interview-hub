import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';
import { ERROR_LIVE_CODE_MESSAGES } from '../../../model/consts/errorLiveCodeMessages';
import { deleteLiveCodeMutation } from '../../../api/liveCodeApi';

export const deleteLiveCodeThunk = createAsyncThunk<
    string,
    string,
    ThunkConfig<string>
>('liveCodeTask/deleteLiveCodeTask', async (articleId, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    if (!articleId) {
        return rejectWithValue(ERROR_LIVE_CODE_MESSAGES.LIVE_CODE_ID_REQUIRED);
    }

    try {
        const deletedArticleId = await dispatch(
            deleteLiveCodeMutation(articleId),
        ).unwrap();

        return deletedArticleId;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_LIVE_CODE_MESSAGES.DELETE_ERROR,
            ),
        );
    }
});
