import { Story } from '@storybook/react';
import { Configure, InstantSearch } from 'react-instantsearch-core';
import { searchClient } from '../../firebase/searchClient';

export const AlgoliaSearchDecorator = (
    StoryComponent: Story,
    indexName: string = 'default_index',
) => {
    return (
        <InstantSearch
            searchClient={searchClient}
            indexName={indexName}
            future={{
                preserveSharedStateOnUnmount: true,
            }}
        >
            <Configure hitsPerPage={200} />
            <StoryComponent />
        </InstantSearch>
    );
};
