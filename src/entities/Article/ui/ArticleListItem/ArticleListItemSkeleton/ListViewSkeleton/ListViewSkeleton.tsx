import { memo } from 'react';
import { toggleFeatures } from '@/shared/lib/features';
import { classNames } from '@/shared/lib/classNames/classNames';
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

    return (
        <div className={classNames(mainClass, {}, [cls.LIST])}>
            <Card vStack gap="8" padding="16">
                <VStack className={cls.header} gap="8">
                    <HStack gap="16">
                        <Skeleton border="50%" height={30} width={30} />
                        <Skeleton
                            width={150}
                            height={16}
                            className={cls.username}
                        />
                    </HStack>
                    <Skeleton width={150} height={16} className={cls.date} />
                </VStack>
                <Skeleton width={250} height={24} className={cls.title} />
                <Skeleton height={imgSkeletonHeight} className={cls.img} />
                <div className={cls.footer}>
                    <Skeleton height={36} width={200} />
                </div>
            </Card>
        </div>
    );
});
