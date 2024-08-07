import { memo } from 'react';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { toggleFeatures } from '@/shared/lib/features';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card';
import cls from '../../ArticleListItem/ArticleListItem.module.scss';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

export const ListViewSkeleton = memo(() => {
    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.ArticleListItemRedesigned,
        off: () => cls.ArticleListItem,
    });

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });

    const Card = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => CardRedesigned,
        off: () => CardDeprecated,
    });

    const imgSkeletonHeight = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => 320,
        off: () => 200,
    });

    // const x = toggleFeatures({
    //     name: 'gauge',
    //     on: () => 320,
    //     off: () => 200,
    // });

    const additionalClasses = getFlexClasses({ vStack: true, gap: '8' });

    return (
        <div className={classNames(mainClass, {}, [cls.LIST])}>
            <Card
                padding="16"
                className={classNames('', {}, additionalClasses)}
            >
                <VStack gap="8">
                    <HStack gap="16">
                        <Skeleton border="50%" height={30} width={30} />
                        <Skeleton width={150} height={16} />
                    </HStack>
                    <Skeleton width={150} height={16} />
                </VStack>
                <Skeleton width={250} height={24} />
                <Skeleton height={imgSkeletonHeight} />
                <Skeleton height={36} width={200} />
            </Card>
        </div>
    );
});
