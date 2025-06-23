import React, { memo } from 'react';
import { VStack } from '@/shared/ui/common/Stack';
import { LiveCodeEditorPageHeader } from '../LiveCodeEditorPageHeader/LiveCodeEditorPageHeader';
import { useLiveCodeEditor } from '../../lib/hooks/useLiveCodeEditor/useLiveCodeEditor';

import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { LiveCodeEditorPageContent } from '../LiveCodeEditorPageContent/LiveCodeEditorPageContent';
import { ContentSkeleton } from '../LiveCodeEditorPageContent/ContentSkeleton/ContentSkeleton';
import { createLiveCodeTaskReducer } from '../../model/slices/createLiveCodeSlice';

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
                {/* {saveError && <SaveLiveCodeError />} */}
                <LiveCodeEditorPageHeader
                    hasErrors={validation.hasInputErrors}
                    onActions={{
                        clear: onClear,
                        save: onSave,
                        cancel: onCancelChanges,
                        delete: onDelete,
                        update: onUpdate,
                    }}
                    isEditArticlePage={isEditArticlePage}
                    isLoading={isLoading}
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
