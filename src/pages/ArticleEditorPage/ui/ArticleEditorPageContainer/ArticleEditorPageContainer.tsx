import React, { memo } from 'react';
import { VStack } from '@/shared/ui/common/Stack';
import { ArticleEditorPageHeader } from '../ArticleEditorPageHeader/ArticleEditorPageHeader';
import { useArticleEditor } from '../../lib/hooks/useArticleEditor/useArticleEditor';
import { SaveArticleError } from '../SaveArticleError/SaveArticleError';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { createArticleReducer } from '../../model/slices/createArticleSlice';
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
    } = useArticleEditor();
    // console.log('heroImage', heroImage);
    const { isEditArticlePage, saveError, isLoading } = metadata;

    if (isLoading) {
        return <ContentSkeleton height="100%" />;
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack gap="24" max>
                {saveError && <SaveArticleError />}
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
