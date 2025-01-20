import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { HStack } from '@/shared/ui/common/Stack';

import { useArticleFormState } from '../../lib/hooks/useArticleFormState/useArticleFormState';
import { Button } from '@/shared/ui/redesigned/Button';
import { getRouteArticleDetails } from '@/shared/const/router/router';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { ConfirmDeleteModal } from '@/features/ConfirmDeleteModal';
import { ConfirmCancelModal } from '@/features/ConfirmCancelModal';

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
        const navigate = useNavigate();
        const editedArticleId = formData?.id;

        const {
            isVisible: isConfirmDeleteModal,
            showElement: onShowConfirmDeleteModal,
            hideElement: onCloseConfirmDeleteModal,
        } = useToggleVisibility();
        const {
            isVisible: isConfirmCancelModal,
            showElement: onShowConfirmCancelModal,
            hideElement: onCloseConfirmCancelModal,
        } = useToggleVisibility();

        const handleSave = useCallback(async () => {
            const savedArticleId = await onSave();

            if (savedArticleId) {
                navigate(getRouteArticleDetails(savedArticleId));
            }
        }, [navigate, onSave]);

        const handleDelete = useCallback(async () => {
            const deletedArticleId = await onDelete();

            if (deletedArticleId) {
                navigate(getRouteArticleDetails(`${deletedArticleId}-deleted`));
            }
        }, [navigate, onDelete]);

        const handleCancel = useCallback(() => {
            if (editedArticleId) {
                onCancel();
                navigate(getRouteArticleDetails(editedArticleId));
            }
        }, [editedArticleId, navigate, onCancel]);

        const isSomeBlockAdded = Number(formData?.blocks.length) > 0;

        const confirmationText = `${t('статтю')} "${formData?.title}"`;
        const cancelText = t('редагування статті');
        const cancelBtnText = t('Продовжити редагування');
        const confirmBtnText = t('Відмінити зміни');
        return (
            <>
                <HStack gap="8" className={className}>
                    {isEditArticlePage && (
                        <Button
                            variant="cancel"
                            onClick={onShowConfirmDeleteModal}
                        >
                            {t('Видалити')}
                        </Button>
                    )}
                    {!isEditArticlePage && (
                        <Button variant="cancel" onClick={onClear}>
                            {t('Очистити')}
                        </Button>
                    )}
                    {isEditArticlePage && (
                        <Button onClick={onShowConfirmCancelModal}>
                            {t('Відмінити')}
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
                {isConfirmDeleteModal && (
                    <ConfirmDeleteModal
                        isOpen={isConfirmDeleteModal}
                        onCancel={onCloseConfirmDeleteModal}
                        text={confirmationText}
                        onConfirm={handleDelete}
                    />
                )}
                {isConfirmCancelModal && (
                    <ConfirmCancelModal
                        isOpen={isConfirmCancelModal}
                        text={cancelText}
                        cancelBtnText={cancelBtnText}
                        confirmBtnText={confirmBtnText}
                        onCancel={onCloseConfirmCancelModal}
                        onConfirm={handleCancel}
                    />
                )}
            </>
        );
    },
);
