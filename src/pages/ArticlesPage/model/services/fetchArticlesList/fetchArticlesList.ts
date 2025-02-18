import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
    Article,
    ArticleCategory,
    ArticleSort,
    getFilteredArticlesQuery,
} from '@/entities/Article';
import {
    getArticlesPageLimit,
    getArticlesPageNum,
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageCategory,
} from '../../selectors/articlesPageSelectors';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';

interface FetchArticlesListProps {
    replace?: boolean;
}
export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (props, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;
    const limit = getArticlesPageLimit(getState());
    const sort = getArticlesPageSort(getState());
    console.log('sort', sort);
    const modifiedSort = sort?.split('_')[1] as ArticleSort;
    // console.log('modifiedSort_fetchArticlesList', modifiedSort);
    const order = getArticlesPageOrder(getState());
    const search = getArticlesPageSearch(getState());
    const page = getArticlesPageNum(getState());
    const category = getArticlesPageCategory(getState());
    const sortOption = modifiedSort || (sort as ArticleSort);

    try {
        addQueryParams({
            sort,
            order,
            search,
            category,
        });

        const modifiedCategory =
            category !== ArticleCategory.ALL ? category : undefined;

        const articlesResponse = await dispatch(
            getFilteredArticlesQuery({
                order,
                sort: sortOption,
                limit,
                category: modifiedCategory ? [modifiedCategory] : [],
                search,
                // search: '',
                page,
            }),
        ).unwrap();

        return articlesResponse;
    } catch (error) {
        console.error('Error fetching articles list:', error);
        return rejectWithValue('Failed to fetch articles.');
    }
});

/// //////////////////////////////
// export const fetchArticlesList = createAsyncThunk<
//     Article[],
//     FetchArticlesListProps,
//     ThunkConfig<string>
// >('articlesPage/fetchArticlesList', async (props, thunkApi) => {
//     const { rejectWithValue, getState, dispatch } = thunkApi;
//     const limit = getArticlesPageLimit(getState());
//     const sort = getArticlesPageSort(getState());
//     console.log('__sort in fetchArticlesList', sort);
//     const order = getArticlesPageOrder(getState());
//     const search = getArticlesPageSearch(getState());
//     const page = getArticlesPageNum(getState());
//     const category = getArticlesPageCategory(getState());
//     const modifiedSort = sort?.split('_')[1] as ArticleSort;
//     console.log('modifiedSort', modifiedSort);
//
//     try {
//         addQueryParams({
//             sort: modifiedSort || sort,
//             order,
//             search,
//             category,
//         });
//
//         const modifiedCategory =
//             category !== ArticleCategory.ALL ? category : undefined;
//
//         const articlesResponse = await dispatch(
//             getFilteredArticlesQuery({
//                 order,
//                 sort: modifiedSort,
//                 limit,
//                 category: modifiedCategory ? [modifiedCategory] : [],
//                 search,
//                 // search: '',
//                 page,
//             }),
//         ).unwrap();
//
//         return articlesResponse;
//     } catch (error) {
//         console.error('Error fetching articles list:', error);
//         return rejectWithValue('Failed to fetch articles.');
//     }
// });

// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { ThunkConfig } from '@/app/providers/StoreProvider';
// import {
//     Article,
//     ArticleCategory,
//     ArticleSort,
//     getFilteredArticlesQuery,
// } from '@/entities/Article';
// import {
//     getArticlesPageLimit,
//     getArticlesPageNum,
//     getArticlesPageOrder,
//     getArticlesPageSearch,
//     getArticlesPageSort,
//     getArticlesPageCategory,
// } from '../../selectors/articlesPageSelectors';
// import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
//
// export const fetchArticlesList = createAsyncThunk<
//     Article[],
//     void,
//     ThunkConfig<string>
// >('articlesPage/fetchArticlesList', async (_, thunkApi) => {
//     const { extra, rejectWithValue, getState, dispatch } = thunkApi;
//     const limit = getArticlesPageLimit(getState());
//     console.log('Articles Page Limit:', limit);
//
//     const sort = getArticlesPageSort(getState());
//     // console.log('Articles Page Sort:', sort);
//
//     const order = getArticlesPageOrder(getState());
//     console.log('Articles Page Order:', order);
//
//     const search = getArticlesPageSearch(getState());
//     console.log('Articles Page Search:', search);
//
//     const page = getArticlesPageNum(getState());
//     console.log('Articles Page Number:', page);
//
//     const category = getArticlesPageCategory(getState());
//     console.log('Articles Page Category:', category);
//     const modifiedSort = sort.split('_')[1] as ArticleSort;
//     console.log('Modified Sort:', modifiedSort);
//
//     try {
//         addQueryParams({
//             sort: modifiedSort,
//             order,
//             search,
//             category,
//         });
//
//         const modifiedCategory =
//             category !== ArticleCategory.ALL ? category : undefined;
//         console.log('modified category:', modifiedCategory);
//         const articlesResponse = await dispatch(
//             getFilteredArticlesQuery({
//                 order,
//                 sort: modifiedSort,
//                 limit,
//                 category: modifiedCategory ? [modifiedCategory] : [],
//                 search,
//                 // search: '',
//                 page,
//             }),
//         ).unwrap();
//
//         console.log('firebase articles response', articlesResponse);
//
//         return articlesResponse;
//     } catch (error) {
//         console.error('Error fetching articles list:', error);
//         return rejectWithValue('Failed to fetch articles.');
//     }
// });

