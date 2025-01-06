import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { HStack } from '@/shared/ui/common/Stack';

import { useCreateArticle } from '../../lib/hooks/useCreateArticle/useCreateArticle';
import { Button } from '@/shared/ui/redesigned/Button';
import { useUserAuthData } from '@/entities/User';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';

interface ArticleCreatePageHeaderProps {
    className?: string;
}

export const ArticleCreatePageHeader = memo(
    (props: ArticleCreatePageHeaderProps) => {
        const { className } = props;
        const { t } = useTranslation('articleDetails');
        const { formData } = useCreateArticle();
        const authData = useUserAuthData();
        const validConfig = useInputValidationConfig();
        console.log('formData ', formData);
        // const { hasErrors, blockTitleErrors } = useFormValidation(
        //     {
        //         blockTitle: formtitle,
        //     },
        //     validConfig,
        //     'article',
        // );

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
                    onClick={() => console.log(formData)}
                    // disabled={hasErrors}
                >
                    {t('Зберегти')}
                </Button>
            </HStack>
        );
    },
);
