import React, { useEffect, useState } from 'react';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { Configure, InstantSearch } from 'react-instantsearch-core';
import { useSearchParams } from 'react-router-dom';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ViewSelectorContainer } from '../../ViewSelectorContainer/ViewSelectorContainer';
import { ArticlesPageProps } from '../ArticlesPage';
import { FiltersContainer } from '../../FiltersContainer/FiltersContainer';

import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlesPageReducer } from '../../../model/slices/articlesPageSlice';

import { useArticleFilters } from '../../../lib/hooks/useArticleFilters/useArticleFilters';
import { createRoutingConfig } from '@/widgets/ArticlesFilters';
import { ArticleSortField } from '@/entities/Article';
import { ArticlesPageContent } from '../../ArticlesPageContent/ArticlesPageContent';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { initArticlesPage } from '../../../model/services/initArticlesPage/initArticlesPage';
import { VStack } from '@/shared/ui/common/Stack';
import { ArticleCreateNavigationButton } from '@/features/ArticleCreateNavigationButton';

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const searchClient = algoliasearch(
    '6L3XOJ5FZ8',
    '5fac3ea964aecac5d90374450bd541ab',
);

export const RedesignedArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });
    const { sort, limit } = useArticleFilters();
    const [indexName, setIndexName] = useState<ArticleSortField>(sort);

    const routing = createRoutingConfig(indexName);
    searchClient.clearCache();

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
                    <Configure hitsPerPage={limit} />
                    {/* <VirtualPagination /> */}
                    <StickyContentLayout
                        left={
                            <VStack gap="24">
                                <ViewSelectorContainer />
                                <ArticleCreateNavigationButton />
                            </VStack>
                        }
                        right={<FiltersContainer />}
                        content={<ArticlesPageContent />}
                    />
                </InstantSearch>
            )}
        </DynamicModuleLoader>
    );
};
