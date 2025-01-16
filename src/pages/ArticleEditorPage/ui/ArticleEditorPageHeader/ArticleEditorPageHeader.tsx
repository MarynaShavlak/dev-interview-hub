import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { HStack } from '@/shared/ui/common/Stack';

import { useArticleFormState } from '../../lib/hooks/useArticleFormState/useArticleFormState';
import { Button } from '@/shared/ui/redesigned/Button';

interface ArticleEditorPageHeaderProps {
    className?: string;
    hasErrors: boolean;
    onClear: () => void;
    onSave: () => void;
    onCancel: () => void;
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
        } = props;
        const { t } = useTranslation('articleDetails');
        const { formData } = useArticleFormState();

        const isSomeBlockAdded = Number(formData?.blocks.length) > 0;
        const cancelActionBtnText = isEditArticlePage
            ? t('Видалити')
            : t('Очистити');

        return (
            <HStack gap="8" className={className}>
                <Button variant="cancel" onClick={onClear}>
                    {cancelActionBtnText}
                </Button>
                {isEditArticlePage && (
                    <Button onClick={onCancel}>{t('Відмінити')}</Button>
                )}

                <Button
                    variant="save"
                    onClick={onSave}
                    disabled={hasErrors || !isSomeBlockAdded}
                >
                    {t('Зберегти')}
                </Button>
            </HStack>
        );
    },
);
