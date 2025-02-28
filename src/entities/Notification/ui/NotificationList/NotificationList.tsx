import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { NotificationListRedesigned } from './NotificationListRedesigned/NotificationListRedesigned';
import { NotificationListDeprecated } from './NotificationListDeprecated/NotificationListDeprecated';

export interface NotificationListProps {
    className?: string;
    userId: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<NotificationListRedesigned {...props} />}
            off={<NotificationListDeprecated {...props} />}
        />
    );
});
