/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Virtuoso, VirtuosoGrid, VirtuosoHandle } from 'react-virtuoso';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import {
    Text as TextDeprecated,
    TextAlign,
    TextTheme,
} from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { getArticles } from '../../model/slices/articlesPageSlice';
import {
    useArticlesPageError,
    useArticlesPageIsLoading,
    useArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import {
    Article,
    ArticleListSkeleton,
    ArticleView,
    NoArticlesFound,
    ArticleCard,
} from '@/entities/Article';

import cls from '../../../../entities/Article/ui/ArticleList/ArticleList.module.scss';
import { useVirtuosoGrid } from '../../lib/hooks/useVirtuosoGrid/useVirtuosoGrid';
import { useNoArticlesFound } from '../../lib/hooks/useNoArticlesFound/useNoArticlesFound';

import {
    getScrollStopArticleIndex,
    useScrollToolbarActions,
} from '@/widgets/ScrollToolbar';
import { ScrollToTopButton } from '@/features/scrollToTopButton';

interface ArticleInfiniteListSkeletonProps {
    isLoading?: boolean;
    view: ArticleView;
}

interface InfiniteArticleProps {
    view: ArticleView;
}

const ArticleInfiniteListSkeleton = memo(
    ({ isLoading, view }: ArticleInfiniteListSkeletonProps) => {
        if (view === ArticleView.LIST) {
            if (isLoading) {
                return <ArticleListSkeleton view={ArticleView.LIST} />;
            }
            return null;
        }

        if (view === ArticleView.GRID) {
            return <ArticleListSkeleton view={ArticleView.GRID} />;
        }

        return null;
    },
);

export const InfiniteArticlesListView = memo(
    ({ view }: InfiniteArticleProps) => {
        const dispatch = useAppDispatch();
        const articles = useSelector(getArticles.selectAll);

        const isLoading = useArticlesPageIsLoading();
        const { setScrollStopArticleIndex } = useScrollToolbarActions();

        const scrollStopArticleIndex = useSelector(getScrollStopArticleIndex);

        const virtuosoRef = useRef<VirtuosoHandle>(null);

        const onLoadNextPart = useCallback(() => {
            dispatch(fetchNextArticlesPage());
        }, [dispatch]);

        const handleSaveArticlesPageScrollPosition = useCallback(
            (index: number) => {
                dispatch(setScrollStopArticleIndex(index));
            },
            [dispatch, setScrollStopArticleIndex],
        );

        const handleClick = useCallback(() => {
            virtuosoRef.current?.scrollToIndex({
                index: 0,
                align: 'start',
                behavior: 'smooth',
            });
        }, []);

        const renderArticle = useCallback(
            (index: number, article: Article) => (
                <ArticleCard
                    article={article}
                    view={view}
                    key={article.id}
                    index={index}
                    handleClick={() =>
                        handleSaveArticlesPageScrollPosition(index)
                    }
                />
            ),
            [view, handleSaveArticlesPageScrollPosition],
        );

        const Footer = memo(() => (
            <ArticleInfiniteListSkeleton isLoading={isLoading} view={view} />
        ));

        const Header = memo(() => (
            <div className={cls.scrollButton}>
                <ScrollToTopButton scrollToTop={handleClick} />
            </div>
        ));

        if (!articles.length) {
            return <ArticleListSkeleton view={view} />;
        }

        return (
            <Virtuoso
                ref={virtuosoRef}
                style={{ height: '100vh' }}
                data={articles}
                endReached={onLoadNextPart}
                itemContent={renderArticle}
                useWindowScroll
                initialTopMostItemIndex={scrollStopArticleIndex}
                components={{
                    Footer,
                    Header,
                }}
            />
        );
    },
);

export const InfiniteArticlesGridView = memo(
    ({ view }: InfiniteArticleProps) => {
        console.log('Grid ....InfiniteArticlesView');
        const dispatch = useAppDispatch();
        const articles = useSelector(getArticles.selectAll);
        const { setScrollStopArticleIndex } = useScrollToolbarActions();
        const scrollStopArticleIndex = useSelector(getScrollStopArticleIndex);
        const virtuosoGridRef = useVirtuosoGrid(scrollStopArticleIndex);

        console.log(`scrollStopArticleIndex`, scrollStopArticleIndex);

        const onLoadNextPart = useCallback(() => {
            dispatch(fetchNextArticlesPage());
        }, [dispatch]);

        const handleSaveArticlesPageScrollPosition = useCallback(
            (index: number) => dispatch(setScrollStopArticleIndex(index)),
            [dispatch, setScrollStopArticleIndex],
        );

        const handleClick = useCallback(() => {
            virtuosoGridRef.current?.scrollToIndex({
                index: 0,
                align: 'start',
                behavior: 'smooth',
            });
        }, []);

        const renderArticle = useCallback(
            (index: number, article: Article) => (
                <ArticleCard
                    article={article}
                    view={view}
                    key={article.id}
                    index={index}
                    handleClick={() =>
                        handleSaveArticlesPageScrollPosition(index)
                    }
                />
            ),
            [view, handleSaveArticlesPageScrollPosition],
        );
        const ScrollSeekPlaceholder = memo(() => (
            <ArticleInfiniteListSkeleton view={view} />
        ));

        const Header = memo(() => (
            <div className={cls.scrollButton}>
                <ScrollToTopButton scrollToTop={handleClick} />
            </div>
        ));

        return (
            <VirtuosoGrid
                ref={virtuosoGridRef}
                components={{
                    ScrollSeekPlaceholder,
                    Header,
                }}
                useWindowScroll
                endReached={onLoadNextPart}
                data={articles}
                totalCount={articles.length}
                itemContent={renderArticle}
                listClassName={cls.itemsWrapper}
                scrollSeekConfiguration={{
                    enter: (velocity) => Math.abs(velocity) > 200,
                    exit: (velocity) => Math.abs(velocity) < 30,
                }}
            />
        );
    },
);

export const ArticleInfiniteList = memo(() => {
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useArticlesPageIsLoading();
    const view = useArticlesPageView();
    const error = useArticlesPageError();
    const { t } = useTranslation('articles');
    const errorMessage = t('Помилка запиту статей');

    const isNoArticlesFounded = useNoArticlesFound(isLoading, articles);

    if (error) {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<Text text={errorMessage} align="center" variant="error" />}
                off={
                    <TextDeprecated
                        text={errorMessage}
                        align={TextAlign.CENTER}
                        theme={TextTheme.ERROR}
                    />
                }
            />
        );
    }

    if (isNoArticlesFounded) {
        return <NoArticlesFound view={view} />;
    }

    if (view === ArticleView.LIST) {
        return <InfiniteArticlesListView view={view} />;
    }

    return <InfiniteArticlesGridView view={view} />;
});
