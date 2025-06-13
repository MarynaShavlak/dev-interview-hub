import React from 'react';
import { searchClient } from '@/shared/config/firebase/searchClient';

import { HRInterviewPageContent } from '../../HRInterviewPageContent/HRInterviewPageContent';
import { HRInterviewAlgoliaSearch } from '../../HRInterviewAlgoliaSearch/HRInterviewAlgoliaSearch';
import { Page } from '@/widgets/Page';
import { HRInterviewFilters } from '@/widgets/HRInterviewFilters';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { HRInterviewQueueNavigationButton } from '../../HRInterviewQueueNavigationButton/HRInterviewQueueNavigationButton';
import { HRInterviewEditTableNavigationButton } from '../../HRInterviewEditTableNavigationButton/HRInterviewEditTableNavigationButton';

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

                        <HRInterviewFilters />
                        <HRInterviewPageContent />
                    </VStack>
                </Page>
            </HRInterviewAlgoliaSearch>
        )
    );
};
