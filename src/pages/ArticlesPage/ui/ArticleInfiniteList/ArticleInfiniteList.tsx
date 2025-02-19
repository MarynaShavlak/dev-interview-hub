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

interface ArticleInfiniteListProps {
    onInfiniteScroll: () => void;
}
export const ArticleInfiniteList = memo(
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

        if (error) {
            return <ArticleInfiniteListError />;
        }

        const commonProps: CommonPropsType = {
            data: articles,
            endReached: onInfiniteScroll,
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
            <div
                className={cls.ArticlesPageDeprecated}
                data-testid="ArticlesPage"
            >
                {shouldShowGridSkeleton ? (
                    <LoadingView />
                ) : (
                    <ArticleGridView {...commonProps} gridRef={gridRef} />
                )}
            </div>
        );
    },
);

export {};

// import { memo, useCallback } from 'react';
// import { useSelector } from 'react-redux';
// import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
//
// import {
//     useArticlesPageError,
//     useArticlesPageIsLoading,
//     useArticlesPageView,
// } from '../../../model/selectors/articlesPageSelectors';
// import { useNoArticlesFound } from '../../../lib/hooks/useNoArticlesFound/useNoArticlesFound';
// import {
//     Article,
//     ArticleCard,
//     ArticleListSkeleton,
//     ArticleView,
//     getArticles,
//     NoArticlesFound,
// } from '@/entities/Article';
// import cls from '../ArticleInfiniteList.module.scss';
// import { ScrollToTopButton } from '@/features/ScrollToTopButton';
// import { ArticleInfiniteListError } from '../ArticleInfiniteListError/ArticleInfiniteListError';
// import { ArticleInfiniteListProps } from '../ArticleInfiniteList';
// import { useArticlesScroll } from '../../../lib/hooks/useArticlesScroll/useArticlesScroll';
// import { Page } from '@/widgets/Page';
// import { useGridSkeletonVisibility } from '../../../lib/hooks/useGridSkeletonVisibility/useGridSkeletonVisibility';
//
// export const RedesignedArticleInfiniteList = ({
//     onInfiniteScroll,
// }: ArticleInfiniteListProps) => {
//     const articles = useSelector(getArticles.selectAll);
//     const isLoading = useArticlesPageIsLoading();
//     const view = useArticlesPageView();
//     const error = useArticlesPageError();
//     const isNoArticlesFounded = useNoArticlesFound(isLoading, articles);
//
//     const {
//         listRef,
//         gridRef,
//         handleSaveArticlesPageScrollPosition,
//         scrollStopArticleIndex,
//         scrollVirtuosoGridToTop,
//         scrollVirtuosoListToTop,
//     } = useArticlesScroll();
//
//     const shouldShowGridSkeleton = useGridSkeletonVisibility();
//
//     const renderArticle = useCallback(
//         (index: number, article: Article) => (
//             <ArticleCard
//                 article={article}
//                 view={view}
//                 key={article.id}
//                 handleClick={handleSaveArticlesPageScrollPosition(index)}
//             />
//         ),
//         [view, handleSaveArticlesPageScrollPosition],
//     );
//
//     const Footer = memo(() => {
//         if (isLoading) {
//             return <ArticleListSkeleton view={ArticleView.LIST} />;
//         }
//         return null;
//     });
//
//     const ScrollSeekPlaceholder = memo(() => (
//         <ArticleListSkeleton view={ArticleView.GRID} />
//     ));
//
//     const Header = memo(() => {
//         const scrollToTop =
//             view === ArticleView.LIST
//                 ? scrollVirtuosoListToTop
//                 : scrollVirtuosoGridToTop;
//
//         return (
//             <div className={cls.scrollButton}>
//                 <ScrollToTopButton scrollToTop={scrollToTop} />
//             </div>
//         );
//     });
//
//     if (error) {
//         return <ArticleInfiniteListError />;
//     }
//
//     if (isNoArticlesFounded) {
//         return <NoArticlesFound view={view} />;
//     }
//
//     const commonProps = {
//         data: articles,
//         endReached: onInfiniteScroll,
//         itemContent: renderArticle,
//         useWindowScroll: true,
//     };
//
//     if (view === ArticleView.LIST) {
//         return (
//             <Virtuoso
//                 {...commonProps}
//                 ref={listRef}
//                 style={{ height: '100vh' }}
//                 initialTopMostItemIndex={scrollStopArticleIndex}
//                 components={{
//                     Footer,
//                     Header,
//                 }}
//                 data-testid="ArticleList"
//             />
//         );
//     }
//
//     return (
//         // eslint-disable-next-line react/jsx-no-useless-fragment
//         <>
//             {shouldShowGridSkeleton ? (
//                 <Page>
//                     <ArticleListSkeleton view={ArticleView.GRID} />
//                 </Page>
//             ) : (
//                 <VirtuosoGrid
//                     {...commonProps}
//                     ref={gridRef}
//                     components={{
//                         ScrollSeekPlaceholder,
//                         Header,
//                     }}
//                     listClassName={cls.itemsWrapper}
//                     scrollSeekConfiguration={{
//                         enter: (velocity) => Math.abs(velocity) > 200,
//                         exit: (velocity) => Math.abs(velocity) < 30,
//                     }}
//                     data-testid="ArticleList"
//                 />
//             )}
//         </>
//     );
// };
