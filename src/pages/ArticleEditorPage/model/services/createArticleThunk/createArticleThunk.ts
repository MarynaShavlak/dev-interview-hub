import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { addArticleMutation, Article } from '@/entities/Article';
import { getArticleFormData } from '../../selectors/getCreateArticleSelectors';
import { getUserAuthData } from '@/entities/User';

/**
 * Thunk to handle creating a new article.
 * - Uploads an image if provided.
 * - Generates a new article with metadata.
 * - Dispatches actions based on success or failure.
 */
export const createArticleThunk = createAsyncThunk<
    Article,
    void,
    ThunkConfig<string>
>('article/createArticle', async (_, thunkApi) => {
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
        const newArticle: Article = {
            ...formData,
            id: v4(),
            user: authData,
            createdAt: new Date().toISOString(),
        };
        console.log('newArticle', newArticle);
        const createdArticle = await dispatch(
            addArticleMutation(newArticle),
        ).unwrap();
        if (!createdArticle) {
            return rejectWithValue('No data received from API.');
        }

        return createdArticle;
    } catch (error) {
        console.error('Failed to create article:', error);
        return rejectWithValue('Failed to create article.');
    }
});
