import React, { memo, useCallback } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './NotificationItem.module.scss';
import { Notification } from '../../model/types/notification';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { VStack } from '@/shared/ui/common/Stack';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { deleteNotificationThunk } from '../../model/services/deleteNotificationThunk/deleteNotificationThunk';
import CloseIcon from '@/shared/assets/icons/close.svg';

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item } = props;
    const { title, message, timestamp, href, dismissedBy, id } = item;

    console.log('dismissedBy', dismissedBy);
    const cardClass = classNames(cls.NotificationItem, {}, [className]);
    dayjs.extend(relativeTime);
    const timeSpent = dayjs(timestamp).fromNow();
    const flexClasses = getFlexClasses({ hStack: true, gap: '8' });
    const dispatch = useAppDispatch();

    const handleDeleteNotification = useCallback(async () => {
        try {
            await dispatch(deleteNotificationThunk(id));
            console.log('delete notification');
        } catch (error) {
            console.error('Failed to dismiss notification:', error);
        }
    }, [dispatch, id]);

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
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
                                className={cls.link}
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
            }
            off={
                <CardDeprecated
                    theme={CardTheme.OUTLINED}
                    className={cardClass}
                >
                    <TextDeprecated title={title} text={message} />
                </CardDeprecated>
            }
        />
    );
});
