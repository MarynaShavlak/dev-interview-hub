import React from 'react';
import { usePagination } from 'react-instantsearch-core';
import { useSearchParams } from 'react-router-dom';

import { ArticlesPageProps } from '../ArticlesPage';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlesPageReducer } from '../../../model/slices/articlesPageSlice';
import { useArticleFilters } from '../../../lib/hooks/useArticleFilters/useArticleFilters';
import { initArticlesPage } from '../../../model/services/initArticlesPage/initArticlesPage';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';

import { useAlgoliaIndex } from '../../../lib/hooks/useAlgoliaIndex/useAlgoliaIndex';
import { createRoutingConfig } from '../../../model/config/routingConfig';
import { searchClient } from '@/shared/config/firebase/searchClient';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ArticlesAlgoliaSearch } from '../../ArticlesAlgoliaSearch/ArticlesAlgoliaSearch';
import { ViewSelectorContainer } from '../../ViewSelectorContainer/ViewSelectorContainer';
import { VStack } from '@/shared/ui/common/Stack';
import { FiltersContainer } from '../../FiltersContainer/FiltersContainer';
import { ArticleCreateNavigationButton } from '@/features/ArticleCreateNavigationButton';
import { ArticlesPageContent } from '../../ArticlesPageContent/ArticlesPageContent';

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
                <ArticlesAlgoliaSearch indexName={indexName}>
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
                </ArticlesAlgoliaSearch>
            )}
            {/* {searchClient && ( */}
            {/*    <InstantSearch */}
            {/*        searchClient={searchClient} */}
            {/*        indexName={indexName} */}
            {/*        routing={routing} */}
            {/*        future={{ */}
            {/*            preserveSharedStateOnUnmount: true, */}
            {/*        }} */}
            {/*    > */}
            {/*        <Configure hitsPerPage={limit} /> */}
            {/*        <VirtualPagination /> */}
            {/*        <StickyContentLayout */}
            {/*            left={ */}
            {/*                <VStack gap="24"> */}
            {/*                    <ViewSelectorContainer /> */}
            {/*                </VStack> */}
            {/*            } */}
            {/*            right={ */}
            {/*                <VStack gap="24"> */}
            {/*                    <FiltersContainer /> */}
            {/*                    <ArticleCreateNavigationButton /> */}
            {/*                </VStack> */}
            {/*            } */}
            {/*            content={<ArticlesPageContent />} */}
            {/*        /> */}
            {/*    </InstantSearch> */}
            {/* )} */}
        </DynamicModuleLoader>
    );
};
