import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DeprecatedArticleInfiniteList } from './DeprecatedArticleInfiniteList/DeprecatedArticleInfiniteList';
import { ArticleList, ArticleView, useArticles } from '@/entities/Article';

export interface ArticleInfiniteListProps {
    onInfiniteScroll: () => void;
}

export const ArticleInfiniteList = memo(
    ({ onInfiniteScroll }: ArticleInfiniteListProps) => {
        const { data: articles, isLoading: isArticlesLoading } = useArticles(
            {},
        );
        if (!articles) return null;
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<ArticleList view={ArticleView.GRID} articles={articles} />}
                off={
                    <DeprecatedArticleInfiniteList
                        onInfiniteScroll={onInfiniteScroll}
                    />
                }
            />
        );
    },
);

// <RedesignedArticleInfiniteList
//     onInfiniteScroll={onInfiniteScroll}
// />
