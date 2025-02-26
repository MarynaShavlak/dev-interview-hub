import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Each } from '@/shared/lib/components/Each/Each';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import cls from '../NotificationList.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { NotificationListProps } from '../NotificationList';
import { useAllNotifications } from '../../../api/notificationApi';
import { EmptyNotificationsList } from '../../EmptyNotificationsList/EmptyNotificationsList';
import { NotificationItem } from '../../NotificationItem/NotificationItem';
import { NotificationListSkeleton } from '../../NotificationListSkeleton/NotificationListSkeleton';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { deleteAllNotificationsThunk } from '../../../model/services/deleteAllNotificationsThunk/deleteAllNotificationsThunk';

export const NotificationListRedesigned = memo(
    (props: NotificationListProps) => {
        const { className } = props;
        const dispatch = useAppDispatch();
        const listClass = classNames(cls.NotificationList, {}, [className]);

        const { t } = useTranslation();
        const { data: allNotifications, isLoading } = useAllNotifications();
        const titleText = t('Сповіщення');

        const handleDeleteAllNotifications = useCallback(async () => {
            try {
                await dispatch(deleteAllNotificationsThunk());
                console.log('deleteAllNotifications');
            } catch (error) {
                console.error('Failed to dismiss notification:', error);
            }
        }, [dispatch]);

        if (isLoading) {
            return <NotificationListSkeleton className={className} />;
        }
        if (allNotifications?.length === 0) {
            return <EmptyNotificationsList className={className} />;
        }

        return (
            <VStack gap="16" max className={listClass}>
                <HStack
                    gap="16"
                    max
                    justify="between"
                    className={cls.headerRedesigned}
                >
                    <HStack gap="16">
                        <Text text={titleText} size="l" />
                        <span className={cls.notificationsCountRedesigned}>
                            {allNotifications?.length}
                        </span>
                    </HStack>
                    <Button
                        variant="cancel"
                        size="s"
                        className={cls.deleteBtn}
                        onClick={handleDeleteAllNotifications}
                        // disabled={!isSomeBlockAdded}
                    >
                        {t('Видалити всі')}
                    </Button>
                </HStack>
                {allNotifications && (
                    <Each
                        of={allNotifications}
                        render={(item) => (
                            <NotificationItem key={item.id} item={item} />
                        )}
                    />
                )}
            </VStack>
        );
    },
);
