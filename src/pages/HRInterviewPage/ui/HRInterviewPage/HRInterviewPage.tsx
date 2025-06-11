import React, { memo } from 'react';
import { searchClient } from '@/shared/config/firebase/searchClient';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { VStack } from '@/shared/ui/common/Stack';

import { HRInterviewAlgoliaSearch } from '../HRInterviewAlgoliaSearch/HRInterviewAlgoliaSearch';
import { HRInterviewPageContent } from '../HRInterviewPageContent/HRInterviewPageContent';
import { HRInterviewFilters } from '@/widgets/HRInterviewFilters';
import { AddNewEntityButton } from '@/shared/ui/common/AddNewEntityButton';

const HRInterviewPage = () => {
    return (
        searchClient && (
            <HRInterviewAlgoliaSearch>
                <StickyContentLayout
                    left={
                        <VStack gap="24">
                            <AddNewEntityButton entityType="hrInterviewQA" />
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

export default memo(HRInterviewPage);
