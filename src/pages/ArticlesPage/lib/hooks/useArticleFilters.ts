import { useCallback } from 'react';
import {
    useArticlesPageOrder,
    useArticlesPageSearch,
    useArticlesPageSort,
    useArticlesPageCategory,
    useArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import {
    ArticleSortField,
    ArticleCategory,
    ArticleView,
} from '@/entities/Article';
import { useArticlesPageActions } from '../../model/slices/articlesPageSlice';
import { SortOrder } from '@/shared/types/sortOrder';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';

export function useArticleFilters() {
    const view = useArticlesPageView();
    const sort = useArticlesPageSort();
    const order = useArticlesPageOrder();
    const search = useArticlesPageSearch();
    const category = useArticlesPageCategory();
    const { setPage, setOrder, setSort, setCategory, setView, setSearch } =
        useArticlesPageActions();

    const dispatch = useAppDispatch();

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback(
        (view: ArticleView) => {
            setView(view);
        },
        [setView],
    );

    const onChangeSort = useCallback(
        (newSort: ArticleSortField) => {
            setSort(newSort);
            setPage(1);
            fetchData();
        },
        [setSort, setPage, fetchData],
    );

    const onChangeOrder = useCallback(
        (newOrder: SortOrder) => {
            setOrder(newOrder);
            setPage(1);
            fetchData();
        },
        [setOrder, setPage, fetchData],
    );

    const onChangeSearch = useCallback(
        (search: string) => {
            setSearch(search);
            setPage(1);
            debouncedFetchData();
        },
        [setPage, setSearch, debouncedFetchData],
    );

    const onChangeCategory = useCallback(
        (value: ArticleCategory) => {
            setCategory(value);
            setPage(1);
            fetchData();
        },
        [setPage, setCategory, fetchData],
    );

    return {
        view,
        sort,
        order,
        search,
        category,
        onChangeView,
        onChangeSort,
        onChangeOrder,
        onChangeSearch,
        onChangeCategory,
    };
}
