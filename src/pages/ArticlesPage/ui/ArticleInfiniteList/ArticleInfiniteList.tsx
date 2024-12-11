import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DeprecatedArticleInfiniteList } from './DeprecatedArticleInfiniteList/DeprecatedArticleInfiniteList';
import { ArticleList, useArticles } from '@/entities/Article';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters/useArticleFilters';

export interface ArticleInfiniteListProps {
    onInfiniteScroll: () => void;
}

export const ArticleInfiniteList = memo(
    ({ onInfiniteScroll }: ArticleInfiniteListProps) => {
        const { data: articles, isLoading: isArticlesLoading } = useArticles();
        const { view } = useArticleFilters();
        if (!articles) return null;
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<ArticleList view={view} articles={articles} />}
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
