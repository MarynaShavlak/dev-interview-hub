import {
    Configure,
    InstantSearch,
    usePagination,
} from 'react-instantsearch-core';
import { ReactNode } from 'react';
import { createRoutingConfig } from '../../model/config/routingConfig';
import { searchClient } from '@/shared/config/firebase/searchClient';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters/useArticleFilters';
import { useAlgoliaIndex } from '../../lib/hooks/useAlgoliaIndex/useAlgoliaIndex';

interface ArticlesSearchProps {
    children: ReactNode;
}

const VirtualPagination = () => {
    usePagination();
    return null;
};
export const ArticlesAlgoliaSearch = ({ children }: ArticlesSearchProps) => {
    const { limit } = useArticleFilters();
    const indexName = useAlgoliaIndex();
    const routing = createRoutingConfig(indexName);

    return (
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
            {children}
        </InstantSearch>
    );
};
