import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
    getArticlesPageHasMore,
    getArticlesPageIsLoading,
    getArticlesPageNum,
} from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
// import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

/**
 * Thunk to fetch the next page of articles if there are more pages to load.
 *
 * This thunk checks whether more articles are available and if the current state
 * indicates that articles are not currently being loaded. If these conditions are met,
 * it increments the current page number and dispatches the `fetchArticlesList` thunk
 * to load the next page of articles.
 *
 * @param {void} _ - This thunk does not use any arguments.
 * @param {ThunkAPI} thunkAPI - The thunkAPI object provided by Redux Toolkit, containing
 *        dispatch, getState, extra, and more.
 * @returns {Promise<void>} A promise that resolves when the next page of articles is fetched.
 */

export const fetchNextArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('articlesPage/fetchNextArticlesPage', async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const hasMore = getArticlesPageHasMore(getState());
    const page = getArticlesPageNum(getState());
    const isLoading = getArticlesPageIsLoading(getState());

    if (hasMore && !isLoading) {
        dispatch(articlesPageActions.setPage(page + 1));
        await dispatch(fetchArticlesList());
    }
});
