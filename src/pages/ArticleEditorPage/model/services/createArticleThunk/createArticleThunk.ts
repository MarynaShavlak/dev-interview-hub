import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
    addArticleMutation,
    Article,
    ERROR_ARTICLE_MESSAGES,
} from '@/entities/Article';
import { getArticleFormData } from '../../selectors/getCreateArticleSelectors';
import { getUserAuthData } from '@/entities/User';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';
import { ERROR_ARTICLE_EDITOR_MESSAGES } from '../../types/errorArticleEditorMessages';

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
        return rejectWithValue(ERROR_ARTICLE_MESSAGES.USER_NOT_FOUND);
    }

    if (!formData) {
        return rejectWithValue(ERROR_ARTICLE_EDITOR_MESSAGES.NO_FORM_DATA);
    }

    try {
        const newArticle: Article = {
            ...formData,
            id: v4(),
            user: authData,
            // createdAt: new Date().toISOString(),
        };

        const createdArticle = await dispatch(
            addArticleMutation(newArticle),
        ).unwrap();
        if (!createdArticle) {
            return rejectWithValue(
                ERROR_ARTICLE_MESSAGES.ARTICLE_RETRIEVAL_FAIL,
            );
        }

        return createdArticle;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_ARTICLE_MESSAGES.ADD_ARTICLE_FAIL,
            ),
        );
    }
});
