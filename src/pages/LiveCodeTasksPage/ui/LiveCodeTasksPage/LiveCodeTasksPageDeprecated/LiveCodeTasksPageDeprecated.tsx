import React from 'react';
import { searchClient } from '@/shared/config/firebase/searchClient';
import { VStack } from '@/shared/ui/common/Stack';

import { EntityFilters } from '@/widgets/EntityFilters';
import { LiveCodeTasksAlgoliaSearch } from '../../LiveCodeTasksAlgoliaSearch/LiveCodeTasksAlgoliaSearch';
import { LiveCodeCategoryTabs } from '@/widgets/LiveCodeCategoryTabs';

import { Page } from '@/widgets/Page';
import { LiveCodeTasksPageContent } from '../LiveCodeTasksPageContent/LiveCodeTasksPageContent';

export const LiveCodeTasksPageDeprecated = () => {
    return (
        searchClient && (
            <LiveCodeTasksAlgoliaSearch>
                <Page>
                    <VStack gap="40">
                        <EntityFilters>
                            <LiveCodeCategoryTabs />
                        </EntityFilters>
                        <LiveCodeTasksPageContent />
                    </VStack>
                </Page>
            </LiveCodeTasksAlgoliaSearch>
        )
    );
};
