import React, { memo } from 'react';
import { HRInterviewQATitle } from '../HRInterviewQATitle/HRInterviewQATitle';
import { Blocks } from '../Blocks/Blocks';
import { UseHRInterviewQAEditorReturn } from '../../lib/hooks/useHRInterviewQAEditor/useHRInterviewQAEditor';
import { VStack } from '@/shared/ui/common/Stack';

import { ContentSkeleton } from './ContentSkeleton/ContentSkeleton';
import { AddHRInterviewCategoryForm } from '../AddHRInterviewCategoryForm/AddHRInterviewCategoryForm';

interface HRInterviewQAEditorPageProps {
    metadata: UseHRInterviewQAEditorReturn['metadata'];
    validation: UseHRInterviewQAEditorReturn['validation'];
    blockActions: UseHRInterviewQAEditorReturn['blockActions'];
}

export const HRInterviewQAEditorPageContent = memo(
    (props: HRInterviewQAEditorPageProps) => {
        const { validation, blockActions, metadata } = props;

        const { blocks, isLoading } = metadata;

        if (isLoading) {
            return <ContentSkeleton />;
        }

        return (
            <VStack gap="24">
                <HRInterviewQATitle titleIndex={1} errors={validation} />
                <AddHRInterviewCategoryForm index={2} />
                <Blocks index={3} blocks={blocks} blockActions={blockActions} />
            </VStack>
        );
    },
);
