import React, { memo } from 'react';
import { Notification } from '../../model/types/notification';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { NotificationItemRedesigned } from './NotificationItemRedesigned/NotificationItemRedesigned';
import { NotificationItemDeprecated } from './NotificationItemDeprecated/NotificationItemDeprecated';

export interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<NotificationItemRedesigned {...props} />}
            off={<NotificationItemDeprecated {...props} />}
        />
    );
});
