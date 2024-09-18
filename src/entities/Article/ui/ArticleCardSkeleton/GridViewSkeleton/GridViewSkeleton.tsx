import { memo } from 'react';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { toggleFeatures, ToggleFeaturesComponent } from '@/shared/lib/features';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import cls from '../../ArticleCard/ArticleCard.module.scss';

const additionalClasses = getFlexClasses({ vStack: true, gap: '8' });

const DeprecatedGridViewSkeleton = () => {
    return (
        <CardDeprecated className={classNames(cls.card, {}, additionalClasses)}>
            <SkeletonDeprecated width={200} height={200} />
            <SkeletonDeprecated width={130} height={16} />
            <SkeletonDeprecated width={150} height={16} />
        </CardDeprecated>
    );
};

const RedesignedGridViewSkeleton = () => {
    return (
        <Card
            className={classNames(cls.card, {}, additionalClasses)}
            border="round"
            padding="0"
        >
            <Skeleton width="100%" height={140} />
            <Skeleton width="100%" height={70} />
            <VStack className={cls.info} gap="32">
                <HStack justify="between" max>
                    <Skeleton width={100} height={16} />
                    <Skeleton width={80} height={16} />
                </HStack>
                <HStack gap="4" max className={cls.user}>
                    <Skeleton border="50%" height={32} width={32} />
                    <Skeleton width="40%" height={16} />
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
