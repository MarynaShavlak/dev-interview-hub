import React, { memo, useCallback } from 'react';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import {
    Article,
    ArticleCard,
    ArticleCategory,
    ArticleListSkeleton,
    ArticleView,
    NoArticlesFound,
    useGetFilteredArticles,
} from '@/entities/Article';
import {
    useArticlesPageError,
    useArticlesPageIsLoading,
    useArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { useNoArticlesFound } from '../../lib/hooks/useNoArticlesFound/useNoArticlesFound';
import { useArticlesScroll } from '../../lib/hooks/useArticlesScroll/useArticlesScroll';
import { useGridSkeletonVisibility } from '../../lib/hooks/useGridSkeletonVisibility/useGridSkeletonVisibility';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';
import cls from './ArticleInfiniteList.module.scss';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { ArticleInfiniteListError } from './ArticleInfiniteListError/ArticleInfiniteListError';
import { Page } from '@/widgets/Page';

export interface ArticleInfiniteListProps {
    onInfiniteScroll: () => void;
}

export const ArticleInfiniteList = memo(
    ({ onInfiniteScroll }: ArticleInfiniteListProps) => {
        // const articles = useSelector(selectAllArticles);
        // console.log('articles', articles);

        const {
            data: articles,
            isLoading: isArticlesLoading,
            error: isArticlesError,
        } = useGetFilteredArticles({
            order: 'asc',
            sort: 'title',
            limit: 10,
            category: [ArticleCategory.CSS] || [],
            // search: 'таке',
            search: '',
            page: 3,
        });

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

        console.log('__data', articles);

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

        const Header = memo(() => {
            return (
                <div className={cls.controlsWrap}>
                    <FiltersContainer />
                    <ViewSelectorContainer className={cls.viewSelector} />
                </div>
            );
        });

        if (error) {
            return <ArticleInfiniteListError />;
        }

        if (isNoArticlesFounded) {
            return <NoArticlesFound view={view} />;
        }

        const commonProps = {
            data: articles,
            endReached: onInfiniteScroll,
            itemContent: renderArticle,
        };

        if (!articles) return null;

        if (view === ArticleView.LIST) {
            return (
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
                            Header,
                        }}
                    />
                </div>
            );
        }

        return (
            <div
                className={cls.ArticlesPageDeprecated}
                data-testid="ArticlesPage"
            >
                {shouldShowGridSkeleton ? (
                    <Page>
                        <div className={cls.controlsSkeletonWrap}>
                            <FiltersContainer />
                            <ViewSelectorContainer
                                className={cls.viewSelector}
                            />
                        </div>
                        <ArticleListSkeleton view={ArticleView.GRID} />
                    </Page>
                ) : (
                    <VirtuosoGrid
                        {...commonProps}
                        ref={gridRef}
                        components={{
                            ScrollSeekPlaceholder,
                            Header,
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
                )}
            </div>
        );
    },
);
