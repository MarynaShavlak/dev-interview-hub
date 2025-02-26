import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from '../NotificationItem.module.scss';

import { Card } from '@/shared/ui/redesigned/Card';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { VStack } from '@/shared/ui/common/Stack';
import CloseIcon from '@/shared/assets/icons/close.svg';
import { useNotificationLogic } from '../../../lib/hooks/useNotificationLogic/useNotificationLogic';
import { NotificationItemProps } from '../NotificationItem';

export const NotificationItemRedesigned = memo(
    (props: NotificationItemProps) => {
        const { className, item } = props;
        const { href } = item;
        const cardClass = classNames(cls.NotificationItem, {}, [className]);
        const flexClasses = getFlexClasses({
            hStack: true,
            gap: '8',
            align: 'start',
        });

        const { timeSpent, handleDeleteNotification, title, message } =
            useNotificationLogic(item);

        return (
            <Card className={classNames(cardClass, {}, flexClasses)}>
                <Icon
                    Svg={NotificationIcon}
                    width={40}
                    height={40}
                    className={cls.notificationItemIcon}
                />
                <VStack gap="4">
                    {href ? (
                        <a
                            className={classNames(cls.link, {}, [
                                cls.linkRedesigned,
                            ])}
                            target="_blank"
                            href={href}
                            rel="noreferrer"
                        >
                            <Text title={title} text={message} bold />
                        </a>
                    ) : (
                        <Text title={title} text={message} bold />
                    )}
                    <Text text={timeSpent} size="m" variant="secondary" />
                    <Icon
                        variant="error"
                        Svg={CloseIcon}
                        className={cls.closeIconRedesigned}
                        clickable
                        onClick={handleDeleteNotification}
                    />
                </VStack>
            </Card>
        );
    },
);
