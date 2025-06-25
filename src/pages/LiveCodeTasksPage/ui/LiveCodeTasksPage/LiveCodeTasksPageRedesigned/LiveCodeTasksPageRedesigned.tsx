import React from 'react';
import { searchClient } from '@/shared/config/firebase/searchClient';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { HStack, VStack } from '@/shared/ui/common/Stack';

import { AddNewEntityButton } from '@/shared/ui/common/AddNewEntityButton';
import { EntityFilters } from '@/widgets/EntityFilters';
import { LiveCodeTasksAlgoliaSearch } from '../../LiveCodeTasksAlgoliaSearch/LiveCodeTasksAlgoliaSearch';
import { LiveCodeCategoryTabs } from '@/widgets/LiveCodeCategoryTabs';
import { LiveCodeTasksPageContent } from '../LiveCodeTasksPageContent/LiveCodeTasksPageContent';

export const LiveCodeTasksPageRedesigned = () => {
    return (
        searchClient && (
            <LiveCodeTasksAlgoliaSearch>
                <StickyContentLayout
                    right={
                        <VStack gap="24">
                            <HStack gap="8" wrap="wrap">
                                <AddNewEntityButton entityType="liveCode" />
                                {/* <HRInterviewQueueNavigationButton /> */}
                                {/* <HRInterviewEditTableNavigationButton /> */}
                            </HStack>
                            <EntityFilters>
                                <LiveCodeCategoryTabs />
                            </EntityFilters>
                        </VStack>
                    }
                    content={<LiveCodeTasksPageContent />}
                />
            </LiveCodeTasksAlgoliaSearch>
        )
    );
};
