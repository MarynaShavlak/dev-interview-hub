import React, { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { BrowserNotificationPopover } from './BrowserNotificationPopover/BrowserNotificationPopover';
import { NotificationButtonTrigger } from './NotificationButtonTrigger/NotificationButtonTrigger';
import { NotificationList } from '@/entities/Notification';
import { Drawer } from '@/shared/ui/common/Drawer';
import { useUserAuthData } from '@/entities/User';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;
    const user = useUserAuthData();

    // const [isOpen, setIsOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    return user?.id ? (
        <div data-testid="notification-button">
            <BrowserView>
                <BrowserNotificationPopover
                    className={className}
                    data-testid="notifications-popover"
                    trigger={
                        <NotificationButtonTrigger
                            onClick={onOpenDrawer}
                            data-testid="notifications-trigger-btn-desktop"
                        />
                    }
                />
            </BrowserView>
            <MobileView>
                <NotificationButtonTrigger
                    onClick={onOpenDrawer}
                    data-testid="notifications-trigger-btn-mobile"
                />
                <Drawer
                    isOpen={isOpen}
                    onClose={onCloseDrawer}
                    data-testid="notifications-drawer"
                >
                    <NotificationList userId={user.id} />
                </Drawer>
            </MobileView>
        </div>
    ) : null;
});
