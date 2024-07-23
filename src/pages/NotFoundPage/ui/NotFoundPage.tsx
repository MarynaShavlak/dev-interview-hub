import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import cls from './NotFoundPage.module.scss';
import { getFlexClasses } from '@/shared/lib/getFlexClasses/getFlexClasses';

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = memo(({ className }: NotFoundPageProps) => {
    const { t } = useTranslation();
    const text = t('Сторінку не знайдено');
    const additionalClasses = getFlexClasses({ hStack: true });
    return (
        <Page
            className={classNames(cls.NotFoundPage, {}, [
                className,
                ...additionalClasses,
            ])}
            data-testid="NotFoundPage"
        >
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<Text text={text} />}
                off={<TextDeprecated text={text} />}
            />
        </Page>
    );
});
