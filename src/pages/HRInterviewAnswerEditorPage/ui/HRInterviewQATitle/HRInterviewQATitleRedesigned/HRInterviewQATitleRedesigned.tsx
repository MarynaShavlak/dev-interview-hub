import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/redesigned/Input';

import { HStack, VStack } from '@/shared/ui/common/Stack';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';

import { HRInterviewQATitleProps } from '../HRInterviewQATitle';
import { HR_INTERVIEW_TO_CREATE_TITLE } from '@/shared/const/localstorage';
import { useHRInterviewQAFormState } from '../../../lib/hooks/useHRInterviewQAFormState/useHRInterviewQAFormState';

export const HRInterviewQATitleRedesigned = memo(
    (props: HRInterviewQATitleProps) => {
        const { titleIndex, errors } = props;
        const validConfig = useInputValidationConfig();
        const { t } = useTranslation('articleDetails');

        const form = useHRInterviewQAFormState();

        const { formData, onChangeTitle } = form;

        const [initialTitle, setInitialTitle] = useState<string>(
            () => sessionStorage.getItem(HR_INTERVIEW_TO_CREATE_TITLE) || '',
        );

        useEffect(() => {
            const storedTitle = sessionStorage.getItem(
                HR_INTERVIEW_TO_CREATE_TITLE,
            );
            if (storedTitle) {
                sessionStorage.removeItem(HR_INTERVIEW_TO_CREATE_TITLE);
            }
        }, []);

        if (!formData) {
            return null;
        }
        const { title } = formData;

        return (
            <VStack gap="24" max>
                <HStack gap="16" align="start" max>
                    <OrderCard index={titleIndex} />

                    <Input
                        value={title || initialTitle || ''}
                        label={t('Питання від рекрутера')}
                        labelBold
                        gap="16"
                        maxWidth
                        onChange={onChangeTitle}
                        validations={validConfig.title}
                        maxLengthIndicator
                        errors={errors.titleErrors}
                    />
                </HStack>
            </VStack>
        );
    },
);
