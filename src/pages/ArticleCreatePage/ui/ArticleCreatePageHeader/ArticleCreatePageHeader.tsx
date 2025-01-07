import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { HStack } from '@/shared/ui/common/Stack';

import { useArticleEditor } from '../../lib/hooks/useArticleEditor/useArticleEditor';
import { Button } from '@/shared/ui/redesigned/Button';

interface ArticleCreatePageHeaderProps {
    className?: string;
    hasErrors: boolean;

    onCancel: () => void;
    onSave: () => void;
}

export const ArticleCreatePageHeader = memo(
    (props: ArticleCreatePageHeaderProps) => {
        const { className, hasErrors, onCancel, onSave } = props;
        const { t } = useTranslation('articleDetails');
        const { formData } = useArticleEditor();

        const isSomeBlockAdded = Number(formData?.blocks.length) > 0;

        return (
            <HStack gap="8">
                <Button variant="cancel" onClick={onCancel}>
                    {t('Видалити')}
                </Button>
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
