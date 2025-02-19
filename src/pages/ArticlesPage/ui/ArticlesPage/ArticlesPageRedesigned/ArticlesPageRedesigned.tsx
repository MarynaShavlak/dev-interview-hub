import React from 'react';
import {
    Configure,
    InstantSearch,
    usePagination,
} from 'react-instantsearch-core';
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
import { ArticlesPageContent } from '../../ArticlesPageContent/ArticlesPageContent';
import { VStack } from '@/shared/ui/common/Stack';
import { ArticleCreateNavigationButton } from '@/features/ArticleCreateNavigationButton';
import { searchClient } from '@/shared/config/firebase/searchClient';
import { initArticlesPage } from '../../../model/services/initArticlesPage/initArticlesPage';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';

import { useAlgoliaIndex } from '../../../lib/hooks/useAlgoliaIndex/useAlgoliaIndex';
import { createRoutingConfig } from '../../../model/config/routingConfig';

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const VirtualPagination = () => {
    usePagination();
    return null; // This ensures `page` state is recognized but does not render anything
};

export const ArticlesPageRedesigned = (props: ArticlesPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    //
    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });
    const { limit } = useArticleFilters();
    const indexName = useAlgoliaIndex();

    //
    const routing = createRoutingConfig(indexName);
    // searchClient.clearCache();

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
                    <VirtualPagination />
                    <StickyContentLayout
                        left={
                            <VStack gap="24">
                                <ViewSelectorContainer />
                            </VStack>
                        }
                        right={
                            <VStack gap="24">
                                <FiltersContainer />
                                <ArticleCreateNavigationButton />
                            </VStack>
                        }
                        content={<ArticlesPageContent />}
                    />
                </InstantSearch>
            )}
        </DynamicModuleLoader>
    );
};
