import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';

import { HStack } from '@/shared/ui/redesigned/Stack';
import cls from '../AddCommentForm.module.scss';

interface DeprecatedAddCommentFormProps {
    className?: string;
    text: string;
    onCommentTextChange: (text: string) => void;
    onSendHandler: () => void;
}

export const DeprecatedAddCommentForm = memo(
    (props: DeprecatedAddCommentFormProps) => {
        const { text, className, onCommentTextChange, onSendHandler } = props;
        const { t } = useTranslation('article-details');

        return (
            <HStack
                justify="between"
                max
                className={classNames(cls.AddCommentForm, {}, [className])}
            >
                <Input
                    className={cls.input}
                    placeholder={t('Введіть текст коментаря')}
                    value={text}
                    onChange={onCommentTextChange}
                />
                <Button theme={ButtonTheme.OUTLINE} onClick={onSendHandler}>
                    {t('Відправити')}
                </Button>
            </HStack>
        );
    },
);