// const objectsLimit =
//     category === ArticleCategory.ALL ? limit : undefined;
// const pageLimit = category === ArticleCategory.ALL ? page : undefined;
// // console.log('objectsLimit', objectsLimit);
// // console.log('page', page);
// // console.log('pageLimit', pageLimit);

// import { createAsyncThunk, EntityState } from '@reduxjs/toolkit';
// import { ThunkConfig } from '@/app/providers/StoreProvider';
// import { Article, ArticleCategory, getArticlesQuery } from '@/entities/Article';
// import {
//     getArticlesPageLimit,
//     getArticlesPageNum,
//     getArticlesPageOrder,
//     getArticlesPageSearch,
//     getArticlesPageSort,
//     getArticlesPageCategory,
// } from '../../selectors/articlesPageSelectors';
// import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
//
// interface FetchArticlesListProps {
//     replace?: boolean;
// }
//
// /**
//  * Thunk to fetch a list of articles based on current page settings and filters.
//  *
//  * This thunk performs an API call to retrieve articles with parameters based on the current
//  * settings in the Redux store. It handles scenarios where the API response is invalid or
//  * if an error occurs during the API call. If the API call fails or returns an error, it
//  * handles the error appropriately.
//  *
//  * @param {FetchArticlesListProps} props - Optional properties to customize the request.
//  *        - `replace` (boolean) - If true, it replaces the existing articles list.
//  * @param {ThunkAPI} thunkAPI - The thunkAPI object provided by Redux Toolkit, containing
//  *        dispatch, getState, extra, and more.
//  * @returns {Promise<Article[]>} A promise that resolves to an array of articles or
//  *        rejects with an error message.
//  */
//
// export const  fetchArticlesList= createAsyncThunk<
//     EntityState<Article>[],
//     FetchArticlesListProps,
//     ThunkConfig<string>
// >('articlesPage/fetchArticlesList', async (props, thunkApi) => {
//     const { extra, rejectWithValue, getState, dispatch } = thunkApi;
//     const limit = getArticlesPageLimit(getState());
//     // console.log('Articles Page Limit:', limit);
//
//     const sort = getArticlesPageSort(getState());
//     // console.log('Articles Page Sort:', sort);
//
//     const order = getArticlesPageOrder(getState());
//     // console.log('Articles Page Order:', order);
//
//     const search = getArticlesPageSearch(getState());
//     // console.log('Articles Page Search:', search);
//
//     const page = getArticlesPageNum(getState());
//     // console.log('Articles Page Number:', page);
//
//     const category = getArticlesPageCategory(getState());
//     // console.log('Articles Page Category:', category);
//
//     try {
//         addQueryParams({
//             sort,
//             order,
//             search,
//             category,
//         });
//         const objectsLimit =
//             category === ArticleCategory.ALL ? limit : undefined;
//         const pageLimit = category === ArticleCategory.ALL ? page : undefined;
//         // console.log('objectsLimit', objectsLimit);
//         // console.log('page', page);
//         // console.log('pageLimit', pageLimit);
//
//         const articlesResponse = await dispatch(getArticlesQuery()).unwrap();
//
//         console.log('firebase articles response', articlesResponse);
//
//         return articlesResponse;
//     } catch (error) {
//         console.error('Error fetching articles list:', error);
//         // return rejectWithValue('Failed to fetch articles.');
//     }
// });
