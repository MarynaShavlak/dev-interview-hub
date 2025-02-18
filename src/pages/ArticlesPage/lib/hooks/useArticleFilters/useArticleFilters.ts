import { useCallback } from 'react';
import {
    useArticlesPageOrder,
    useArticlesPageSearch,
    useArticlesPageSort,
    useArticlesPageCategory,
    useArticlesPageView,
    useArticlesPageLimit,
} from '../../../model/selectors/articlesPageSelectors';
import {
    ArticleSortField,
    ArticleCategory,
    ArticleView,
} from '@/entities/Article';
import { useArticlesPageActions } from '../../../model/slices/articlesPageSlice';
import { SortOrder } from '@/shared/types/sortOrder';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { fetchArticlesList } from '../../../model/services/fetchArticlesList/fetchArticlesList';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { toggleFeatures } from '@/shared/lib/features';

/**
 * Custom hook for managing article filters and triggering data fetches.
 *
 * @returns {{
 *    view: ArticleView;
 *    sort: ArticleSortField;
 *    order: SortOrder;
 *    search: string;
 *    category: ArticleCategory;
 *    onChangeView: (view: ArticleView) => void;
 *    onChangeSort: (newSort: ArticleSortField) => void;
 *    onChangeOrder: (newOrder: SortOrder) => void;
 *    onChangeSearch: (search: string) => void;
 *    onChangeCategory: (value: ArticleCategory) => void;
 *  }} An object with the following properties:
 *  *  * view: The current view setting for displaying articles.
 *  *  * sort: The current sort field used for ordering articles.
 *  *  * order: The current sort order (ascending or descending).
 *  *  * search: The current search query used for filtering articles.
 *  *  * category: The currently selected article category for filtering.
 *  *  * onChangeView: Function to update the article view setting, sets the limit based on the view,
 *  *    resets the page to 1, and triggers a data fetch.
 *  *  * onChangeSort: Function to update the article sort field, resets the page to 1, and triggers a data fetch.
 *  *  * onChangeOrder: Function to update the article sort order, resets the page to 1, and triggers a data fetch.
 *  *  * onChangeSearch: Function to update the search query, resets the page to 1, and triggers a debounced data fetch.
 *  *  * onChangeCategory: Function to update the selected category, resets the page to 1, and triggers a data fetch.
 *  *
 *  */

export const useArticleFilters = () => {
    const view = useArticlesPageView();
    const sort = useArticlesPageSort();
    const order = useArticlesPageOrder();
    const search = useArticlesPageSearch();
    const category = useArticlesPageCategory();
    const limit = useArticlesPageLimit();
    const {
        setPage,
        setOrder,
        setSort,
        setCategory,
        setView,
        setSearch,
        setLimit,
    } = useArticlesPageActions();

    const dispatch = useAppDispatch();
    const shouldFetchData = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => false,
        off: () => true,
    });

    const fetchData = useCallback(async () => {
        if (shouldFetchData) {
            console.log('!!!!! fetch new data');
            await dispatch(fetchArticlesList({ replace: true }));
        }
    }, [dispatch, shouldFetchData]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const resetPageAndFetchData = useCallback(async () => {
        console.log('resetPage when parameters change');
        setPage(1);
        await fetchData();
    }, [fetchData, setPage]);

    const onChangeView = useCallback(
        async (view: ArticleView) => {
            setView(view);
            localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, view);
            let limit = 9;
            if (view === ArticleView.SEQUENCE) {
                limit = 20;
            } else if (view === ArticleView.LIST) {
                limit = 4;
            }

            setLimit(limit);
            await resetPageAndFetchData();
        },
        [resetPageAndFetchData, setLimit, setView],
    );

    const onChangeSort = useCallback(
        async (newSort: ArticleSortField) => {
            console.log('newSort', newSort);
            setSort(newSort);
            await resetPageAndFetchData();
        },
        [resetPageAndFetchData, setSort],
    );

    const onChangeOrder = useCallback(
        async (newOrder: SortOrder) => {
            setOrder(newOrder);
            if (!shouldFetchData) {
                const sortField = sort?.split('_')[1];
                console.log('sort', sort);
                console.log('sortField', sortField);
                const updatedSort =
                    `articles_${sortField}_${newOrder}` as ArticleSortField;
                console.log('updatedSort', updatedSort);
                setSort(updatedSort);
            }

            await resetPageAndFetchData();
        },
        [setOrder, shouldFetchData, resetPageAndFetchData, sort, setSort],
    );

    const onChangeSearch = useCallback(
        async (search: string) => {
            setSearch(search);
            setPage(1);
            debouncedFetchData();
        },
        [setPage, setSearch, debouncedFetchData],
    );

    const onChangeCategory = useCallback(
        async (value: ArticleCategory) => {
            setCategory(value);
            await resetPageAndFetchData();
        },
        [resetPageAndFetchData, setCategory],
    );

    return {
        view,
        limit,
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
};
