import React from 'react';
import { searchClient } from '@/shared/config/firebase/searchClient';

import { HRInterviewPageContent } from '../../HRInterviewPageContent/HRInterviewPageContent';
import { HRInterviewAlgoliaSearch } from '../../HRInterviewAlgoliaSearch/HRInterviewAlgoliaSearch';
import { Page } from '@/widgets/Page';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { HRInterviewQueueNavigationButton } from '../../HRInterviewQueueNavigationButton/HRInterviewQueueNavigationButton';
import { HRInterviewEditTableNavigationButton } from '../../HRInterviewEditTableNavigationButton/HRInterviewEditTableNavigationButton';
import { HRInterviewCategoryTabs } from '@/features/HRInterviewCategoryTabs';
import { EntityFilters } from '@/widgets/EntityFilters';

export const HRInterviewPageDeprecated = () => {
    return (
        searchClient && (
            <HRInterviewAlgoliaSearch>
                <Page>
                    <VStack gap="40">
                        <HStack gap="24">
                            <HRInterviewQueueNavigationButton />
                            <HRInterviewEditTableNavigationButton />
                        </HStack>

                        <EntityFilters>
                            <HRInterviewCategoryTabs />
                        </EntityFilters>
                        <HRInterviewPageContent />
                    </VStack>
                </Page>
            </HRInterviewAlgoliaSearch>
        )
    );
};
