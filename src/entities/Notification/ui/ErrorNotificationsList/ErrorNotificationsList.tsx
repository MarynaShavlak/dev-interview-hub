import React from 'react';
import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/common/Stack';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from '../NotificationList/NotificationList.module.scss';

interface ErrorNotificationsListProps {
    className?: string;
}

export const ErrorNotificationsList = ({
    className,
}: ErrorNotificationsListProps) => {
    const listClass = classNames(cls.NotificationList, {}, [className]);
    const { t } = useTranslation();
    const errorMessage = t(
        'Не вдалося завантажити сповіщення. Спробуйте ще раз пізніше.',
    );

    return (
        <VStack gap="16" max className={listClass} align="center">
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<Text text={errorMessage} />}
                off={<TextDeprecated text={errorMessage} />}
            />
        </VStack>
    );
};
