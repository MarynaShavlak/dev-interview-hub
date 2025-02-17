import React, { memo, useCallback } from 'react';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import { useSelector } from 'react-redux';
import {
    Article,
    ArticleCard,
    ArticleListSkeleton,
    ArticleView,
} from '@/entities/Article';
import {
    useArticlesPageError,
    useArticlesPageIsLoading,
    useArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { useNoArticlesFound } from '../../lib/hooks/useNoArticlesFound/useNoArticlesFound';
import { useArticlesScroll } from '../../lib/hooks/useArticlesScroll/useArticlesScroll';
import { useGridSkeletonVisibility } from '../../lib/hooks/useGridSkeletonVisibility/useGridSkeletonVisibility';
import cls from './ArticleInfiniteList.module.scss';
import { ArticleInfiniteListError } from './ArticleInfiniteListError/ArticleInfiniteListError';
import { useArticleListFetcher } from '../../lib/hooks/useArticlesPage/useArticleListFetcher';
import { getArticles } from '../../model/slices/articlesPageSlice';
import { ArticlesInfiniteListHeader } from './ArticlesInfiniteListHeader/ArticlesInfiniteListHeader';
import { EmptyArticleInfiniteList } from './EmptyArticleInfiniteList/EmptyArticleInfiniteList';
import { LoadingView } from './LoadingView/LoadingView';
import { ArticleGridView } from './ArticleGridView/ArticleGridView';

// export interface ArticleInfiniteListProps {
//     onInfiniteScroll: () => void;
// }

export interface CommonPropsType {
    data: Article[];
    endReached: () => void;
    itemContent: (index: number, article: Article) => JSX.Element;
}

export const ArticleInfiniteList = memo(() => {
    const { onLoadNextPart } = useArticleListFetcher();

    const articles = useSelector(getArticles.selectAll);
    console.log('!!!!articles', articles);
    const isLoading = useArticlesPageIsLoading();
    const view = useArticlesPageView();
    const error = useArticlesPageError();
    const isNoArticlesFounded = useNoArticlesFound(isLoading, articles);
    const {
        listRef,
        gridRef,
        handleSaveArticlesPageScrollPosition,
        scrollStopArticleIndex,
    } = useArticlesScroll();

    const shouldShowGridSkeleton = useGridSkeletonVisibility();

    const renderArticle = useCallback(
        (index: number, article: Article) => (
            <ArticleCard
                article={article}
                view={view}
                key={article.id}
                handleClick={handleSaveArticlesPageScrollPosition(index)}
            />
        ),
        [view, handleSaveArticlesPageScrollPosition],
    );

    const Footer = memo(() => {
        if (isLoading) {
            return <ArticleListSkeleton view={ArticleView.LIST} />;
        }
        return null;
    });

    const ScrollSeekPlaceholder = memo(() => (
        <ArticleListSkeleton view={ArticleView.GRID} />
    ));

    if (error) {
        return <ArticleInfiniteListError />;
    }

    const commonProps: CommonPropsType = {
        data: articles,
        endReached: onLoadNextPart,
        itemContent: renderArticle,
    };

    if (!articles) return null;

    const ArticlesGridLayout = (
        <VirtuosoGrid
            {...commonProps}
            ref={gridRef}
            components={{
                ScrollSeekPlaceholder,
                Header: ArticlesInfiniteListHeader,
            }}
            style={{
                height: 'calc(100vh - 80px)',
            }}
            itemContent={renderArticle}
            listClassName={cls.itemsWrapper}
            scrollSeekConfiguration={{
                enter: (velocity) => Math.abs(velocity) > 200,
                exit: (velocity) => Math.abs(velocity) < 30,
            }}
            data-testid="ArticleList"
        />
    );

    if (view === ArticleView.LIST) {
        return isNoArticlesFounded ? (
            <EmptyArticleInfiniteList />
        ) : (
            <div
                className={cls.ArticlesPageDeprecated}
                data-testid="ArticleList"
            >
                <Virtuoso
                    {...commonProps}
                    ref={listRef}
                    style={{
                        height: 'calc(100vh - 80px)',
                    }}
                    initialTopMostItemIndex={scrollStopArticleIndex}
                    components={{
                        Footer,
                        Header: ArticlesInfiniteListHeader,
                    }}
                />
            </div>
        );
    }

    return (
        <div className={cls.ArticlesPageDeprecated} data-testid="ArticlesPage">
            {shouldShowGridSkeleton ? (
                <LoadingView />
            ) : isNoArticlesFounded ? (
                <EmptyArticleInfiniteList />
            ) : (
                <ArticleGridView {...commonProps} gridRef={gridRef} />
            )}
        </div>
    );
});
