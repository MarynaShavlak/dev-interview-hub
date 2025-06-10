import {
    Configure,
    InstantSearch,
    usePagination,
} from 'react-instantsearch-core';
import { ReactNode } from 'react';
import { searchClient } from '@/shared/config/firebase/searchClient';

interface ArticlesSearchProps {
    children: ReactNode;
}

const VirtualPagination = () => {
    usePagination();
    return null;
};
export const HRInterviewAlgoliaSearch = ({ children }: ArticlesSearchProps) => {
    return (
        <InstantSearch
            searchClient={searchClient}
            indexName="hrInterviewQA"
            future={{
                preserveSharedStateOnUnmount: true,
            }}
        >
            <Configure hitsPerPage={20} />
            <VirtualPagination />
            {children}
        </InstantSearch>
    );
};
