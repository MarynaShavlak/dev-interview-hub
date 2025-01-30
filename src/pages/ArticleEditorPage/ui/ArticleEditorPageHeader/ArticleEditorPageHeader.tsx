import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { HStack } from '@/shared/ui/common/Stack';

import { useArticleFormState } from '../../lib/hooks/useArticleFormState/useArticleFormState';
import { Button } from '@/shared/ui/redesigned/Button';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { ConfirmDeleteModal } from '@/features/ConfirmDeleteModal';
import { ConfirmCancelModal } from '@/features/ConfirmCancelModal';
import { useArticleNavigation } from '@/entities/Article';
import cls from './ArticleEditorPageHeader.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface ArticleEditorPageHeaderProps {
    className?: string;
    hasErrors: boolean;
    isEditArticlePage: boolean;
    isLoading: boolean;
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
        const {
            className,
            hasErrors,
            onActions,
            isEditArticlePage,
            isLoading,
        } = props;
        const { t } = useTranslation('articleDetails');
        const { formData } = useArticleFormState();
        const { navigateToArticle } = useArticleNavigation();
        const editedArticleId = formData?.id;
        const pageTitle = isEditArticlePage
            ? t('Редагування статті')
            : t('Створення нової статті');

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

        if (isLoading) {
            return <Skeleton width="100%" height="76px" border="16px" />;
        }

        return (
            <HStack justify="between" max className={cls.pageTitleWrap}>
                <Text title={pageTitle} size="l" />
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
                                {t('Зберегти зміни')}
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
                                {t('Зберегти статтю')}
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
            </HStack>
        );
    },
);
