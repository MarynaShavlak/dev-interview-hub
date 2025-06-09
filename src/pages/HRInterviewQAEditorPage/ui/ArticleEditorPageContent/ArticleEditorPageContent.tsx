import React, { memo } from 'react';
import { HRInterviewQATitle } from '../HRInterviewQATitle/HRInterviewQATitle';
import { AddCategoryForm } from '../AddCategoryForm/AddCategoryForm';
import { AddBlocksForm } from '../AddBlocksForm/AddBlocksForm';
import { UseHRInterviewQAEditorReturn } from '../../lib/hooks/useHRInterviewQAEditor/useHRInterviewQAEditor';
import { VStack } from '@/shared/ui/common/Stack';

import { ContentSkeleton } from './ContentSkeleton/ContentSkeleton';

interface ArticleEditorPageProps {
    metadata: UseHRInterviewQAEditorReturn['metadata'];
    validation: UseHRInterviewQAEditorReturn['validation'];
    blockActions: UseHRInterviewQAEditorReturn['blockActions'];
}

export const ArticleEditorPageContent = memo(
    (props: ArticleEditorPageProps) => {
        const { validation, blockActions, metadata } = props;

        const { blocks, isLoading } = metadata;

        if (isLoading) {
            return <ContentSkeleton />;
        }

        return (
            <VStack gap="24">
                <HRInterviewQATitle titleIndex={1} errors={validation} />

                <AddCategoryForm index={4} />
                <AddBlocksForm
                    index={5}
                    blocks={blocks}
                    blockActions={blockActions}
                />
            </VStack>
        );
    },
);
