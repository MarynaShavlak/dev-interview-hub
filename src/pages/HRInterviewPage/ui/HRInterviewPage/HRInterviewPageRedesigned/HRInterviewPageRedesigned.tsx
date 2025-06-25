import React from 'react';
import { HRInterviewCategoryTabs } from '@/widgets/HRInterviewCategoryTabs';
import { searchClient } from '@/shared/config/firebase/searchClient';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { HStack, VStack } from '@/shared/ui/common/Stack';

import { AddNewEntityButton } from '@/shared/ui/common/AddNewEntityButton';
import { HRInterviewPageContent } from '../../HRInterviewPageContent/HRInterviewPageContent';
import { HRInterviewAlgoliaSearch } from '../../HRInterviewAlgoliaSearch/HRInterviewAlgoliaSearch';
import { HRInterviewQueueNavigationButton } from '../../HRInterviewQueueNavigationButton/HRInterviewQueueNavigationButton';
import { HRInterviewEditTableNavigationButton } from '../../HRInterviewEditTableNavigationButton/HRInterviewEditTableNavigationButton';
import { EntityFilters } from '@/widgets/EntityFilters';

export const HRInterviewPageRedesigned = () => {
    return (
        searchClient && (
            <HRInterviewAlgoliaSearch>
                <StickyContentLayout
                    right={
                        <VStack gap="24">
                            <HStack gap="8" wrap="wrap">
                                <AddNewEntityButton entityType="hrInterviewQA" />
                                <HRInterviewQueueNavigationButton />
                                <HRInterviewEditTableNavigationButton />
                            </HStack>
                            <EntityFilters>
                                <HRInterviewCategoryTabs />
                            </EntityFilters>
                            {/* <HRInterviewFilters /> */}
                        </VStack>
                    }
                    content={<HRInterviewPageContent />}
                />
            </HRInterviewAlgoliaSearch>
        )
    );
};
