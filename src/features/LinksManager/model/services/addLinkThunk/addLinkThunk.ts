import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { getUserAuthData } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { handleThunkErrorMessage } from '@/shared/lib/firestore';
import { addLinkMutation } from '../../../api/linksManagerApi';
import { ERROR_LINK_MESSAGES } from '../../consts/errorLinkMessages';
import { Link } from '@/entities/Link';

export const addLinkThunk = createAsyncThunk<
    Link,
    { text: string; label: string },
    ThunkConfig<string>
>('linksManager/addLinkToManager', async ({ text, label }, thunkApi) => {
    const { dispatch, rejectWithValue, getState } = thunkApi;

    try {
        const userData = getUserAuthData(getState());

        if (!userData) {
            return rejectWithValue(ERROR_LINK_MESSAGES.USER_AUTH_MISSING);
        }

        if (!text || text.trim() === '') {
            return rejectWithValue(ERROR_LINK_MESSAGES.LINK_TEXT_REQUIRED);
        }

        if (!label || label.trim() === '') {
            return rejectWithValue(ERROR_LINK_MESSAGES.LINK_LABEL_REQUIRED);
        }

        const linkId = v4();
        const addedLink = await dispatch(
            addLinkMutation({
                userId: userData.id,
                text,
                id: linkId,
                label,
            }),
        ).unwrap();

        return addedLink;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_LINK_MESSAGES.LINK_ADD_API_FAIL,
            ),
        );
    }
});
