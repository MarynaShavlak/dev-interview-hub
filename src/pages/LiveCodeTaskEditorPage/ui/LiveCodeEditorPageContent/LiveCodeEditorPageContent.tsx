import React, { memo } from 'react';
import { Blocks } from '../Blocks/Blocks';
import { UseLiveCodeEditorReturn } from '../../lib/hooks/useLiveCodeEditor/useLiveCodeEditor';
import { VStack } from '@/shared/ui/common/Stack';

import { ContentSkeleton } from './ContentSkeleton/ContentSkeleton';
import { LiveCodeTitle } from '../LiveCodeTitle/LiveCodeTitle';
import { AddLiveCodeCategoryForm } from '../AddLiveCodeCategoryForm/AddLiveCodeCategoryForm';

interface LiveCodeEditorPageProps {
    metadata: UseLiveCodeEditorReturn['metadata'];
    validation: UseLiveCodeEditorReturn['validation'];
    blockActions: UseLiveCodeEditorReturn['blockActions'];
}

export const LiveCodeEditorPageContent = memo(
    (props: LiveCodeEditorPageProps) => {
        const { validation, blockActions, metadata } = props;

        const { blocks, isLoading } = metadata;

        if (isLoading) {
            return <ContentSkeleton />;
        }

        return (
            <VStack gap="24" max>
                <LiveCodeTitle titleIndex={1} errors={validation} />
                <AddLiveCodeCategoryForm index={2} />
                <Blocks index={3} blocks={blocks} blockActions={blockActions} />
            </VStack>
        );
    },
);
