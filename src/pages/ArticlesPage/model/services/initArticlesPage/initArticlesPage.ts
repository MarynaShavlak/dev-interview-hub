import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
    ArticleSortField,
    ArticleCategory,
    ArticleView,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types/sortOrder';
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

/**
 * Object mapping search parameter keys to corresponding Redux actions.
 *
 * This object defines a mapping from URL search parameter keys to Redux actions used to
 * update the articles page state. Each key corresponds to a specific action creator that
 * processes the associated search parameter value.
 *
 * @type {Object}
 * @property {Function} order - Action creator to set the sorting order. Converts the value
 *        to `SortOrder`.
 * @property {Function} sort - Action creator to set the sorting field. Converts the value
 *        to `ArticleSortField`.
 * @property {Function} search - Action creator to set the search term.
 * @property {Function} category - Action creator to set the article category. Converts the
 *        value to `ArticleCategory`.
 */

const searchParamActions: { [key: string]: (value: string) => any } = {
    order: (value) => articlesPageActions.setOrder(value as SortOrder),
    sort: (value) => articlesPageActions.setSort(value as ArticleSortField),
    search: articlesPageActions.setSearch,
    category: (value) =>
        articlesPageActions.setCategory(value as ArticleCategory),
};

/**
 * Thunk to initialize the articles page with settings based on URL search parameters.
 *
 * This thunk is responsible for setting the initial state of the articles page based on
 * query parameters from the URL. It updates the Redux store with values for sorting, ordering,
 * search terms, and categories if they are present in the search parameters. It also dispatches
 * an action to initialize the state and then fetches the articles list.
 *
 * @param {URLSearchParams} searchParams - The URL search parameters to initialize the page settings.
 * @param {ThunkAPI} thunkAPI - The thunkAPI object provided by Redux Toolkit, containing
 *        dispatch, getState, extra, and more.
 * @returns {Promise<void>} A promise that resolves when the page is initialized and the articles list is fetched.
 */

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('articlesPage/initArticlesPage', async (searchParams, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const inited = getArticlesPageInited(getState());

    if (!inited) {
        Object.keys(searchParamActions).forEach((param) => {
            const value = searchParams.get(param);
            if (value !== null) {
                dispatch(searchParamActions[param](value));
            }
        });
        const view = localStorage.getItem(
            ARTICLES_VIEW_LOCALSTORAGE_KEY,
        ) as ArticleView;

        console.log('initArticlesPage thunk view', view);
        dispatch(articlesPageActions.initState(view));
        dispatch(fetchArticlesList({}));
    }
});
