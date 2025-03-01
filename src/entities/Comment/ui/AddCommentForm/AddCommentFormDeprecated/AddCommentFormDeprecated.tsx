import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';

import { HStack } from '@/shared/ui/common/Stack';
import cls from '../AddCommentForm.module.scss';
import { useAddCommentForm } from '../../../lib/hook/useAddCommentForm/useAddCommentForm';
import { AddCommentFormProps } from '../AddCommentForm';

export const AddCommentFormDeprecated = memo((props: AddCommentFormProps) => {
    const { className, onSendComment } = props;
    const { t } = useTranslation('articleDetails');
    const { text, error, onCommentTextChange, onSendHandler } =
        useAddCommentForm(onSendComment);

    if (error) return null;

    return (
        <HStack
            justify="between"
            max
            data-testid="AddCommentForm"
            className={classNames(cls.AddCommentForm, {}, [className])}
        >
            <Input
                className={cls.input}
                placeholder={t('Введіть текст коментаря')}
                value={text}
                onChange={onCommentTextChange}
                data-testid="AddCommentForm.Input"
            />
            <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onSendHandler}
                data-testid="AddCommentForm.Button"
            >
                {t('Відправити')}
            </Button>
        </HStack>
    );
});
