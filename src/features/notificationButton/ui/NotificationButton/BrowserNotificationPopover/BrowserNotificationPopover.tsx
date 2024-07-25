import { ReactNode } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { NotificationList } from '@/entities/Notification';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import cls from './BrowserNotificationPopover.module.scss';
import { Popover } from '@/shared/ui/redesigned/Popups';

interface BrowserNotificationPopoverProps {
    className?: string;
    trigger: ReactNode;
}
export const BrowserNotificationPopover = ({
    className,
    trigger,
}: BrowserNotificationPopoverProps) => (
    <ToggleFeaturesComponent
        feature="isAppRedesigned"
        on={
            <Popover
                className={classNames(cls.NotificationButton, {}, [className])}
                direction="bottom left"
                trigger={trigger}
            >
                <NotificationList className={cls.notifications} />
            </Popover>
        }
        off={
            <PopoverDeprecated
                className={classNames(cls.NotificationButton, {}, [className])}
                direction="bottom left"
                trigger={trigger}
            >
                <NotificationList className={cls.notifications} />
            </PopoverDeprecated>
        }
    />
);
