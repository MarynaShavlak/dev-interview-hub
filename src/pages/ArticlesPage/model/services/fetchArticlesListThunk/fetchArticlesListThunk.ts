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
import { handleThunkErrorMessage } from '@/shared/lib/firestore';
import { ERROR_ARTICLES_PAGE_MESSAGES } from '../../consts/errorArticlesPageMessages';

interface FetchArticlesListProps {
    replace?: boolean;
}
export const fetchArticlesListThunk = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (props, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;
    const limit = getArticlesPageLimit(getState());
    const sort = getArticlesPageSort(getState());

    const modifiedSort = sort?.split('_')[1] as ArticleSort;

    const order = getArticlesPageOrder(getState());

    const search = getArticlesPageSearch(getState());
    const page = getArticlesPageNum(getState());
    const category = getArticlesPageCategory(getState());
    const sortOption = modifiedSort || (sort as ArticleSort);

    try {
        addQueryParams({
            sort,
            order,
            query: search,
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
                query: search,

                page,
            }),
        ).unwrap();

        return articlesResponse;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_ARTICLES_PAGE_MESSAGES.ARTICLES_FETCH_FAIL,
            ),
        );
    }
});
