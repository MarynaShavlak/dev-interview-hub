import React from 'react';
import { searchClient } from '@/shared/config/firebase/searchClient';

import { HRInterviewPageContent } from '../../HRInterviewPageContent/HRInterviewPageContent';
import { HRInterviewAlgoliaSearch } from '../../HRInterviewAlgoliaSearch/HRInterviewAlgoliaSearch';
import { Page } from '@/widgets/Page';
import { HRInterviewFilters } from '@/widgets/HRInterviewFilters';
import { VStack } from '@/shared/ui/common/Stack';

export const HRInterviewPageDeprecated = () => {
    return (
        searchClient && (
            <HRInterviewAlgoliaSearch>
                <Page>
                    <VStack gap="40">
                        <HRInterviewFilters />
                        <HRInterviewPageContent />
                    </VStack>
                </Page>
                {/* <StickyContentLayout */}
                {/*    left={ */}
                {/*        <VStack gap="24"> */}
                {/*            <AddNewEntityButton */}
                {/*                entityType="hrInterviewQA" */}
                {/*                max */}
                {/*            /> */}
                {/*        </VStack> */}
                {/*    } */}
                {/*    right={ */}
                {/*        <VStack gap="24"> */}
                {/*            <HRInterviewFilters /> */}
                {/*        </VStack> */}
                {/*    } */}
                {/*    content={} */}
                {/* /> */}
            </HRInterviewAlgoliaSearch>
        )
    );
};
