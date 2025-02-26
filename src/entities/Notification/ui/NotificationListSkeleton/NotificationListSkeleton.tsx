import React, { memo } from 'react';
import { toggleFeatures } from '@/shared/lib/features';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { VStack } from '@/shared/ui/common/Stack';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import cls from '../NotificationList/NotificationList.module.scss';
import { NotificationListProps } from '../NotificationList/NotificationList';

export const NotificationListSkeleton = memo((props: NotificationListProps) => {
    const { className } = props;
    const listClass = classNames(cls.NotificationList, {}, [className]);

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });

    return (
        <VStack gap="16" max className={listClass}>
            <Skeleton width="100%" border="8px" height="80px" />
            <Skeleton width="100%" border="8px" height="80px" />
            <Skeleton width="100%" border="8px" height="80px" />
        </VStack>
    );
});
