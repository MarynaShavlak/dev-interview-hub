import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { toggleFeatures, ToggleFeaturesComponent } from '@/shared/lib/features';
import { Each } from '@/shared/lib/components/Each/Each';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { VStack } from '@/shared/ui/common/Stack';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { useAllNotifications } from '../../api/notificationApi';
import cls from './NotificationList.module.scss';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { Text } from '@/shared/ui/redesigned/Text';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';

interface NotificationListProps {
    className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
    const { className } = props;
    const listClass = classNames(cls.NotificationList, {}, [className]);

    const { t } = useTranslation();
    const { data: allNotifications, isLoading } = useAllNotifications();
    console.log('all', allNotifications);
    const noNotificationsMessage = t('Немає сповіщень');

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });

    if (isLoading) {
        return (
            <VStack gap="16" max className={listClass}>
                <Skeleton width="100%" border="8px" height="80px" />
                <Skeleton width="100%" border="8px" height="80px" />
                <Skeleton width="100%" border="8px" height="80px" />
            </VStack>
        );
    }
    if (allNotifications?.length === 0) {
        return (
            <VStack gap="16" max className={listClass} align="center">
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={<Text text={noNotificationsMessage} />}
                    off={<TextDeprecated text={noNotificationsMessage} />}
                />
            </VStack>
        );
    }

    return (
        <VStack gap="16" max className={listClass}>
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
});

// const [pollingInterval] = useState(5000); // Set the polling interval (5 seconds)

// useEffect(() => {
//     // Set up polling interval to refetch notifications
//     const interval = setInterval(() => {
//         refetch();
//     }, pollingInterval);
//
//     // Clear the interval when the component unmounts
//     return () => clearInterval(interval);
// }, [refetch, pollingInterval]);
// console.log('data', data);
