import {
    Configure,
    InstantSearch,
    usePagination,
} from 'react-instantsearch-core';
import { ReactNode } from 'react';
import { searchClient } from '@/shared/config/firebase/searchClient';

interface LiveCodeTasksSearchProps {
    children: ReactNode;
}

const VirtualPagination = () => {
    usePagination();
    return null;
};
export const LiveCodeTasksAlgoliaSearch = ({
    children,
}: LiveCodeTasksSearchProps) => {
    return (
        <InstantSearch
            searchClient={searchClient}
            indexName="liveCodeTasks"
            future={{
                preserveSharedStateOnUnmount: true,
            }}
        >
            <Configure hitsPerPage={10} />
            <VirtualPagination />
            {children}
        </InstantSearch>
    );
};
