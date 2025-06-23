import React, { memo } from 'react';
import { VStack } from '@/shared/ui/common/Stack';
import { useLiveCodeEditor } from '../../lib/hooks/useLiveCodeEditor/useLiveCodeEditor';

import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { LiveCodeEditorPageContent } from '../LiveCodeEditorPageContent/LiveCodeEditorPageContent';
import { ContentSkeleton } from '../LiveCodeEditorPageContent/ContentSkeleton/ContentSkeleton';
import { createLiveCodeTaskReducer } from '../../model/slices/createLiveCodeSlice';
import { useLiveCodeEditorPageHeader } from '../../lib/hooks/useLiveCodeEditorPageHeader/useLiveCodeEditorPageHeader';
import { EditorPageHeader } from '@/widgets/EditorPageHeader';
import { SaveEntityError } from '@/features/SaveEntityError';

const reducers: ReducersList = {
    createLiveCode: createLiveCodeTaskReducer,
};

export const LiveCodeEditorPageContainer = memo(() => {
    const {
        metadata,
        validation,
        formActions: { onSave, onClear, onCancelChanges, onDelete, onUpdate },
        blockActions,
    } = useLiveCodeEditor();

    const { isEditArticlePage, saveError, isLoading } = metadata;

    if (isLoading) {
        return <ContentSkeleton height="100%" />;
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack gap="24" max>
                {saveError && <SaveEntityError />}
                <EditorPageHeader
                    hasErrors={validation.hasInputErrors}
                    onActions={{
                        clear: onClear,
                        save: onSave,
                        cancel: onCancelChanges,
                        delete: onDelete,
                        update: onUpdate,
                    }}
                    isEditPage={isEditArticlePage}
                    isLoading={isLoading}
                    entityType="liveCode"
                    useEditorPageHeader={useLiveCodeEditorPageHeader}
                />

                <LiveCodeEditorPageContent
                    blockActions={blockActions}
                    metadata={metadata}
                    validation={validation}
                />
            </VStack>
        </DynamicModuleLoader>
    );
});
