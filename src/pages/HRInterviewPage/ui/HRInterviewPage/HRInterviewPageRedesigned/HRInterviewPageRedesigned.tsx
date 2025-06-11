import React from 'react';
import { searchClient } from '@/shared/config/firebase/searchClient';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { VStack } from '@/shared/ui/common/Stack';

import { HRInterviewFilters } from '@/widgets/HRInterviewFilters';
import { AddNewEntityButton } from '@/shared/ui/common/AddNewEntityButton';
import { HRInterviewPageContent } from '../../HRInterviewPageContent/HRInterviewPageContent';
import { HRInterviewAlgoliaSearch } from '../../HRInterviewAlgoliaSearch/HRInterviewAlgoliaSearch';
import { HRInterviewQueueNavigationButton } from '../../HRInterviewQueueNavigationButton/HRInterviewQueueNavigationButton';

export const HRInterviewPageRedesigned = () => {
    return (
        searchClient && (
            <HRInterviewAlgoliaSearch>
                <StickyContentLayout
                    left={
                        <VStack gap="24">
                            <AddNewEntityButton
                                entityType="hrInterviewQA"
                                max
                            />
                            <HRInterviewQueueNavigationButton />
                        </VStack>
                    }
                    right={
                        <VStack gap="24">
                            <HRInterviewFilters />
                        </VStack>
                    }
                    content={<HRInterviewPageContent />}
                />
            </HRInterviewAlgoliaSearch>
        )
    );
};
