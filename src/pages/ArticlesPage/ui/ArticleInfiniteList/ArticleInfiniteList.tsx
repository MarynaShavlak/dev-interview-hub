import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Article, ArticleCard, ArticleView } from '@/entities/Article';
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
import { EmptyArticleInfiniteList } from './EmptyArticleInfiniteList/EmptyArticleInfiniteList';
import { LoadingView } from './LoadingView/LoadingView';
import { ArticleGridView } from './ArticleGridView/ArticleGridView';
import { ArticleListView } from './ArticleListView/ArticleListView';

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

    if (error) {
        return <ArticleInfiniteListError />;
    }

    const commonProps: CommonPropsType = {
        data: articles,
        endReached: onLoadNextPart,
        itemContent: renderArticle,
    };
    if (isNoArticlesFounded) {
        return <EmptyArticleInfiniteList />;
    }
    if (!articles) return null;

    if (view === ArticleView.LIST) {
        return (
            <ArticleListView
                {...commonProps}
                listRef={listRef}
                isLoading={isLoading}
                scrollStopArticleIndex={scrollStopArticleIndex}
            />
        );
    }

    return (
        <div className={cls.ArticlesPageDeprecated} data-testid="ArticlesPage">
            {shouldShowGridSkeleton ? (
                <LoadingView />
            ) : (
                <ArticleGridView {...commonProps} gridRef={gridRef} />
            )}
        </div>
    );
});
