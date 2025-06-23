import { useCallback } from 'react';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';

interface UseEditorPageHeaderProps<T> {
    formData?: {
        id: string;
        title: string;
        blocks: any[];
    };
    hasChanges: boolean;
    hasErrors: boolean;
    onActions: {
        save: () => Promise<string | null>;
        update: () => Promise<string | null>;
        delete: () => Promise<string | null>;
        cancel: () => void;
        clear: () => void;
    };
    navigationHandlers: {
        onSaveSuccess: (id: string) => void;
        onUpdateSuccess: (id: string) => void;
        onDeleteSuccess: (id: string) => void;
        onCancel: (id: string) => void;
    };
}

export const useEditorPageHeader = <T>({
    formData,
    hasChanges,
    hasErrors,
    onActions,
    navigationHandlers,
}: UseEditorPageHeaderProps<T>) => {
    const deleteModal = useToggleVisibility();
    const cancelEditing = useToggleVisibility();

    const handleSave = useCallback(async () => {
        const savedId = await onActions.save();
        if (savedId) navigationHandlers.onSaveSuccess(savedId);
    }, [onActions, navigationHandlers]);

    const handleUpdate = useCallback(async () => {
        const updatedId = await onActions.update();
        if (updatedId) navigationHandlers.onUpdateSuccess(updatedId);
    }, [onActions, navigationHandlers]);

    const handleDelete = useCallback(async () => {
        const deletedId = await onActions.delete();
        if (deletedId) navigationHandlers.onDeleteSuccess(deletedId);
    }, [onActions, navigationHandlers]);

    const handleCancel = useCallback(() => {
        if (!hasChanges && formData?.id) {
            onActions.cancel();
            navigationHandlers.onCancel(formData?.id);
        } else if (formData?.id) {
            cancelEditing.hide();
            navigationHandlers.onCancel(formData?.id);
        }
    }, [
        hasChanges,
        formData?.id,
        onActions,
        navigationHandlers,
        cancelEditing,
    ]);

    const cancelEdit = useCallback(() => {
        if (hasChanges) {
            cancelEditing.show();
        } else {
            handleCancel();
        }
    }, [hasChanges, cancelEditing, handleCancel]);

    const canSave = !hasErrors && (formData?.blocks?.length ?? 0) > 0;

    return {
        deleteModal,
        cancelEditing,
        handleSave,
        handleUpdate,
        handleDelete,
        handleCancel,
        canSave,
        entityTitle: formData?.title,
        cancelEdit,
    };
};
