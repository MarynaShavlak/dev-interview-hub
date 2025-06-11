import React from 'react';
import { searchClient } from '@/shared/config/firebase/searchClient';

import { HRInterviewPageContent } from '../../HRInterviewPageContent/HRInterviewPageContent';
import { HRInterviewAlgoliaSearch } from '../../HRInterviewAlgoliaSearch/HRInterviewAlgoliaSearch';
import { Page } from '@/widgets/Page';

export const HRInterviewPageDeprecated = () => {
    return (
        searchClient && (
            <HRInterviewAlgoliaSearch>
                <Page>
                    <HRInterviewPageContent />
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
