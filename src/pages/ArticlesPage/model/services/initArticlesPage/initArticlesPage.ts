import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sortOrder';
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

const searchParamActions: { [key: string]: (value: string) => any } = {
    order: (value) => articlesPageActions.setOrder(value as SortOrder),
    sort: (value) => articlesPageActions.setSort(value as ArticleSortField),
    search: articlesPageActions.setSearch,
    type: (value) => articlesPageActions.setType(value as ArticleType),
};

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
        dispatch(articlesPageActions.initState());
        dispatch(fetchArticlesList({}));
    }
});
