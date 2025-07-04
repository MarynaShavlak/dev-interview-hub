// import { useCallback } from 'react';
//
// import {
//     useToggleVisibility,
//     UseToggleVisibilityReturnType,
// } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
// import { useArticleNavigation } from '@/entities/Article';
// import { useArticleFormState } from '../useArticleFormState/useArticleFormState';
// import { ArticleEditorPageHeaderProps } from '../../../ui/ArticleEditorPageHeader/ArticleEditorPageHeader';
//
// interface UseArticleEditorPageHeaderReturn {
//     deleteArticleModal: UseToggleVisibilityReturnType;
//     cancelArticleEditing: UseToggleVisibilityReturnType;
//     handleSave: () => Promise<void>;
//     handleUpdate: () => Promise<void>;
//     handleDelete: () => Promise<void>;
//     handleCancel: () => void;
//     cancelEdit: () => void;
//     canSave: boolean;
//     articleTitle?: string;
// }
//
// export const useArticleEditorPageHeader = (
//     onActions: ArticleEditorPageHeaderProps['onActions'],
//     hasErrors: boolean,
// ): UseArticleEditorPageHeaderReturn => {
//     const { formData, hasChanges } = useArticleFormState();
//
//     const { navigateToArticle } = useArticleNavigation();
//     const deleteArticleModal = useToggleVisibility();
//     const cancelArticleEditing = useToggleVisibility();
//     const editedArticleId = formData?.id;
//
//     const handleSave = useCallback(async () => {
//         const savedArticleId = await onActions.save();
//         if (savedArticleId) navigateToArticle(savedArticleId);
//     }, [navigateToArticle, onActions]);
//
//     const handleUpdate = useCallback(async () => {
//         const updatedArticleId = await onActions.update();
//         if (updatedArticleId) navigateToArticle(updatedArticleId);
//     }, [navigateToArticle, onActions]);
//
//     const handleDelete = useCallback(async () => {
//         const deletedArticleId = await onActions.delete();
//         if (deletedArticleId) navigateToArticle(`${deletedArticleId}-deleted`);
//     }, [navigateToArticle, onActions]);
//
//     const handleCancel = useCallback(() => {
//         if (!hasChanges && editedArticleId) {
//             onActions.cancel();
//             navigateToArticle(editedArticleId);
//         } else if (editedArticleId) {
//             cancelArticleEditing.hide();
//             navigateToArticle(editedArticleId);
//         }
//     }, [
//         hasChanges,
//         editedArticleId,
//         navigateToArticle,
//         onActions,
//         cancelArticleEditing,
//     ]);
//
//     const cancelEdit = useCallback(() => {
//         if (hasChanges) {
//             cancelArticleEditing.show();
//         } else {
//             handleCancel();
//         }
//     }, [hasChanges, cancelArticleEditing, handleCancel]);
//
//     const canSave = !hasErrors && (formData?.blocks?.length ?? 0) > 0;
//
//     return {
//         deleteArticleModal,
//         cancelArticleEditing,
//         handleSave,
//         handleUpdate,
//         handleDelete,
//         handleCancel,
//         canSave,
//         articleTitle: formData?.title,
//         cancelEdit,
//     };
// };

import { useArticleFormState } from '../useArticleFormState/useArticleFormState';
import { useArticleNavigation } from '@/entities/Article';

import { useEditorPageHeader } from '@/widgets/EditorPageHeader';

export const useArticleEditorPageHeader = (
    onActions: {
        clear: () => void;
        save: () => Promise<string | null>;
        update: () => Promise<string | null>;
        cancel: () => void;
        delete: () => Promise<string | null>;
    },
    hasErrors: boolean,
) => {
    const { formData, hasChanges } = useArticleFormState();
    const { navigateToArticle } = useArticleNavigation();

    return useEditorPageHeader({
        formData,
        hasChanges,
        hasErrors,
        onActions,
        navigationHandlers: {
            onSaveSuccess: (id: string) => navigateToArticle(id),
            onUpdateSuccess: (id: string) => navigateToArticle(id),
            onDeleteSuccess: (id: string) => navigateToArticle(`${id}-deleted`),
            onCancel: (id: string) => navigateToArticle(id),
        },
    });
};
