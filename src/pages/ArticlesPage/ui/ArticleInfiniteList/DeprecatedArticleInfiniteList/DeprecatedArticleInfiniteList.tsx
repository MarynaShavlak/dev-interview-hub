import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import { getArticles } from '../../../model/slices/articlesPageSlice';
import {
    useArticlesPageError,
    useArticlesPageIsLoading,
    useArticlesPageView,
} from '../../../model/selectors/articlesPageSelectors';
import { useNoArticlesFound } from '../../../lib/hooks/useNoArticlesFound/useNoArticlesFound';
import {
    Article,
    ArticleCard,
    ArticleListSkeleton,
    ArticleView,
    NoArticlesFound,
} from '@/entities/Article';
import cls from '../ArticleInfiniteList.module.scss';
import { FiltersContainer } from '../../FiltersContainer/FiltersContainer';
import { ViewSelectorContainer } from '../../ViewSelectorContainer/ViewSelectorContainer';
import { ArticleInfiniteListError } from '../ArticleInfiniteListError/ArticleInfiniteListError';
import { Page } from '@/widgets/Page';
import { ArticleInfiniteListProps } from '../ArticleInfiniteList';
import { useArticlesScroll } from '../../../lib/hooks/useArticlesScroll/useArticlesScroll';
import { useGridSkeletonVisibility } from '../../../lib/hooks/useGridSkeletonVisibility/useGridSkeletonVisibility';

export const DeprecatedArticleInfiniteList = memo(
    ({ onInfiniteScroll }: ArticleInfiniteListProps) => {
        const articles = useSelector(getArticles.selectAll);
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

        if (view === ArticleView.LIST) {
            return (
                <div className={cls.ArticlesPageDeprecated}>
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
                            height: '100%',
                        }}
                        itemContent={renderArticle}
                        listClassName={cls.itemsWrapper}
                        scrollSeekConfiguration={{
                            enter: (velocity) => Math.abs(velocity) > 200,
                            exit: (velocity) => Math.abs(velocity) < 30,
                        }}
                    />
                )}
            </div>
        );
    },
);
