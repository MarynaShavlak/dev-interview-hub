import { ReactNode } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { NotificationList } from '@/entities/Notification';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import cls from './BrowserNotificationPopover.module.scss';
import { Popover } from '@/shared/ui/redesigned/Popups';
import { TestProps } from '@/shared/types/tests';
import { useUserAuthData } from '@/entities/User';

interface BrowserNotificationPopoverProps extends TestProps {
    className?: string;
    trigger: ReactNode;
}
export const BrowserNotificationPopover = ({
    className,
    trigger,
    'data-testid': dataTestId,
}: BrowserNotificationPopoverProps) => {
    const user = useUserAuthData();

    return user?.id ? (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <Popover
                    className={classNames(cls.NotificationButton, {}, [
                        className,
                    ])}
                    direction="bottom left"
                    trigger={trigger}
                >
                    <NotificationList
                        className={cls.notifications}
                        userId={user.id}
                    />
                </Popover>
            }
            off={
                <PopoverDeprecated
                    className={classNames(cls.NotificationButton, {}, [
                        className,
                    ])}
                    direction="bottom left"
                    trigger={trigger}
                    data-testid={dataTestId}
                >
                    <NotificationList
                        className={cls.notifications}
                        userId={user.id}
                    />
                </PopoverDeprecated>
            }
        />
    ) : null;
};
