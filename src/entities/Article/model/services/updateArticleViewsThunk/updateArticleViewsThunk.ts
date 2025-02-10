import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article } from '../../..';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData } from '@/entities/User';
import {
    getArticleViewData,
    shouldCountView,
} from '../../../lib/utilities/calculateViews/calculateViews';
import { incrementArticleViewsMutation } from '../../../api/articleApi';
import { VIEWS_STORAGE_KEY } from '@/shared/const/localstorage';

// interface UpdateArticleViewsArgs {
//     articleId: string;
//     authorId: string;
//     currentViews: number;
// }

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

    const viewData = getArticleViewData(articleId);
    if (!shouldCountView(viewData)) {
        return rejectWithValue('View cooldown period has not elapsed');
    }

    try {
        const updatedArticle = await dispatch(
            incrementArticleViewsMutation(articleId),
        ).unwrap();

        if (!updatedArticle) {
            return rejectWithValue('No data received from API.');
        }

        const viewsData = JSON.parse(
            localStorage.getItem(VIEWS_STORAGE_KEY) || '{}',
        );
        viewsData[articleId] = {
            articleId,
            lastViewTimestamp: Date.now(),
        };
        localStorage.setItem(VIEWS_STORAGE_KEY, JSON.stringify(viewsData));

        return updatedArticle;
    } catch (error) {
        console.error('Failed to update article views:', error);
        return rejectWithValue('Failed to update article views.');
    }
});
