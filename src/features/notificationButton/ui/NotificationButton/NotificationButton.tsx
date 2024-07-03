import React, { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { BrowserNotificationPopover } from './BrowserNotificationPopover/BrowserNotificationPopover';
import { Trigger } from './Trigger/Trigger';
import { NotificationList } from '@/entities/Notification';
import { Drawer } from '@/shared/ui/redesigned/Drawer';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;

    const [isOpen, setIsOpen] = useState(false);

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <div>
            <BrowserView>
                <BrowserNotificationPopover
                    className={className}
                    trigger={<Trigger onClick={onOpenDrawer} />}
                />
            </BrowserView>
            <MobileView>
                <Trigger onClick={onOpenDrawer} />
                <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                    <NotificationList />
                </Drawer>
            </MobileView>
        </div>
    );
});
