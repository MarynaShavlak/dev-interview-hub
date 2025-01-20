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
    isEditArticlePage: boolean;
    onActions: {
        clear: () => void;
        save: () => Promise<string | null>;
        update: () => Promise<string | null>;
        cancel: () => void;
        delete: () => Promise<string | null>;
    };
}

export const ArticleEditorPageHeader = memo(
    (props: ArticleEditorPageHeaderProps) => {
        const { className, hasErrors, onActions, isEditArticlePage } = props;
        const { t } = useTranslation('articleDetails');
        const { formData } = useArticleFormState();
        const { navigateToArticle } = useArticleNavigation();
        const editedArticleId = formData?.id;

        const deleteArticleModal = useToggleVisibility();
        const cancelArticleEditing = useToggleVisibility();

        const handleSave = useCallback(async () => {
            const savedArticleId = await onActions.save();

            if (savedArticleId) {
                navigateToArticle(savedArticleId);
            }
        }, [navigateToArticle, onActions]);

        const handleUpdate = useCallback(async () => {
            const updatedArticleId = await onActions.update();

            if (updatedArticleId) {
                navigateToArticle(updatedArticleId);
            }
        }, [navigateToArticle, onActions]);

        const handleDelete = useCallback(async () => {
            const deletedArticleId = await onActions.delete();

            if (deletedArticleId) {
                navigateToArticle(`${deletedArticleId}-deleted`);
            }
        }, [navigateToArticle, onActions]);

        const handleCancel = useCallback(() => {
            if (editedArticleId) {
                onActions.cancel();
                navigateToArticle(editedArticleId);
            }
        }, [editedArticleId, navigateToArticle, onActions]);

        const canSave = !hasErrors && (formData?.blocks?.length ?? 0) > 0;

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
                            <Button
                                variant="save"
                                onClick={handleUpdate}
                                disabled={!canSave}
                            >
                                {t('Зберегти')}
                            </Button>
                        </>
                    )}
                    {!isEditArticlePage && (
                        <>
                            <Button variant="cancel" onClick={onActions.clear}>
                                {t('Очистити')}
                            </Button>
                            <Button
                                variant="save"
                                onClick={handleSave}
                                disabled={!canSave}
                            >
                                {t('Зберегти')}
                            </Button>
                        </>
                    )}
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
