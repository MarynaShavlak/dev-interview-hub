import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import cls from '../CodeEditorForm.module.scss';
import { Input } from '@/shared/ui/deprecated/Input';

import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { ActionButtonList } from '@/shared/ui/deprecated/ActionButtonList';
import AddIcon from '@/shared/assets/icons/plus.svg';
import { CodeEditorFormProps } from '../CodeEditorForm';
import { CodeEditor } from '@/shared/ui/common/CodeEditor';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';

export const CodeEditorFormDeprecated = memo((props: CodeEditorFormProps) => {
    const {
        title,
        handleTitleChange,
        code,
        onCodeChange,
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
        <VStack gap="16" max>
            <VStack gap="8" max className={cls.blockWrap}>
                <Text title={t('Заголовок блоку')} size={TextSize.S} />
                <Input
                    value={title}
                    maxWidth={false}
                    className={cls.titleInput}
                    onChange={handleTitleChange}
                    validations={validConfig.blockTitle}
                    maxLengthIndicator
                    errors={blockTitleErrors}
                    withBorder
                />
            </VStack>

            <HStack gap="16" align="end" justify="between" max>
                <CodeEditor
                    height="200px"
                    width="650px"
                    loader={<Skeleton width="100%" height="200px" />}
                    onChangeCode={onCodeChange}
                    initialCode={code}
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
