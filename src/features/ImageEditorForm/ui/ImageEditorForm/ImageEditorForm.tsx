import React, { ChangeEvent, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import cls from './ImageEditorForm.module.scss';
import { Input } from '@/shared/ui/redesigned/Input';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import AddIcon from '@/shared/assets/icons/plus.svg';
import { ActionButtonList } from '@/shared/ui/redesigned/ActionButtonList';
import { ImagePreview } from '../ImagePreview/ImagePreview';

export interface ImageEditorFormProps {
    title: string;
    handleTitleChange: (title: string) => void;
    onSave: () => void;
    onDelete: () => void;
    hasNoValidImage: boolean;
    imagePreview: string | null;
    imageTypeError: string | null;
    handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
    resetImage: () => void;
}

export const ImageEditorForm = memo((props: ImageEditorFormProps) => {
    const {
        title,
        handleTitleChange,
        onSave,
        onDelete,
        hasNoValidImage,
        resetImage,
        imagePreview,
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
                <Input
                    value={title}
                    label={t('Назва зображення')}
                    labelBold
                    gap="16"
                    maxWidth={false}
                    className={cls.titleInput}
                    onChange={handleTitleChange}
                    validations={validConfig.blockTitleRequired}
                    maxLengthIndicator
                    errors={blockTitleRequiredErrors}
                />
                <HStack gap="16" align="end" justify="between" max>
                    <ImagePreview
                        imagePreview={imagePreview}
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
