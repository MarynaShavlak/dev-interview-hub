import React, { memo } from 'react';
import { VStack } from '@/shared/ui/common/Stack';
import { useHRInterviewQAEditor } from '../../lib/hooks/useHRInterviewQAEditor/useHRInterviewQAEditor';
import { SaveHRInterviewQAError } from '../SaveHRInterviewQAError/SaveHRInterviewQAError';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { HRInterviewQAEditorPageContent } from '../HRInterviewQAEditorPageContent/HRInterviewQAEditorPageContent';
import { ContentSkeleton } from '../HRInterviewQAEditorPageContent/ContentSkeleton/ContentSkeleton';
import { createHRInterviewQAReducer } from '../../model/slices/createHRInterviewQASlice';
import { EditorPageHeader } from '@/widgets/EditorPageHeader';
import { useHRInterviewQAEditorPageHeader } from '../../lib/hooks/useHRInterviewQAEditorPageHeader/useHRInterviewQAEditorPageHeader';

const reducers: ReducersList = {
    createHRInterviewQA: createHRInterviewQAReducer,
};

export const HRInterviewQAEditorPageContainer = memo(() => {
    const {
        metadata,
        validation,
        formActions: { onSave, onClear, onCancelChanges, onDelete, onUpdate },
        blockActions,
    } = useHRInterviewQAEditor();

    const { isEditArticlePage, saveError, isLoading } = metadata;

    if (isLoading) {
        return <ContentSkeleton height="100%" />;
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack gap="24" max>
                {saveError && <SaveHRInterviewQAError />}
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
                    entityType="hrInterviewQA"
                    useEditorPageHeader={useHRInterviewQAEditorPageHeader}
                />

                <HRInterviewQAEditorPageContent
                    blockActions={blockActions}
                    metadata={metadata}
                    validation={validation}
                />
            </VStack>
        </DynamicModuleLoader>
    );
});
