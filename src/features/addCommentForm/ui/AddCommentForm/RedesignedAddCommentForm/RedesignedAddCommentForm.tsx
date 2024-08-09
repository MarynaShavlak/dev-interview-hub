import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Card } from '@/shared/ui/redesigned/Card';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';

import { HStack } from '@/shared/ui/redesigned/Stack';
import cls from '../AddCommentForm.module.scss';
import { AddCommentFormProps } from '../AddCommentForm';
import { useAddCommentForm } from '../../../lib/hook/useAddCommentForm';

export const RedesignedAddCommentForm = memo((props: AddCommentFormProps) => {
    const { className, onSendComment } = props;
    const { t } = useTranslation('article-details');
    const { text, error, onCommentTextChange, onSendHandler } =
        useAddCommentForm(onSendComment);

    if (error) return null;

    return (
        <Card padding="24" max border="partial">
            <HStack
                data-testid="AddCommentForm"
                justify="between"
                max
                gap="16"
                className={classNames(cls.AddCommentFormRedesigned, {}, [
                    className,
                ])}
            >
                <Input
                    className={cls.input}
                    placeholder={t('Введіть текст коментаря')}
                    value={text}
                    data-testid="AddCommentForm.Input"
                    onChange={onCommentTextChange}
                />
                <Button
                    data-testid="AddCommentForm.Button"
                    onClick={onSendHandler}
                >
                    {t('Відправити')}
                </Button>
            </HStack>
        </Card>
    );
});
