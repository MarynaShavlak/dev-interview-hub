import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { HStack } from '@/shared/ui/common/Stack';

import { useArticleFormState } from '../../lib/hooks/useArticleFormState/useArticleFormState';
import { Button } from '@/shared/ui/redesigned/Button';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { ConfirmDeleteModal } from '@/features/ConfirmDeleteModal';
import { ConfirmCancelModal } from '@/features/ConfirmCancelModal';
import { useArticleNavigation } from '../../lib/hooks/useArticleNavigation/useArticleNavigation';

interface ArticleEditorPageHeaderProps {
    className?: string;
    hasErrors: boolean;
    onClear: () => void;
    onSave: () => Promise<string | null>;
    onCancel: () => void;
    onDelete: () => Promise<string | null>;
    isEditArticlePage: boolean;
}

export const ArticleEditorPageHeader = memo(
    (props: ArticleEditorPageHeaderProps) => {
        const {
            className,
            hasErrors,
            onClear,
            onSave,
            isEditArticlePage,
            onCancel,
            onDelete,
        } = props;
        const { t } = useTranslation('articleDetails');
        const { formData } = useArticleFormState();
        const { navigateToArticle } = useArticleNavigation();
        const editedArticleId = formData?.id;

        const deleteArticleModal = useToggleVisibility();
        const cancelArticleEditing = useToggleVisibility();

        const handleSave = useCallback(async () => {
            const savedArticleId = await onSave();

            if (savedArticleId) {
                navigateToArticle(savedArticleId);
            }
        }, [navigateToArticle, onSave]);

        const handleDelete = useCallback(async () => {
            const deletedArticleId = await onDelete();

            if (deletedArticleId) {
                navigateToArticle(`${deletedArticleId}-deleted`);
            }
        }, [navigateToArticle, onDelete]);

        const handleCancel = useCallback(() => {
            if (editedArticleId) {
                onCancel();
                navigateToArticle(editedArticleId);
            }
        }, [editedArticleId, navigateToArticle, onCancel]);

        const isSomeBlockAdded = Number(formData?.blocks.length) > 0;

        return (
            <>
                <HStack gap="8" className={className}>
                    {isEditArticlePage && (
                        <>
                            <Button
                                variant="cancel"
                                onClick={deleteArticleModal.show}
                            >
                                {t('Видалити')}
                            </Button>
                            <Button onClick={cancelArticleEditing.show}>
                                {t('Відмінити')}
                            </Button>
                        </>
                    )}
                    {!isEditArticlePage && (
                        <Button variant="cancel" onClick={onClear}>
                            {t('Очистити')}
                        </Button>
                    )}

                    <Button
                        variant="save"
                        onClick={handleSave}
                        disabled={hasErrors || !isSomeBlockAdded}
                    >
                        {t('Зберегти')}
                    </Button>
                </HStack>
                {deleteArticleModal.isVisible && (
                    <ConfirmDeleteModal
                        isOpen={deleteArticleModal.isVisible}
                        onCancel={deleteArticleModal.hide}
                        text={`${t('статтю')} "${formData?.title}"`}
                        onConfirm={handleDelete}
                    />
                )}
                {cancelArticleEditing.isVisible && (
                    <ConfirmCancelModal
                        isOpen={cancelArticleEditing.isVisible}
                        text={t('редагування статті')}
                        cancelBtnText={t('Продовжити редагування')}
                        confirmBtnText={t('Відмінити зміни')}
                        onCancel={cancelArticleEditing.hide}
                        onConfirm={handleCancel}
                    />
                )}
            </>
        );
    },
);
