import { memo } from 'react';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { toggleFeatures, ToggleFeaturesComponent } from '@/shared/lib/features';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import cls from '../../ArticleListItem/ArticleListItem.module.scss';

const DeprecatedGridViewSkeleton = () => {
    return (
        <CardDeprecated className={cls.card} vStack gap="8" align="start">
            <SkeletonDeprecated width={200} height={200} />
            <SkeletonDeprecated width={130} height={16} />
            <SkeletonDeprecated width={150} height={16} />
        </CardDeprecated>
    );
};

const RedesignedGridViewSkeleton = () => {
    return (
        <Card className={cls.card} vStack border="round" padding="0" gap="8">
            <Skeleton width={240} height={140} />
            <Skeleton width="100%" height={70} />
            <VStack className={cls.info} gap="32">
                <HStack justify="between" max>
                    <Skeleton width={100} height={16} />
                    <Skeleton width={80} height={16} />
                </HStack>
                <HStack gap="4" max className={cls.user}>
                    <Skeleton border="50%" height={32} width={32} />
                    <Skeleton width={80} height={16} />
                </HStack>
            </VStack>
        </Card>
    );
};

export const GridViewSkeleton = memo(() => {
    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.ArticleListItemRedesigned,
        off: () => cls.ArticleListItem,
    });

    return (
        <div className={classNames(mainClass, {}, [cls.GRID])}>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<RedesignedGridViewSkeleton />}
                off={<DeprecatedGridViewSkeleton />}
            />
        </div>
    );
});
