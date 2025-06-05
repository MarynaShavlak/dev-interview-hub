import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';
import { ERROR_LINK_MESSAGES } from '../../consts/errorLinkMessages';
import { updateLinkMutation } from '../../../api/linksManagerApi';
import { Link } from '@/entities/Link';

export const updateLinkThunk = createAsyncThunk<
    Link,
    Link,
    ThunkConfig<string>
>('linksManager/updateLinkInManager', async (link: Link, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    try {
        const response = await dispatch(
            updateLinkMutation({
                linkId: link.id,
                updates: link,
            }),
        ).unwrap();

        return response;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_LINK_MESSAGES.UPDATE_LINK_ERROR(link.id),
            ),
        );
    }
});
