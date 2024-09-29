import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, ArticleCategory } from '@/entities/Article';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import {
    getArticlesPageLimit,
    getArticlesPageNum,
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageCategory,
} from '../../selectors/articlesPageSelectors';

interface FetchArticlesListProps {
    replace?: boolean;
}

/**
 * Thunk to fetch a list of articles based on current page settings and filters.
 *
 * This thunk performs an API call to retrieve articles with parameters based on the current
 * settings in the Redux store. It handles scenarios where the API response is invalid or
 * if an error occurs during the API call. If the API call fails or returns an error, it
 * handles the error appropriately.
 *
 * @param {FetchArticlesListProps} props - Optional properties to customize the request.
 *        - `replace` (boolean) - If true, it replaces the existing articles list.
 * @param {ThunkAPI} thunkAPI - The thunkAPI object provided by Redux Toolkit, containing
 *        dispatch, getState, extra, and more.
 * @returns {Promise<Article[]>} A promise that resolves to an array of articles or
 *        rejects with an error message.
 */

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const limit = getArticlesPageLimit(getState());
    const sort = getArticlesPageSort(getState());
    const order = getArticlesPageOrder(getState());
    const search = getArticlesPageSearch(getState());
    const page = getArticlesPageNum(getState());
    const category = getArticlesPageCategory(getState());

    try {
        addQueryParams({
            sort,
            order,
            search,
            category,
        });
        const objectsLimit =
            category === ArticleCategory.ALL ? limit : undefined;
        const pageLimit = category === ArticleCategory.ALL ? page : undefined;
        console.log('objectsLimit', objectsLimit);
        console.log('page', page);
        console.log('pageLimit', pageLimit);
        const response = await extra.api.get<Article[]>('/articles', {
            params: {
                _expand: 'user',
                _limit: objectsLimit,
                _page: pageLimit,
                _sort: sort,
                _order: order,
                q: search,
                // category:
                //     category === ArticleCategory.ALL ? undefined : category,
            },
        });

        if (!response.data) {
            return rejectWithValue('No articles found.');
        }
        console.log('response.data', response.data);
        console.log('category', category);
        const filteredArticles =
            category === ArticleCategory.ALL
                ? response.data
                : response.data.filter(
                      (article) =>
                          article.category &&
                          article.category.includes(category),
                  );
        console.log('filteredArticles', filteredArticles);
        return filteredArticles;

        // return response.data;
    } catch (error) {
        console.error('Error fetching articles list:', error);
        return rejectWithValue('Failed to fetch articles.');
    }
});
