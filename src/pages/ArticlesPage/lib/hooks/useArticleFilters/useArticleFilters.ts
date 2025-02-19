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
    ArticleCategory,
    ArticleView,
    ArticleSortType,
} from '@/entities/Article';
import { useArticlesPageActions } from '../../../model/slices/articlesPageSlice';
import { SortOrder } from '@/shared/types/sortOrder';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { getLimitByView } from '../../utilities/getLimitByView/getLimitByView';
import { useArticleDataFetching } from '../useArticleDataFetching/useArticleDataFetching';
import { createAlgoliaIndexNameFromUrl } from '../../utilities/createAlgoliaIndexNameFromUrl/createAlgoliaIndexNameFromUrl';
import { extractSortType } from '../../utilities/extractSortType/extractSortType';

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
    console.log('useArticleFilters__sort', sort);
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

    const { fetchData, debouncedFetchData, shouldFetchData } =
        useArticleDataFetching();

    const resetPageAndFetchData = useCallback(async () => {
        console.log('resetPage when parameters change');
        setPage(1);
        await fetchData();
    }, [fetchData, setPage]);

    const onChangeView = useCallback(
        async (view: ArticleView) => {
            setView(view);
            localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, view);
            setLimit(getLimitByView(view));
            await resetPageAndFetchData();
        },
        [resetPageAndFetchData, setLimit, setView],
    );

    const onChangeSort = useCallback(
        async (newSort: ArticleSortType) => {
            setSort(newSort);
            await resetPageAndFetchData();
        },
        [resetPageAndFetchData, setSort],
    );

    const onChangeOrder = useCallback(
        async (newOrder: SortOrder) => {
            setOrder(newOrder);
            if (!shouldFetchData) {
                const parsedSortType = extractSortType(sort);
                if (parsedSortType) {
                    const newSort = createAlgoliaIndexNameFromUrl(
                        parsedSortType,
                        newOrder,
                    );

                    setSort(newSort);
                }
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

    const modifiedSort = !shouldFetchData
        ? createAlgoliaIndexNameFromUrl(sort, order)
        : sort;

    return {
        view,
        limit,
        sort: modifiedSort,
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
