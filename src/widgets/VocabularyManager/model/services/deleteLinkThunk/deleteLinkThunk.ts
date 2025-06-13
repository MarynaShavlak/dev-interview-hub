import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';
import { ERROR_LINK_MESSAGES } from '../../consts/errorLinkMessages';
import { deleteLinkMutation } from '../../../api/linksManagerApi';

export const deleteLinkThunk = createAsyncThunk<
    string,
    string,
    ThunkConfig<string>
>('linksManager/deleteLinkFromManager', async (linkId, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    if (!linkId) {
        return rejectWithValue(ERROR_LINK_MESSAGES.LINK_ID_REQUIRED);
    }

    try {
        const deletedLinkId = await dispatch(
            deleteLinkMutation(linkId),
        ).unwrap();

        return deletedLinkId;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(error, ERROR_LINK_MESSAGES.DELETE_ERROR),
        );
    }
});
