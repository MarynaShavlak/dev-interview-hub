import React, { memo } from 'react';
import { VStack } from '@/shared/ui/common/Stack';
import { ArticleEditorPageHeader } from '../ArticleEditorPageHeader/ArticleEditorPageHeader';
import { useArticleEditor } from '../../lib/hooks/useArticleEditor/useArticleEditor';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { ArticleEditorPageContent } from '../ArticleEditorPageContent/ArticleEditorPageContent';
import { SaveArticleError } from '../SaveArticleError/SaveArticleError';

export const ArticleEditorPageContainer = memo(() => {
    const {
        metadata,
        validation,
        heroImage,
        formActions: { onSave, onClear, onCancelChanges, onDelete, onUpdate },
        blockActions,
    } = useArticleEditor();
    const { isEditArticlePage, saveError, isLoading } = metadata;

    console.log('isLoading', isLoading);
    if (isLoading) {
        return <Skeleton width="100%" height="100vh" border="40px" />;
    }

    return (
        <VStack gap="24" max>
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
            {saveError && <SaveArticleError />}
        </VStack>
    );
});
