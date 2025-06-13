import React from 'react';
import { searchClient } from '@/shared/config/firebase/searchClient';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { HStack, VStack } from '@/shared/ui/common/Stack';

import { HRInterviewFilters } from '@/widgets/HRInterviewFilters';
import { AddNewEntityButton } from '@/shared/ui/common/AddNewEntityButton';
import { HRInterviewPageContent } from '../../HRInterviewPageContent/HRInterviewPageContent';
import { HRInterviewAlgoliaSearch } from '../../HRInterviewAlgoliaSearch/HRInterviewAlgoliaSearch';
import { HRInterviewQueueNavigationButton } from '../../HRInterviewQueueNavigationButton/HRInterviewQueueNavigationButton';
import { HRInterviewEditTableNavigationButton } from '../../HRInterviewEditTableNavigationButton/HRInterviewEditTableNavigationButton';

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
                            <HRInterviewFilters />
                        </VStack>
                    }
                    content={<HRInterviewPageContent />}
                />
            </HRInterviewAlgoliaSearch>
        )
    );
};
