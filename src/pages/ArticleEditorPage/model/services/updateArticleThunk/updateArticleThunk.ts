import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getArticleFormData } from '../../selectors/getCreateArticleSelectors';
import { updateArticleMutation, Article } from '@/entities/Article';
import { getUserAuthData } from '@/entities/User';

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
        return rejectWithValue('User is not authenticated.');
    }

    if (!formData) {
        return rejectWithValue('Form data is missing.');
    }

    try {
        const updatedArticle = await dispatch(
            updateArticleMutation({
                articleId: formData.id,
                updates: formData,
            }),
        ).unwrap();

        if (!updatedArticle) {
            return rejectWithValue('No data received from API.');
        }

        return updatedArticle;
    } catch (error) {
        console.error('Failed to update article:', error);
        return rejectWithValue('Failed to update article.');
    }
});
