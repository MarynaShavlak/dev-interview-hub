import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import { toggleFeatures, ToggleFeaturesComponent } from '@/shared/lib/features';
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
import { classNames } from '@/shared/lib/classes/classNames/classNames';
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

import { getScrollStopArticleIndex } from '@/widgets/ScrollToolbar';

interface ArticleInfiniteListProps {
    className?: string;
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useArticlesPageIsLoading();
    const view = useArticlesPageView() || ArticleView.GRID;
    const error = useArticlesPageError();
    const { t } = useTranslation('articles');
    const errorMessage = t('Помилка запиту статей');

    const isNoArticlesFounded = useNoArticlesFound(isLoading, articles);

    const scrollStopArticleIndex = useSelector(getScrollStopArticleIndex);
    const { virtuosoGridRef, virtuosoListRef } = useVirtuosoGrid(
        view,
        scrollStopArticleIndex,
    );
    console.log(`scrollStopArticleIndex`, scrollStopArticleIndex);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.ArticleListRedesigned,
        off: () => cls.ArticleList,
    });

    const classes = classNames(mainClass, {}, [className, cls[view]]);

    const renderArticle = (index: number, article: Article) => {
        return (
            <ArticleCard
                article={article}
                view={view}
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
        return (
            <Virtuoso
                ref={virtuosoListRef}
                style={{ height: '100vh' }}
                data={articles}
                endReached={onLoadNextPart}
                itemContent={renderArticle}
                useWindowScroll
                initialTopMostItemIndex={scrollStopArticleIndex}
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
});
