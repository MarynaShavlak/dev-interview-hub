import React from 'react';
import { Pagination } from 'react-instantsearch';

import { ArticlePageGreeting } from '@/features/ArticlePageGreeting';

import cls from '../ArticlesPage/ArticlesPage.module.scss';

import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { VStack } from '@/shared/ui/common/Stack';
import { ArticleList, useGetArticles } from '@/entities/Article';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters/useArticleFilters';

export const ArticlesPageContent = () => {
    const { data: articles, isLoading: isArticlesLoading } = useGetArticles();
    console.log('articles', articles);

    const { view } = useArticleFilters();

    return (
        <VStack
            gap="24"
            justify="between"
            className={classNames(cls.ArticlesPageRedesigned, {}, [])}
            data-testid="ArticlesPage"
        >
            <ArticleList view={view} />
            <Pagination
                classNames={{
                    list: cls.pagList,
                    root: cls.pagWrap,
                    item: cls.pagItem,
                    selectedItem: cls.pagSelectedItem,
                    link: cls.pagLink,
                    disabledItem: cls.pagDisabledItem,
                }}
            />

            <ArticlePageGreeting />
        </VStack>
    );
};
