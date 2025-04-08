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

export const AddQuestionFormRedesigned = memo((props: AddQuestionFormProps) => {
    const { className, onAddQuestion } = props;
    const { t } = useTranslation('articles');
    const { text, error, onQuestionTextChange, onSendHandler } =
        useAddQuestionForm(onAddQuestion);

    if (error) {
        return null;
    }

    return (
        <Card padding="24" max border="partial">
            <HStack
                data-testid="AddQuestionForm"
                justify="between"
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
                />
                <Button
                    data-testid="AddQuestionForm.Button"
                    onClick={onSendHandler}
                    disabled={!text}
                >
                    {t('Додати')}
                </Button>
            </HStack>
        </Card>
    );
});
