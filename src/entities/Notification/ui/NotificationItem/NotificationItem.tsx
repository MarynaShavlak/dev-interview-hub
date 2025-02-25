import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './NotificationItem.module.scss';
import { Notification } from '../../model/types/notification';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { useNotificationLogic } from '../../lib/hooks/useNotificationLogic/useNotificationLogic';
import { NotificationItemRedesigned } from './NotificationItemRedesigned/NotificationItemRedesigned';
import { NotificationItemDeprecated } from './NotificationItemDeprecated/NotificationItemDeprecated';

export interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item } = props;
    const { title, message, timestamp, href, dismissedBy, id } = item;
    const cardClass = classNames(cls.NotificationItem, {}, [className]);
    const flexClasses = getFlexClasses({ hStack: true, gap: '8' });

    const { timeSpent, handleDeleteNotification } = useNotificationLogic(
        id,
        timestamp,
    );

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<NotificationItemRedesigned {...props} />}
            off={<NotificationItemDeprecated {...props} />}
        />
    );
});
