import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article } from '../../..';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData } from '@/entities/User';

import { incrementArticleViewsMutation } from '../../../api/articleApi';
import { updateLocalStorageViews } from '../../../lib/utilities/updateLocalStorageViews/updateLocalStorageViews';

export const updateArticleViewsThunk = createAsyncThunk<
    Article,
    Article,
    ThunkConfig<string>
>('article/updateViews', async (article: Article, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;
    const { id: articleId } = article;

    const authData = getUserAuthData(getState());
    const authorId = article?.user.id;

    if (authorId === authData?.id) {
        return rejectWithValue("Author's views are not counted");
    }

    try {
        const updatedArticle = await dispatch(
            incrementArticleViewsMutation(articleId),
        ).unwrap();

        if (!updatedArticle) {
            return rejectWithValue('No data received from API.');
        }

        updateLocalStorageViews(articleId);

        return updatedArticle;
    } catch (error) {
        console.error('Failed to update article views:', error);
        return rejectWithValue('Failed to update article views.');
    }
});
