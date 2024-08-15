import { memo, RefObject, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
    Virtuoso,
    VirtuosoGrid,
    VirtuosoGridHandle,
    VirtuosoHandle,
} from 'react-virtuoso';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import {
    Text as TextDeprecated,
    TextAlign,
    TextTheme,
} from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import {
    getArticles,
    useArticlesPageActions,
} from '../../model/slices/articlesPageSlice';
import {
    useArticlesPageError,
    useArticlesPageIsLoading,
    useArticlesPageView,
    useScrollStopArticleIndex,
} from '../../model/selectors/articlesPageSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
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
import { ScrollToTopButton } from '@/features/scrollToTopButton';

interface ArticleInfiniteListProps {
    onInfiniteScroll: () => void;
}

export const ArticleInfiniteList = memo(
    ({ onInfiniteScroll }: ArticleInfiniteListProps) => {
        const dispatch = useAppDispatch();
        const articles = useSelector(getArticles.selectAll);
        const isLoading = useArticlesPageIsLoading();
        const view = useArticlesPageView();
        const error = useArticlesPageError();
        const { t } = useTranslation('articles');
        const errorMessage = t('Помилка запиту статей');
        const isNoArticlesFounded = useNoArticlesFound(isLoading, articles);

        const { setScrollStopArticleIndex } = useArticlesPageActions();
        const scrollStopArticleIndex = useScrollStopArticleIndex();
        const virtuosoListRef = useRef<VirtuosoHandle>(null);
        const virtuosoGridRef = useVirtuosoGrid(scrollStopArticleIndex);

        const handleSaveArticlesPageScrollPosition = useCallback(
            (index: number) => () => {
                dispatch(setScrollStopArticleIndex(index));
            },
            [dispatch, setScrollStopArticleIndex],
        );
        const scrollToTop = useCallback(
            (
                ref: RefObject<VirtuosoHandle> | RefObject<VirtuosoGridHandle>,
            ) => {
                ref.current?.scrollToIndex({
                    index: 0,
                    align: 'start',
                    behavior: 'smooth',
                });
            },
            [],
        );

        const scrollVirtuosoGridToTop = useCallback(() => {
            scrollToTop(virtuosoGridRef);
        }, [scrollToTop, virtuosoGridRef]);

        const scrollVirtuosoListToTop = useCallback(() => {
            scrollToTop(virtuosoListRef);
        }, [scrollToTop, virtuosoListRef]);

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
            const scrollToTop =
                view === ArticleView.LIST
                    ? scrollVirtuosoListToTop
                    : scrollVirtuosoGridToTop;

            return (
                <div className={cls.scrollButton}>
                    <ScrollToTopButton scrollToTop={scrollToTop} />
                </div>
            );
        });

        if (error) {
            return (
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={
                        <Text
                            text={errorMessage}
                            align="center"
                            variant="error"
                        />
                    }
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

        const commonProps = {
            data: articles,
            endReached: onInfiniteScroll,
            itemContent: renderArticle,
            useWindowScroll: true,
        };

        if (view === ArticleView.LIST) {
            return (
                <Virtuoso
                    {...commonProps}
                    ref={virtuosoListRef}
                    style={{ height: '100vh' }}
                    initialTopMostItemIndex={scrollStopArticleIndex}
                    components={{
                        Footer,
                        Header,
                    }}
                />
            );
        }

        return (
            <VirtuosoGrid
                {...commonProps}
                ref={virtuosoGridRef}
                components={{
                    ScrollSeekPlaceholder,
                    Header,
                }}
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
