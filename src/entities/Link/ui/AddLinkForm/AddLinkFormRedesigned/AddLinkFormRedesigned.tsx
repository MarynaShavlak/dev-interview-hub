import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Card } from '@/shared/ui/redesigned/Card';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';

import { HStack, VStack } from '@/shared/ui/common/Stack';
import cls from '../AddLinkForm.module.scss';
import { useAddLinkForm } from '../../../lib/hook/useAddLinkForm/useAddLinkForm';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useInputErrors } from '@/shared/lib/hooks/validationHooks/useInputErrors/useInputErrors';
import { AddLinkFormProps } from '../AddLinkForm';

export const AddLinkFormRedesigned = memo((props: AddLinkFormProps) => {
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

    if (error) {
        return null;
    }

    return (
        <Card padding="24" max border="partial">
            <HStack
                data-testid="AddLinkForm"
                justify="between"
                align="end"
                max
                gap="16"
                className={classNames(cls.AddLinkFormRedesigned, {}, [
                    className,
                ])}
            >
                <VStack gap="16" className={cls.inputWrap}>
                    <Input
                        className={cls.input}
                        label={t('Посилання')}
                        placeholder={t('Вставте посилання')}
                        value={text}
                        onChange={onLinkTextChange}
                        validations={validConfig.subtitleLink}
                        errors={wasSubmitted ? undefined : linkErrors}
                    />
                    <Input
                        label={t('Назва посилання')}
                        className={cls.input}
                        placeholder={t('Введіть назву посилання')}
                        value={label}
                        onChange={onLinkLabelChange}
                        validations={validConfig.title}
                        maxLengthIndicator
                        errors={wasSubmitted ? labelErrors : undefined}
                    />
                </VStack>

                <Button
                    data-testid="AddLinkForm.Button"
                    onClick={onSendHandler}
                    disabled={!text || !label || hasInputErrors}
                >
                    {t('Додати')}
                </Button>
            </HStack>
        </Card>
    );
});
