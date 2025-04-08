import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';

import { HStack } from '@/shared/ui/common/Stack';
import cls from '../AddQuestionForm.module.scss';
import { useAddQuestionForm } from '../../../lib/hook/useAddQuestionForm/useAddQuestionForm';
import { AddQuestionFormProps } from '../AddQuestionForm';

export const AddQuestionFormDeprecated = memo((props: AddQuestionFormProps) => {
    const { className, onAddQuestion } = props;
    const { t } = useTranslation('articles');
    const { text, error, onQuestionTextChange, onSendHandler } =
        useAddQuestionForm(onAddQuestion);

    if (error) return null;

    return (
        <HStack
            justify="between"
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
            />
            <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onSendHandler}
                data-testid="AddQuestionForm.Button"
            >
                {t('Додати')}
            </Button>
        </HStack>
    );
});
