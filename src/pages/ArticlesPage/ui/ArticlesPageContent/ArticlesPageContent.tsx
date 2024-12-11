import React from 'react';
import { Pagination } from 'react-instantsearch';

import { useSearchParams } from 'react-router-dom';
import { ArticlePageGreeting } from '@/features/ArticlePageGreeting';

import cls from '../ArticlesPage/ArticlesPage.module.scss';

import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { VStack } from '@/shared/ui/common/Stack';
import { ArticleList } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters/useArticleFilters';

export const ArticlesPageContent = () => {
    // const { data: articles, isLoading: isArticlesLoading } = useArticles({});

    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });
    const { view } = useArticleFilters();

    // if (isArticlesLoading) return <p>11111</p>;
    // if (!articles) return null;
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
