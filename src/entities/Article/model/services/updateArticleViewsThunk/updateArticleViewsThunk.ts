import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article } from '../../../model/types/article';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData } from '@/entities/User';

import { incrementArticleViewsMutation } from '../../../api/articleApi';
import { updateLocalStorageViews } from '../../../lib/utilities/updateLocalStorageViews/updateLocalStorageViews';
import { ERROR_ARTICLE_MESSAGES } from '../../consts/errorArticleMessages';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';

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
        return rejectWithValue(ERROR_ARTICLE_MESSAGES.AUTHOR_VIEWS_NOT_COUNTED);
    }

    try {
        const updatedArticle = await dispatch(
            incrementArticleViewsMutation(articleId),
        ).unwrap();

        if (!updatedArticle) {
            return rejectWithValue(ERROR_ARTICLE_MESSAGES.NO_API_DATA);
        }

        updateLocalStorageViews(articleId);

        return updatedArticle;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_ARTICLE_MESSAGES.UPDATE_ARTICLE_VIEWS_ERROR,
            ),
        );
    }
});
