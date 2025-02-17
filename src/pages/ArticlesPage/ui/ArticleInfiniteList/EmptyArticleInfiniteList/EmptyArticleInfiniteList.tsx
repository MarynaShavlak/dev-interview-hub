import React, { memo } from 'react';
import cls from '../ArticleInfiniteList.module.scss';
import { ArticlesInfiniteListHeader } from '../ArticlesInfiniteListHeader/ArticlesInfiniteListHeader';
import { NoArticlesFound } from '@/entities/Article';

export const EmptyArticleInfiniteList = memo(() => {
    return (
        <div className={cls.ArticlesPageDeprecated} data-testid="ArticlesPage">
            <ArticlesInfiniteListHeader />
            <NoArticlesFound />
        </div>
    );
});
