import React, { memo } from 'react';
import { VStack } from '@/shared/ui/common/Stack';
import { ArticleEditorPageHeader } from '../ArticleEditorPageHeader/ArticleEditorPageHeader';
import { useHRInterviewQAEditor } from '../../lib/hooks/useHRInterviewQAEditor/useHRInterviewQAEditor';
import { SaveHRInterviewQAError } from '../SaveHRInterviewQAError/SaveHRInterviewQAError';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { createArticleReducer } from '../../model/slices/createHRInterviewQASlice';
import { ArticleEditorPageContent } from '../ArticleEditorPageContent/ArticleEditorPageContent';
import { ContentSkeleton } from '../ArticleEditorPageContent/ContentSkeleton/ContentSkeleton';

const reducers: ReducersList = {
    createArticle: createArticleReducer,
};

export const ArticleEditorPageContainer = memo(() => {
    const {
        metadata,
        validation,
        heroImage,
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
                <ArticleEditorPageHeader
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
                <ArticleEditorPageContent
                    blockActions={blockActions}
                    metadata={metadata}
                    validation={validation}
                    heroImage={heroImage}
                />
            </VStack>
        </DynamicModuleLoader>
    );
});
