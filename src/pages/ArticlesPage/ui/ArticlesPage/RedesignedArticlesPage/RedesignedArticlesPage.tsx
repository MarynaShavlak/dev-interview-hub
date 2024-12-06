import { Configure, InstantSearch } from 'react-instantsearch-core';
import React from 'react';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
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
import { createRoutingConfig } from '../../../model/config/routingConfig';

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};
const searchClient = algoliasearch(
    '6L3XOJ5FZ8', // Application ID
    '5fac3ea964aecac5d90374450bd541ab', // Search-Only API Key
);

export const RedesignedArticlesPage = (props: ArticlesPageProps) => {
    const { onLoadNextPart } = useArticleListFetcher();
    const { sort } = useArticleFilters();
    console.log('i set this as index', sort);
    const routing = createRoutingConfig(sort);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <InstantSearch
                searchClient={searchClient}
                indexName={sort}
                routing={routing}
                future={{
                    preserveSharedStateOnUnmount: false,
                }}
            >
                <Configure hitsPerPage={200} />
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
        </DynamicModuleLoader>
    );
};
