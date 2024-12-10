import React, { useEffect, useState } from 'react';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-core';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ViewSelectorContainer } from '../../ViewSelectorContainer/ViewSelectorContainer';
import { ArticlesPageProps } from '../ArticlesPage';
import { FiltersContainer } from '../../FiltersContainer/FiltersContainer';

import { ArticlePageGreeting } from '@/features/ArticlePageGreeting';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlesPageReducer } from '../../../model/slices/articlesPageSlice';
import { useArticleListFetcher } from '../../../lib/hooks/useArticlesPage/useArticleListFetcher';
import cls from '../ArticlesPage.module.scss';
import { ArticleInfiniteList } from '../../ArticleInfiniteList/ArticleInfiniteList';

import { useArticleFilters } from '../../../lib/hooks/useArticleFilters/useArticleFilters';
import { createRoutingConfig } from '@/widgets/ArticlesFilters';
import { ArticleSortField } from '@/entities/Article';

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const searchClient = algoliasearch(
    '6L3XOJ5FZ8',
    '5fac3ea964aecac5d90374450bd541ab',
);

export const RedesignedArticlesPage = (props: ArticlesPageProps) => {
    const { onLoadNextPart } = useArticleListFetcher();
    const { sort } = useArticleFilters();
    const [indexName, setIndexName] = useState<ArticleSortField>(sort);

    const routing = createRoutingConfig(indexName);

    useEffect(() => {
        if (sort) {
            setIndexName(sort);
        }
    }, [sort]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            {searchClient && (
                <InstantSearch
                    searchClient={searchClient}
                    indexName={indexName}
                    routing={routing}
                    future={{
                        preserveSharedStateOnUnmount: true,
                    }}
                >
                    <StickyContentLayout
                        left={<ViewSelectorContainer />}
                        right={<FiltersContainer />}
                        content={
                            <main
                                className={cls.ArticlesPageRedesigned}
                                data-testid="ArticlesPage"
                            >
                                <ArticleInfiniteList
                                    onInfiniteScroll={onLoadNextPart}
                                />

                                <ArticlePageGreeting />
                            </main>
                        }
                    />
                </InstantSearch>
            )}
        </DynamicModuleLoader>
    );
};
