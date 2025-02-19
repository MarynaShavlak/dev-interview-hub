import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-instantsearch';

import { useHits } from 'react-instantsearch-core';
import { ArticlePageGreeting } from '@/features/ArticlePageGreeting';

import cls from '../ArticlesPage/ArticlesPage.module.scss';

import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { VStack } from '@/shared/ui/common/Stack';
import { ArticleList, NoArticlesFound } from '@/entities/Article';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters/useArticleFilters';
import { transformItems } from '../../lib/utilities/transformItems/transformItems';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

export const ArticlesPageContent = () => {
    const { view } = useArticleFilters();
    const { items, results, hits } = useHits({});

    let page = 0;
    if (results) {
        page = results.page;
    }

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (hits && hits.length > 0) {
            setIsLoading(false);
        }
    }, [hits]);

    const articlesToRender = transformItems(items);

    if (isLoading) {
        return (
            <Skeleton width="100%" height="calc(100vh - 64px)" border="12px" />
        );
    }
    if (articlesToRender.length === 0) {
        return <NoArticlesFound />;
    }

    return (
        <VStack
            gap="24"
            justify="between"
            className={classNames(cls.ArticlesPageRedesigned, {}, [])}
            data-testid="ArticlesPage"
        >
            <ArticleList
                view={view}
                page={page}
                articlesToRender={articlesToRender}
            />
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
