import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { ConfirmCancelModal } from '@/shared/ui/common/ConfirmCancelModal';
import { ConfirmDeleteModal } from '@/shared/ui/common/ConfirmDeleteModal';
import { HStack } from '@/shared/ui/common/Stack';

import { Button } from '@/shared/ui/redesigned/Button';
import cls from '../HRInterviewQAEditorPageHeader.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';

import { HRInterviewQAEditorPageHeaderProps } from '../HRInterviewQAEditorPageHeader';
import { useHRInterviewQAEditorPageHeader } from '../../../lib/hooks/useHRInterviewQAEditorPageHeader/useHRInterviewQAEditorPageHeader';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

export const HRInterviewQAEditorPageHeaderRedesigned = memo(
    (props: HRInterviewQAEditorPageHeaderProps) => {
        const {
            className,
            hasErrors,
            onActions,
            isEditArticlePage,
            isLoading,
        } = props;
        const { t } = useTranslation('articleDetails');
        const pageTitle = isEditArticlePage
            ? t('Редагування питання на HR співбесіді')
            : t('Створення нового питання на HR співбесіді');

        const {
            deleteArticleModal,
            cancelArticleEditing,
            handleSave,
            handleUpdate,
            handleDelete,
            handleCancel,
            canSave,
            articleTitle,
            cancelEdit,
        } = useHRInterviewQAEditorPageHeader(onActions, hasErrors);

        if (isLoading) {
            return <Skeleton width="100%" height="76px" border="16px" />;
        }

        return (
            <HStack
                justify="between"
                max
                className={cls.pageTitleWrapRedesigned}
            >
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
                            <Button onClick={cancelEdit}>
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
                        text={`${t('статтю')} "${articleTitle}"`}
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
