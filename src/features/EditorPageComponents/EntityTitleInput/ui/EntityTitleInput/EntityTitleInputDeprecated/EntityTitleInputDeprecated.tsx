import React, { useEffect, useState } from 'react';
import { Input } from '@/shared/ui/deprecated/Input';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';

import { useLabelTranslationKey } from '../../../lib/hooks/useLabelTranslationKey/useLabelTranslationKey';
import { getStorageKey } from '../../../lib/utils/getStorageKey/getStorageKey';
import { EntityTitleProps } from '../EntityTitleInput';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/common/Stack';

export const EntityTitleInputDeprecated = <T extends { title?: string }>(
    props: EntityTitleProps<T>,
) => {
    const { errors, formData, onChangeTitle, entityType } = props;
    const validConfig = useInputValidationConfig();
    const labelText = useLabelTranslationKey(entityType);
    const storageKey = getStorageKey(entityType);

    const [initialTitle, setInitialTitle] = useState<string>(
        () => sessionStorage.getItem(storageKey) || '',
    );

    useEffect(() => {
        const storedTitle = sessionStorage.getItem(storageKey);
        if (storedTitle) {
            sessionStorage.removeItem(storageKey);
        }
    }, [storageKey]);

    if (!formData) {
        return null;
    }
    const { title } = formData;

    return (
        <VStack gap="8" max>
            <Text title={labelText} size={TextSize.M} />
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
    );
};
