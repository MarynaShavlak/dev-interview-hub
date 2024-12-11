import React, { useEffect, useState } from 'react';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { Configure, InstantSearch } from 'react-instantsearch-core';
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

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const searchClient = algoliasearch(
    '6L3XOJ5FZ8',
    '5fac3ea964aecac5d90374450bd541ab',
);

export const RedesignedArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const { sort, limit } = useArticleFilters();
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
                    <Configure hitsPerPage={limit} />
                    {/* <VirtualPagination /> */}
                    <StickyContentLayout
                        left={<ViewSelectorContainer />}
                        right={<FiltersContainer />}
                        content={<ArticlesPageContent />}
                    />
                </InstantSearch>
            )}
        </DynamicModuleLoader>
    );
};
