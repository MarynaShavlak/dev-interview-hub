import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';

import { HStack } from '@/shared/ui/common/Stack';
import cls from '../AddQuestionForm.module.scss';
import { useAddQuestionForm } from '../../../lib/hook/useAddQuestionForm/useAddQuestionForm';
import { AddQuestionFormProps } from '../AddQuestionForm';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useInputErrors } from '@/shared/lib/hooks/validationHooks/useInputErrors/useInputErrors';

export const AddQuestionFormDeprecated = memo((props: AddQuestionFormProps) => {
    const { className, onAddQuestion } = props;
    const { t } = useTranslation('articles');
    const { text, error, onQuestionTextChange, onSendHandler, wasSubmitted } =
        useAddQuestionForm(onAddQuestion);
    const validConfig = useInputValidationConfig();
    const titleErrors = useInputErrors(text, validConfig.title);
    const hasInputErrors = Object.values(titleErrors).some((error) => error);

    if (error) return null;

    return (
        <HStack
            justify="between"
            gap="16"
            max
            data-testid="AddQuestionForm"
            className={classNames(cls.AddQuestionForm, {}, [className])}
        >
            <Input
                className={cls.input}
                placeholder={t('Введіть текст питання')}
                value={text}
                onChange={onQuestionTextChange}
                data-testid="AddQuestionForm.Input"
                validations={validConfig.title}
                maxLengthIndicator
                errors={wasSubmitted ? titleErrors : undefined}
            />
            <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onSendHandler}
                data-testid="AddQuestionForm.Button"
                disabled={!text || hasInputErrors}
            >
                {t('Додати')}
            </Button>
        </HStack>
    );
});
