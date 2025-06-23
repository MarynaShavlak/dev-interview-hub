import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { ConfirmCancelModal } from '@/shared/ui/common/ConfirmCancelModal';
import { ConfirmDeleteModal } from '@/shared/ui/common/ConfirmDeleteModal';
import { HStack } from '@/shared/ui/common/Stack';

import cls from '../HRInterviewQAEditorPageHeader.module.scss';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { Loader } from '@/shared/ui/deprecated/Loader';

import { LiveCodeEditorPageHeaderProps } from '../LiveCodeEditorPageHeader';
import { useHRInterviewQAEditorPageHeader } from '../../../lib/hooks/useHRInterviewQAEditorPageHeader/useHRInterviewQAEditorPageHeader';
import { EditorPageHeaderButtons } from '@/features/EditorPageHeaderButtons';

export const LiveCodeEditorPageHeaderDeprecated = memo(
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
        } = useHRInterviewQAEditorPageHeader(onActions, hasErrors);
        console.log('canSave', canSave);

        if (isLoading) {
            return (
                <HStack justify="center" max>
                    <Loader />
                </HStack>
            );
        }

        return (
            <HStack justify="between" max className={cls.pageTitleWrap}>
                <Text title={pageTitle} size={TextSize.L} />
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
