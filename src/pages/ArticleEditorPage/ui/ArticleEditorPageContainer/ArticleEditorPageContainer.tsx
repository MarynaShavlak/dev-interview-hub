import React, { memo } from 'react';
import { VStack } from '@/shared/ui/common/Stack';
import { useArticleEditor } from '../../lib/hooks/useArticleEditor/useArticleEditor';

import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { createArticleReducer } from '../../model/slices/createArticleSlice';
import { ArticleEditorPageContent } from '../ArticleEditorPageContent/ArticleEditorPageContent';
import { ContentSkeleton } from '../ArticleEditorPageContent/ContentSkeleton/ContentSkeleton';
import { useArticleEditorPageHeader } from '../../lib/hooks/useArticleEditorPageHeader/useArticleEditorPageHeader';
import { EditorPageHeader } from '@/widgets/EditorPageHeader';
import { SaveEntityError } from '@/features/SaveEntityError';

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
    } = useArticleEditor();

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
                    entityType="article"
                    useEditorPageHeader={useArticleEditorPageHeader}
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
