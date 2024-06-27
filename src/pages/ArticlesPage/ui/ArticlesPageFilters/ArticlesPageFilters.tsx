import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { SortOrder } from '@/shared/types/sortOrder';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import cls from './ArticlesPageFilters.module.scss';
import {
    useArticlesPageView,
    useArticlesPageSort,
    useArticlesPageOrder,
    useArticlesPageSearch,
    useArticlesPageType,
} from '../../model/selectors/articlesPageSelectors';
import { useArticlesPageActions } from '../../model/slices/articlesPageSlice';

interface ArticlesPageFiltersProps {
    className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const view = useArticlesPageView();
    const sort = useArticlesPageSort();
    const order = useArticlesPageOrder();
    const search = useArticlesPageSearch();
    const type = useArticlesPageType();
    const {
        setPage,
        setOrder,
        setSort,
        setType,
        setView,
        setSearch,
        initState,
    } = useArticlesPageActions();

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

    const onChangeType = useCallback(
        (value: ArticleType) => {
            setType(value);
            setPage(1);
            fetchData();
        },
        [setPage, setType, fetchData],
    );

    return (
        <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
            </div>
            <Card className={cls.search}>
                <Input
                    onChange={onChangeSearch}
                    value={search}
                    placeholder={t('Пошук')}
                />
            </Card>
            <ArticleTypeTabs
                value={type}
                onChangeType={onChangeType}
                className={cls.tabs}
            />
        </div>
    );
});
