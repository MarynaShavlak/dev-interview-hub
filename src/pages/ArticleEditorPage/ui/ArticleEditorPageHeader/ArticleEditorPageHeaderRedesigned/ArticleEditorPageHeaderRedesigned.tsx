import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { ConfirmCancelModal } from '@/shared/ui/common/ConfirmCancelModal';
import { ConfirmDeleteModal } from '@/shared/ui/common/ConfirmDeleteModal';
import { HStack } from '@/shared/ui/common/Stack';

import cls from '../ArticleEditorPageHeader.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';

import { ArticleEditorPageHeaderProps } from '../ArticleEditorPageHeader';
import { useArticleEditorPageHeader } from '../../../lib/hooks/useArticleEditorPageHeader/useArticleEditorPageHeader';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { EditorPageHeaderButtons } from '@/features/EditorPageHeaderButtons';

export const ArticleEditorPageHeaderRedesigned = memo(
    (props: ArticleEditorPageHeaderProps) => {
        const {
            className,
            hasErrors,
            onActions,
            isEditArticlePage,
            isLoading,
        } = props;
        const { t } = useTranslation('articleDetails');
        const pageTitle = isEditArticlePage
            ? t('Редагування статті')
            : t('Створення нової статті');

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
        } = useArticleEditorPageHeader(onActions, hasErrors);

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
