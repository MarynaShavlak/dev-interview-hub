import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { ConfirmCancelModal } from '@/shared/ui/common/ConfirmCancelModal';
import { ConfirmDeleteModal } from '@/shared/ui/common/ConfirmDeleteModal';
import { HStack } from '@/shared/ui/common/Stack';

import cls from '../LiveCodeEditorPageHeader.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';

import { LiveCodeEditorPageHeaderProps } from '../LiveCodeEditorPageHeader';
import { useLiveCodeEditorPageHeader } from '../../../lib/hooks/useLiveCodeEditorPageHeader/useLiveCodeEditorPageHeader';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { EditorPageHeaderButtons } from '@/features/EditorPageHeaderButtons';

export const LiveCodeEditorPageHeaderRedesigned = memo(
    (props: LiveCodeEditorPageHeaderProps) => {
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
        } = useLiveCodeEditorPageHeader(onActions, hasErrors);

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
                <EditorPageHeaderButtons
                    isEditPage={isEditArticlePage}
                    canSave={canSave}
                    onClear={onActions.clear}
                    onCancelEdit={cancelEdit}
                    onUpdate={handleUpdate}
                    onSave={handleSave}
                    onDelete={deleteArticleModal.show}
                />

                {deleteArticleModal.isVisible && (
                    <ConfirmDeleteModal
                        isOpen={deleteArticleModal.isVisible}
                        onCancel={deleteArticleModal.hide}
                        text={`${t('відповідь на питання')} "${articleTitle}"`}
                        onConfirm={handleDelete}
                    />
                )}
                {cancelArticleEditing.isVisible && (
                    <ConfirmCancelModal
                        isOpen={cancelArticleEditing.isVisible}
                        text={t('редагування питання')}
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
