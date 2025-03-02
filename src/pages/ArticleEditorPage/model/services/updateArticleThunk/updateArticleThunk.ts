import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getArticleFormData } from '../../selectors/getCreateArticleSelectors';
import {
    updateArticleMutation,
    Article,
    ERROR_ARTICLE_MESSAGES,
} from '@/entities/Article';
import { getUserAuthData } from '@/entities/User';
import { ERROR_ARTICLE_EDITOR_MESSAGES } from '../../types/errorArticleEditorMessages';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';

/**
 * Thunk to handle updating an existing article.
 * - Validates form data.
 * - Dispatches the update mutation.
 * - Handles errors and state updates.
 */
export const updateArticleThunk = createAsyncThunk<
    Article,
    void,
    ThunkConfig<string>
>('article/updateArticle', async (_, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;

    const formData = getArticleFormData(getState());
    const authData = getUserAuthData(getState());

    if (!authData) {
        return rejectWithValue(ERROR_ARTICLE_MESSAGES.USER_NOT_FOUND);
    }

    if (!formData) {
        return rejectWithValue(ERROR_ARTICLE_EDITOR_MESSAGES.NO_FORM_DATA);
    }

    try {
        const updatedArticle = await dispatch(
            updateArticleMutation({
                articleId: formData.id,
                updates: formData,
            }),
        ).unwrap();

        if (!updatedArticle) {
            return rejectWithValue(
                ERROR_ARTICLE_MESSAGES.UPDATED_DATA_RETRIEVAL_ERROR(
                    formData.id,
                ),
            );
        }

        return updatedArticle;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_ARTICLE_MESSAGES.UPDATE_ARTICLE_ERROR(formData.id),
            ),
        );
    }
});
