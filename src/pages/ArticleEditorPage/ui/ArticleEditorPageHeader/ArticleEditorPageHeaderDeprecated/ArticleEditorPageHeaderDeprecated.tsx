import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { ConfirmDeleteModal } from 'src/shared/ui/common/ConfirmDeleteModal';
import { ConfirmCancelModal } from 'src/shared/ui/common/ConfirmCancelModal';
import { HStack } from '@/shared/ui/common/Stack';

import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import cls from '../ArticleEditorPageHeader.module.scss';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { Loader } from '@/shared/ui/deprecated/Loader';

import { ArticleEditorPageHeaderProps } from '../ArticleEditorPageHeader';
import { useArticleEditorPageHeader } from '../../../lib/hooks/useArticleEditorPageHeader/useArticleEditorPageHeader';

export const ArticleEditorPageHeaderDeprecated = memo(
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
        } = useArticleEditorPageHeader(onActions, hasErrors);

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
                <HStack gap="8" className={className}>
                    {isEditArticlePage && (
                        <>
                            <Button
                                theme={ButtonTheme.OUTLINE_RED}
                                onClick={deleteArticleModal.show}
                            >
                                {t('Видалити')}
                            </Button>
                            <Button onClick={cancelArticleEditing.show}>
                                {t('Відмінити')}
                            </Button>
                            <Button
                                theme={ButtonTheme.BACKGROUND_INVERTED}
                                onClick={handleUpdate}
                                disabled={!canSave}
                            >
                                {t('Зберегти зміни')}
                            </Button>
                        </>
                    )}
                    {!isEditArticlePage && (
                        <>
                            <Button
                                theme={ButtonTheme.OUTLINE_RED}
                                onClick={onActions.clear}
                            >
                                {t('Очистити')}
                            </Button>
                            <Button
                                theme={ButtonTheme.BACKGROUND_INVERTED}
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
