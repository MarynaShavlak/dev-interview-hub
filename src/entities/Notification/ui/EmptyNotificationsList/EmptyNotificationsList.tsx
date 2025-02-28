import React from 'react';
import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/common/Stack';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from '../NotificationList/NotificationList.module.scss';

interface EmptyNotificationsListProps {
    className?: string;
}

export const EmptyNotificationsList = ({
    className,
}: EmptyNotificationsListProps) => {
    const listClass = classNames(cls.NotificationList, {}, [className]);

    const { t } = useTranslation();
    const noNotificationsMessage = t('Немає сповіщень');
    return (
        <VStack gap="16" max className={listClass} align="center">
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<Text text={noNotificationsMessage} />}
                off={<TextDeprecated text={noNotificationsMessage} />}
            />
        </VStack>
    );
};
