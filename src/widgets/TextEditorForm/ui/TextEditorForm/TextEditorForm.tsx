import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { EditorState } from 'draft-js';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { MarkupHTMLCreator } from '@/shared/ui/redesigned/MarkupHTMLCreator';
import cls from './TextEditorForm.module.scss';
import { Input } from '@/shared/ui/redesigned/Input';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import AddIcon from '@/shared/assets/icons/plus.svg';
import { ActionButtonList } from '@/shared/ui/redesigned/ActionButtonList';

export interface TextEditorFormProps {
    title: string;
    handleTitleChange: (title: string) => void;
    editorState: EditorState;
    onEditorStateChange: (state: EditorState) => void;
    onSave: () => void;
    onDelete: () => void;
    hasContent: boolean;
}

export const TextEditorForm = memo((props: TextEditorFormProps) => {
    const {
        title,
        handleTitleChange,
        editorState,
        onEditorStateChange,
        onSave,
        onDelete,
        hasContent,
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
                        disabled: hasContent || hasInputError,
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
