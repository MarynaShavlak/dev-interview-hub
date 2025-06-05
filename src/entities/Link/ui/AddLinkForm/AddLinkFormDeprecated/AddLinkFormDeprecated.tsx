import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';

import { HStack, VStack } from '@/shared/ui/common/Stack';
import cls from '../AddLinkForm.module.scss';
import { useAddLinkForm } from '../../../lib/hook/useAddLinkForm/useAddLinkForm';
import { AddLinkFormProps } from '../AddLinkForm';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useInputErrors } from '@/shared/lib/hooks/validationHooks/useInputErrors/useInputErrors';

export const AddLinkFormDeprecated = memo((props: AddLinkFormProps) => {
    const { className, onAddLink } = props;
    const { t } = useTranslation('articles');
    const {
        text,
        label,
        error,
        onLinkTextChange,
        onSendHandler,
        wasSubmitted,
        onLinkLabelChange,
    } = useAddLinkForm(onAddLink);
    const validConfig = useInputValidationConfig();
    const linkErrors = useInputErrors(text, validConfig.subtitleLink);
    const labelErrors = useInputErrors(label, validConfig.title);
    const hasInputErrors =
        Object.values(labelErrors).some((error) => error) ||
        Object.values(linkErrors).some((error) => error);

    if (error) return null;

    return (
        <HStack
            justify="between"
            gap="16"
            max
            data-testid="AddLinkForm"
            className={classNames(cls.AddLinkForm, {}, [className])}
        >
            <VStack gap="16" className={cls.inputWrap}>
                <Input
                    className={cls.input}
                    placeholder={t('Вставте посилання')}
                    value={text}
                    onChange={onLinkTextChange}
                    validations={validConfig.subtitleLink}
                    maxLengthIndicator
                    errors={wasSubmitted ? linkErrors : undefined}
                />
                <Input
                    className={cls.input}
                    placeholder={t('Назва посилання')}
                    value={label}
                    onChange={onLinkLabelChange}
                    validations={validConfig.title}
                    maxLengthIndicator
                    errors={wasSubmitted ? labelErrors : undefined}
                />
            </VStack>
            <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onSendHandler}
                data-testid="AddLinkForm.Button"
                disabled={!text || hasInputErrors}
            >
                {t('Додати')}
            </Button>
        </HStack>
    );
});
