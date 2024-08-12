import {
    HTMLAttributeAnchorTarget,
    memo,
    useEffect,
    useRef,
    useState,
} from 'react';
import { Virtuoso, VirtuosoGrid, VirtuosoGridHandle } from 'react-virtuoso';
import cls from './ArticleList.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { Article } from '../../model/types/article';
import { ArticleView } from '../../model/consts/articleConsts';
import { ArticleListSkeleton } from './ArticleListSkeleton/ArticleListSkeleton';
import { ARTICLE_LIST_ITEM_LOCALSTORAGE_IDX } from '@/shared/const/localstorage';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { NoArticlesFound } from './NoArticlesFound/NoArticlesFound';

export interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
    view?: ArticleView;
    onScrollEnd?: () => void;
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        view = ArticleView.GRID,
        isLoading,
        target,
        onScrollEnd,
    } = props;
    const [selectedArticleId, setSelectedArticleId] = useState(1);
    const virtuosoGridRef = useRef<VirtuosoGridHandle>(null);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        if (isLoading === false && articles.length > 0) {
            setHasLoaded(true);
        }
    }, [isLoading, articles]);

    useEffect(() => {
        const paged =
            sessionStorage.getItem(ARTICLE_LIST_ITEM_LOCALSTORAGE_IDX) || 1;
        setSelectedArticleId(+paged);
    }, []);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (view === ArticleView.GRID) {
            timeoutId = setTimeout(() => {
                if (virtuosoGridRef.current) {
                    virtuosoGridRef.current.scrollToIndex(selectedArticleId);
                }
            }, 100);
        }
        return () => clearTimeout(timeoutId);
    }, [selectedArticleId, view]);

    //

    const isNoArticlesFounded = !articles.length && !isLoading && hasLoaded;

    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.ArticleListRedesigned,
        off: () => cls.ArticleList,
    });
    const classes = classNames(mainClass, {}, [
        className,
        cls[view],
        cls.itemsWrapper,
    ]);

    const renderArticle = (index: number, article: Article) => {
        return (
            <ArticleListItem
                article={article}
                view={view}
                target={target}
                key={article.id}
                index={index}
            />
        );
    };

    const Footer = memo(() => {
        if (isLoading) {
            return <ArticleListSkeleton view={view} />;
        }
        return null;
    });
    if (isNoArticlesFounded) {
        return <NoArticlesFound view={view} />;
    }

    if (view === ArticleView.LIST) {
        return (
            <Virtuoso
                style={{ height: '100%' }}
                data={articles}
                endReached={onScrollEnd}
                itemContent={renderArticle}
                useWindowScroll
                initialTopMostItemIndex={selectedArticleId}
                components={{ Footer }}
            />
        );
    }

    return (
        <VirtuosoGrid
            ref={virtuosoGridRef}
            components={{
                ScrollSeekPlaceholder: () => (
                    <ArticleListSkeleton view={view} />
                ),
            }}
            useWindowScroll
            endReached={onScrollEnd}
            data={articles}
            totalCount={articles.length}
            itemContent={renderArticle}
            listClassName={classes}
            scrollSeekConfiguration={{
                enter: (velocity) => Math.abs(velocity) > 200,
                exit: (velocity) => Math.abs(velocity) < 30,
            }}
        />
    );
});

// export const ArticleList = memo((props: ArticleListProps) => {
//     const {
//         className,
//         articles,
//         view = ArticleView.GRID,
//         isLoading,
//         target,
//         onScrollEnd,
//     } = props;
//
//     const [hasLoaded, setHasLoaded] = useState(false);
//
//     useEffect(() => {
//         if (isLoading === false && articles.length > 0) {
//             setHasLoaded(true);
//         }
//     }, [isLoading, articles]);
//
//     const hasSkeletonBeShown = isLoading;
//     const isNoArticlesFounded = !articles.length && !isLoading && hasLoaded;
//
//     const mainClass = toggleFeatures({
//         name: 'isAppRedesigned',
//         on: () => cls.ArticleListRedesigned,
//         off: () => cls.ArticleList,
//     });
//     const classes = classNames(mainClass, {}, [className, cls[view]]);
//
//     const content = (
//         <>
//             <Each
//                 of={articles}
//                 render={(item) => {
//                     return (
//                         <ArticleListItem
//                             article={item}
//                             view={view}
//                             target={target}
//                             key={item.id}
//                         />
//                     );
//                 }}
//             />
//             {hasSkeletonBeShown && <ArticleListSkeleton view={view} />}
//         </>
//     );
//
//     if (isNoArticlesFounded) {
//         return <NoArticlesFound view={view} />;
//     }
//
//     if (view === ArticleView.LIST) {
//         return (
//             <VStack gap="16" className={classes}>
//                 {content}
//             </VStack>
//         );
//     }
//
//     return (
//         <HStack wrap="wrap" gap="16" className={classes}>
//             {content}
//         </HStack>
//     );
// });
