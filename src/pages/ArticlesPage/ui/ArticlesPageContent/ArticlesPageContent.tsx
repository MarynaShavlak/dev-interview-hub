import React, { useEffect, useState } from 'react';

import { useHits } from 'react-instantsearch-core';

import cls from '../ArticlesPage/ArticlesPage.module.scss';

import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { VStack } from '@/shared/ui/common/Stack';
import { ArticleList, NoArticlesFound } from '@/entities/Article';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters/useArticleFilters';
import { transformItems } from '../../lib/utilities/transformItems/transformItems';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { PagePagination } from '@/widgets/PagePagination';

export const ArticlesPageContent = () => {
    const { view } = useArticleFilters();
    const [isLoading, setIsLoading] = useState(true);
    const { items, results, hits } = useHits({});

    let page = 0;
    if (results) {
        page = results.page;
    }

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
            <PagePagination />
        </VStack>
    );
};
