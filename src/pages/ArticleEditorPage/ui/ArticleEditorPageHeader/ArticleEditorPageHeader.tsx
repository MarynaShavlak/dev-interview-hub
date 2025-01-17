import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { HStack } from '@/shared/ui/common/Stack';

import { useArticleFormState } from '../../lib/hooks/useArticleFormState/useArticleFormState';
import { Button } from '@/shared/ui/redesigned/Button';

interface ArticleEditorPageHeaderProps {
    className?: string;
    hasErrors: boolean;
    onClear: () => void;
    onSave: () => void;
    onCancel: () => void;
    onDelete: () => void;
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

        const handleSave = useCallback(() => {
            onSave();

            // if (formData) {
            //     navigate(getRouteArticleDetails(formData.id));
            // }
        }, [onSave]);

        const handleDelete = useCallback(() => {
            onDelete();
            // navigate(getRouteArticles(), { replace: true });
        }, [onDelete]);

        const isSomeBlockAdded = Number(formData?.blocks.length) > 0;
        const cancelActionBtnText = isEditArticlePage
            ? t('Видалити')
            : t('Очистити');

        return (
            <HStack gap="8" className={className}>
                {isEditArticlePage && (
                    <Button variant="cancel" onClick={handleDelete}>
                        {cancelActionBtnText}
                    </Button>
                )}
                {!isEditArticlePage && (
                    <Button variant="cancel" onClick={onClear}>
                        {cancelActionBtnText}
                    </Button>
                )}
                {isEditArticlePage && (
                    <Button onClick={onCancel}>{t('Відмінити')}</Button>
                )}

                <Button
                    variant="save"
                    onClick={handleSave}
                    disabled={hasErrors || !isSomeBlockAdded}
                >
                    {t('Зберегти')}
                </Button>
            </HStack>
        );
    },
);
