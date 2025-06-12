import { useCallback } from 'react';

import {
    useToggleVisibility,
    UseToggleVisibilityReturnType,
} from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';

import { HRInterviewQAEditorPageHeaderProps } from '../../../ui/HRInterviewQAEditorPageHeader/HRInterviewQAEditorPageHeader';

import { useHRInterviewQAFormState } from '../useHRInterviewQAFormState/useHRInterviewQAFormState';
import { useInterviewTableNavigation } from '@/entities/HRInterviewQA';

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
    onActions: HRInterviewQAEditorPageHeaderProps['onActions'],
    hasErrors: boolean,
): UseHRInterviewQAEditorPageHeaderReturn => {
    const { formData, hasChanges } = useHRInterviewQAFormState();

    const { onNavigateToInterviewTable } = useInterviewTableNavigation();
    const deleteArticleModal = useToggleVisibility();
    const cancelArticleEditing = useToggleVisibility();
    const editedArticleId = formData?.id;

    const handleSave = useCallback(async () => {
        const savedArticleId = await onActions.save();
        if (savedArticleId) onNavigateToInterviewTable();
    }, [onActions, onNavigateToInterviewTable]);

    const handleUpdate = useCallback(async () => {
        const updatedArticleId = await onActions.update();
        if (updatedArticleId) onNavigateToInterviewTable();
    }, [onActions, onNavigateToInterviewTable]);

    const handleDelete = useCallback(async () => {
        const deletedArticleId = await onActions.delete();
        if (deletedArticleId) onNavigateToInterviewTable();
    }, [onActions, onNavigateToInterviewTable]);

    const handleCancel = useCallback(() => {
        if (!hasChanges && editedArticleId) {
            onActions.cancel();
            onNavigateToInterviewTable();
        } else if (editedArticleId) {
            cancelArticleEditing.hide();
            onNavigateToInterviewTable();
        }
    }, [
        hasChanges,
        editedArticleId,
        onActions,
        onNavigateToInterviewTable,
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
