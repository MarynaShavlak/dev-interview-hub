import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import cls from '../ImageEditorForm.module.scss';
import { Input } from '@/shared/ui/deprecated/Input';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import AddIcon from '@/shared/assets/icons/plus.svg';
import { ActionButtonList } from '@/shared/ui/deprecated/ActionButtonList';

import { ImageEditorFormProps } from '../ImageEditorForm';
import { ImagePreview } from '../../ImagePreview/ImagePreview';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';

export const ImageEditorFormDeprecated = memo((props: ImageEditorFormProps) => {
    const {
        title,
        handleTitleChange,
        onSave,
        onDelete,
        hasNoValidImage,
        resetImage,
        preview,
        handleImageChange,
        imageTypeError,
    } = props;
    const { t } = useTranslation('articleDetails');
    const validConfig = useInputValidationConfig();
    const { blockTitleRequiredErrors } = useFormValidation(
        {
            blockTitle: title,
        },
        validConfig,
        'article',
    );
    const hasInputError = Object.values(blockTitleRequiredErrors).some(
        (error) => error,
    );

    return (
        <VStack justify="center" align="center" max>
            <VStack gap="16" max>
                <VStack gap="8" max className={cls.blockWrap}>
                    <Text title={t('Назва зображення')} size={TextSize.S} />
                    <Input
                        value={title}
                        maxWidth={false}
                        className={cls.titleInput}
                        onChange={handleTitleChange}
                        validations={validConfig.blockTitleRequired}
                        maxLengthIndicator
                        errors={blockTitleRequiredErrors}
                        withBorder
                    />
                </VStack>

                <HStack gap="16" align="end" justify="between" max>
                    <ImagePreview
                        imagePreview={preview}
                        handleImageChange={handleImageChange}
                        resetImage={resetImage}
                        error={imageTypeError}
                        title={title}
                    />
                    <ActionButtonList
                        successAction={{
                            label: t('Зберегти'),
                            onClick: onSave,
                            icon: AddIcon,
                            disabled: hasNoValidImage || hasInputError,
                        }}
                        cancelAction={{
                            label: t('Видалити'),
                            onClick: onDelete,
                        }}
                    />
                </HStack>
            </VStack>
        </VStack>
    );
});
