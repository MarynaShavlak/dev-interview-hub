import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from '../NotificationItem.module.scss';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { useNotificationLogic } from '../../../lib/hooks/useNotificationLogic/useNotificationLogic';
import { NotificationItemProps } from '../NotificationItem';
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';

export const NotificationItemDeprecated = memo(
    (props: NotificationItemProps) => {
        const { className, item } = props;
        const { title, message, timestamp, href, dismissedBy, id } = item;
        const cardClass = classNames(cls.NotificationItem, {}, [className]);
        const flexClasses = getFlexClasses({ hStack: true, gap: '8' });

        const { timeSpent, handleDeleteNotification } = useNotificationLogic(
            id,
            timestamp,
        );

        return (
            <CardDeprecated theme={CardTheme.OUTLINED} className={cardClass}>
                <TextDeprecated title={title} text={message} />
            </CardDeprecated>
        );
    },
);
