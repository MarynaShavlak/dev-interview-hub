import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DeprecatedArticleInfiniteList } from './DeprecatedArticleInfiniteList/DeprecatedArticleInfiniteList';
import { ArticleList, getArticles, useArticles } from '@/entities/Article';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters/useArticleFilters';

export interface ArticleInfiniteListProps {
    onInfiniteScroll: () => void;
}

export const ArticleInfiniteList = memo(
    ({ onInfiniteScroll }: ArticleInfiniteListProps) => {
        const { isLoading: isArticlesLoading } = useArticles();
        const articles = useSelector(getArticles.selectAll);
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
