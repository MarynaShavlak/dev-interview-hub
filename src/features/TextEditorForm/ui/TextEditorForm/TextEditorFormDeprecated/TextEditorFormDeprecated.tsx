import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { MarkupHTMLCreator } from '@/shared/ui/common/MarkupHTMLCreator';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import cls from '../TextEditorForm.module.scss';
import { Input } from '@/shared/ui/redesigned/Input';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import AddIcon from '@/shared/assets/icons/plus.svg';
import { ActionButtonList } from '@/shared/ui/redesigned/ActionButtonList';
import { TextEditorFormProps } from '../TextEditorForm';

export const TextEditorFormDeprecated = memo((props: TextEditorFormProps) => {
    const {
        title,
        handleTitleChange,
        editorState,
        onEditorStateChange,
        onSave,
        onDelete,
        hasNoContent,
    } = props;
    const { t } = useTranslation('articleDetails');
    const validConfig = useInputValidationConfig();
    const { blockTitleErrors } = useFormValidation(
        {
            blockTitle: title,
        },
        validConfig,
        'article',
    );
    const hasInputError = Object.values(blockTitleErrors).some(
        (error) => error,
    );

    return (
        <VStack gap="16" max className={cls.blockWrap}>
            <Input
                value={title}
                label={t('Заголовок блоку')}
                labelBold
                gap="16"
                maxWidth={false}
                className={cls.titleInput}
                onChange={handleTitleChange}
                validations={validConfig.blockTitle}
                maxLengthIndicator
                errors={blockTitleErrors}
            />
            <HStack align="end" justify="between" max>
                <MarkupHTMLCreator
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                />
                <ActionButtonList
                    successAction={{
                        label: t('Зберегти'),
                        onClick: onSave,
                        icon: AddIcon,
                        disabled: hasNoContent || hasInputError,
                    }}
                    cancelAction={{
                        label: t('Видалити'),
                        onClick: onDelete,
                    }}
                />
            </HStack>
        </VStack>
    );
});
