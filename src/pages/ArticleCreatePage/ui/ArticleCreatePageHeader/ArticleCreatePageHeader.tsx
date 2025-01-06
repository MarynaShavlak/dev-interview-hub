import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { v4 } from 'uuid';
import { HStack } from '@/shared/ui/common/Stack';

import { useCreateArticle } from '../../lib/hooks/useCreateArticle/useCreateArticle';
import { Button } from '@/shared/ui/redesigned/Button';
import { useUserAuthData } from '@/entities/User';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';
import { Article } from '@/entities/Article';

interface ArticleCreatePageHeaderProps {
    className?: string;
}

export const ArticleCreatePageHeader = memo(
    (props: ArticleCreatePageHeaderProps) => {
        const { className } = props;
        const { t } = useTranslation('articleDetails');
        const { formData } = useCreateArticle();
        const isSomeBlockAdded = Number(formData?.blocks.length) > 0;

        const authData = useUserAuthData();
        const validConfig = useInputValidationConfig();

        // console.log('formData ', formData);
        const { hasErrors } = useFormValidation(
            {
                title: formData?.title || '',
                subtitleText: formData?.subtitle.text || '',
                subtitleLink: formData?.subtitle.link || '',
            },
            validConfig,
            'article',
        );

        const onSave = useCallback(() => {
            console.log('hjjj', formData);
            if (!authData) {
                console.error('User authentication data is missing');
                return;
            }
            if (!formData) {
                console.error('Form data is missing');
                return;
            }
            const createdArticle: Article = {
                ...formData,
                id: v4(),
                user: authData,
                createdAt: new Date().toISOString(),
            };
            console.log('createdArticle', createdArticle);
        }, [authData, formData]);

        return (
            <HStack gap="8">
                <Button
                    variant="cancel"
                    onClick={() => console.log('reset form data')}
                >
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
