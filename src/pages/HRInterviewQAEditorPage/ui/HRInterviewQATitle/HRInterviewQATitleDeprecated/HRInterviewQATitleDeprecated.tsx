import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/deprecated/Input';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';

import { HStack, VStack } from '@/shared/ui/common/Stack';
import { OrderCard } from '@/shared/ui/deprecated/OrderCard';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';

import { HRInterviewQATitleProps } from '../HRInterviewQATitle';
import { useHRInterviewQAFormState } from '../../../lib/hooks/useHRInterviewQAFormState/useHRInterviewQAFormState';
import { HR_INTERVIEW_QA_TO_CREATE_TITLE } from '@/shared/const/localstorage';

export const HRInterviewQATitleDeprecated = memo(
    (props: HRInterviewQATitleProps) => {
        const { titleIndex, errors } = props;
        const validConfig = useInputValidationConfig();
        const { t } = useTranslation('articleDetails');

        const form = useHRInterviewQAFormState();

        const { formData, onChangeTitle } = form;
        const [initialTitle, setInitialTitle] = useState<string>(
            () => sessionStorage.getItem(HR_INTERVIEW_QA_TO_CREATE_TITLE) || '',
        );

        useEffect(() => {
            const storedTitle = sessionStorage.getItem(
                HR_INTERVIEW_QA_TO_CREATE_TITLE,
            );
            if (storedTitle) {
                sessionStorage.removeItem(HR_INTERVIEW_QA_TO_CREATE_TITLE);
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
                    <VStack gap="8" max>
                        <Text title={t('Заголовок статті')} size={TextSize.M} />
                        <Input
                            value={title || initialTitle || ''}
                            maxWidth
                            onChange={onChangeTitle}
                            validations={validConfig.title}
                            maxLengthIndicator
                            errors={errors.titleErrors}
                            withBorder
                        />
                    </VStack>
                </HStack>
            </VStack>
        );
    },
);
