import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { HStack } from '@/shared/ui/common/Stack';

import { useArticleEditorState } from '../../lib/hooks/useArticleEditorState/useArticleEditorState';
import { Button } from '@/shared/ui/redesigned/Button';

interface ArticleEditorPageHeaderProps {
    className?: string;
    hasErrors: boolean;
    onCancel: () => void;
    onSave: () => void;
    isEditArticlePage: boolean;
}

export const ArticleEditorPageHeader = memo(
    (props: ArticleEditorPageHeaderProps) => {
        const { className, hasErrors, onCancel, onSave, isEditArticlePage } =
            props;
        const { t } = useTranslation('articleDetails');
        const { formData } = useArticleEditorState();

        const isSomeBlockAdded = Number(formData?.blocks.length) > 0;
        const cancelActionBtnText = isEditArticlePage
            ? t('Видалити')
            : t('Очистити');

        return (
            <HStack gap="8" className={className}>
                <Button
                    variant="save"
                    onClick={onSave}
                    disabled={hasErrors || !isSomeBlockAdded}
                >
                    {t('Зберегти')}
                </Button>
                <Button variant="cancel" onClick={onCancel}>
                    {cancelActionBtnText}
                </Button>
            </HStack>
        );
    },
);
