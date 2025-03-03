import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleView } from '@/entities/Article';
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
// import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { fetchArticlesListThunk } from '../fetchArticlesListThunk/fetchArticlesListThunk';
import { shouldDoActionForRedesignUi } from '@/shared/lib/features';
import { parseSearchParams } from '../../../lib/utilities/parseSearchParams/parseSearchParams';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';
import { ERROR_ARTICLES_PAGE_MESSAGES } from '../../consts/errorArticlesPageMessages';

/**
 * Thunk to initialize the articles page with settings based on URL search parameters.
 *
 * It extracts query parameters, updates the Redux store with relevant filters,
 * initializes the page state, and optionally fetches the articles list.
 *
 * @param {URLSearchParams} searchParams - The URL search parameters to initialize the page settings.
 * @param {ThunkAPI} thunkAPI - The thunkAPI object containing dispatch, getState, and other Redux tools.
 * @returns {Promise<void>} Resolves when the page is initialized and the articles list is fetched.
 */

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('articlesPage/initArticlesPage', async (searchParams, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;
    const inited = getArticlesPageInited(getState());
    try {
        if (inited) return undefined;

        const parsedParams = parseSearchParams(searchParams);
        const { order, sort, search, category } = parsedParams;

        if (order) dispatch(articlesPageActions.setOrder(order));
        if (sort) dispatch(articlesPageActions.setSort(sort));
        if (search) dispatch(articlesPageActions.setSearch(search));
        if (category) dispatch(articlesPageActions.setCategory(category));

        const view = localStorage.getItem(
            ARTICLES_VIEW_LOCALSTORAGE_KEY,
        ) as ArticleView;

        dispatch(articlesPageActions.initState(view));

        const shouldFetchData = shouldDoActionForRedesignUi();

        if (shouldFetchData) {
            dispatch(fetchArticlesListThunk({}));
        }
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_ARTICLES_PAGE_MESSAGES.INIT_ERROR,
            ),
        );
    }
});
