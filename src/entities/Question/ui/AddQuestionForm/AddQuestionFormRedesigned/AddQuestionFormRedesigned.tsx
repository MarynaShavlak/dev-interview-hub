import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Card } from '@/shared/ui/redesigned/Card';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';

import { HStack } from '@/shared/ui/common/Stack';
import cls from '../AddQuestionForm.module.scss';
import { AddQuestionFormProps } from '../AddQuestionForm';
import { useAddQuestionForm } from '../../../lib/hook/useAddQuestionForm/useAddQuestionForm';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useInputErrors } from '@/shared/lib/hooks/validationHooks/useInputErrors/useInputErrors';

export const AddQuestionFormRedesigned = memo((props: AddQuestionFormProps) => {
    const { className, onAddQuestion } = props;
    const { t } = useTranslation('articles');
    const { text, error, onQuestionTextChange, onSendHandler, wasSubmitted } =
        useAddQuestionForm(onAddQuestion);
    const validConfig = useInputValidationConfig();
    const titleErrors = useInputErrors(text, validConfig.title);
    const hasInputErrors = Object.values(titleErrors).some((error) => error);
    if (error) {
        return null;
    }

    return (
        <Card padding="24" max border="partial">
            <HStack
                data-testid="AddQuestionForm"
                justify="between"
                align="end"
                max
                gap="16"
                className={classNames(cls.AddQuestionFormRedesigned, {}, [
                    className,
                ])}
            >
                <Input
                    className={cls.input}
                    placeholder={t('Введіть текст питання')}
                    value={text}
                    data-testid="AddQuestionForm.Input"
                    onChange={onQuestionTextChange}
                    validations={validConfig.title}
                    maxLengthIndicator
                    errors={wasSubmitted ? titleErrors : undefined}
                />
                <Button
                    data-testid="AddQuestionForm.Button"
                    onClick={onSendHandler}
                    disabled={!text || hasInputErrors}
                >
                    {t('Додати')}
                </Button>
            </HStack>
        </Card>
    );
});
