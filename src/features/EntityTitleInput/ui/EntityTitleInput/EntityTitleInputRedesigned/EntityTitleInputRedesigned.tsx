import React, { useEffect, useState } from 'react';
import { Input } from '@/shared/ui/redesigned/Input';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';

import { useLabelTranslationKey } from '../../../lib/hooks/useLabelTranslationKey/useLabelTranslationKey';
import { getStorageKey } from '../../../lib/utils/getStorageKey/getStorageKey';
import { EntityTitleProps } from '../EntityTitleInput';

export const EntityTitleInputRedesigned = <T extends { title?: string }>(
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
        <Input
            value={title || initialTitle || ''}
            label={labelText}
            labelBold
            gap="16"
            maxWidth
            onChange={onChangeTitle}
            validations={validConfig.title}
            maxLengthIndicator
            errors={errors.titleErrors}
        />
    );
};
