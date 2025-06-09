import { useCallback } from 'react';

import {
    useToggleVisibility,
    UseToggleVisibilityReturnType,
} from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { useArticleNavigation } from '@/entities/Article';

import { ArticleEditorPageHeaderProps } from '../../../ui/ArticleEditorPageHeader/ArticleEditorPageHeader';

import { useHRInterviewQAFormState } from '../useHRInterviewQAFormState/useHRInterviewQAFormState';

interface UseHRInterviewQAEditorPageHeaderReturn {
    deleteArticleModal: UseToggleVisibilityReturnType;
    cancelArticleEditing: UseToggleVisibilityReturnType;
    handleSave: () => Promise<void>;
    handleUpdate: () => Promise<void>;
    handleDelete: () => Promise<void>;
    handleCancel: () => void;
    cancelEdit: () => void;
    canSave: boolean;
    articleTitle?: string;
}

export const useHRInterviewQAEditorPageHeader = (
    onActions: ArticleEditorPageHeaderProps['onActions'],
    hasErrors: boolean,
): UseHRInterviewQAEditorPageHeaderReturn => {
    const { formData, hasChanges } = useHRInterviewQAFormState();

    const { navigateToArticle } = useArticleNavigation();
    const deleteArticleModal = useToggleVisibility();
    const cancelArticleEditing = useToggleVisibility();
    const editedArticleId = formData?.id;

    const handleSave = useCallback(async () => {
        const savedArticleId = await onActions.save();
        if (savedArticleId) navigateToArticle(savedArticleId);
    }, [navigateToArticle, onActions]);

    const handleUpdate = useCallback(async () => {
        const updatedArticleId = await onActions.update();
        if (updatedArticleId) navigateToArticle(updatedArticleId);
    }, [navigateToArticle, onActions]);

    const handleDelete = useCallback(async () => {
        const deletedArticleId = await onActions.delete();
        if (deletedArticleId) navigateToArticle(`${deletedArticleId}-deleted`);
    }, [navigateToArticle, onActions]);

    const handleCancel = useCallback(() => {
        if (!hasChanges && editedArticleId) {
            onActions.cancel();
            navigateToArticle(editedArticleId);
        } else if (editedArticleId) {
            cancelArticleEditing.hide();
            navigateToArticle(editedArticleId);
        }
    }, [
        hasChanges,
        editedArticleId,
        navigateToArticle,
        onActions,
        cancelArticleEditing,
    ]);

    const cancelEdit = useCallback(() => {
        if (hasChanges) {
            cancelArticleEditing.show();
        } else {
            handleCancel();
        }
    }, [hasChanges, cancelArticleEditing, handleCancel]);

    const canSave = !hasErrors && (formData?.blocks?.length ?? 0) > 0;

    return {
        deleteArticleModal,
        cancelArticleEditing,
        handleSave,
        handleUpdate,
        handleDelete,
        handleCancel,
        canSave,
        articleTitle: formData?.title,
        cancelEdit,
    };
};
