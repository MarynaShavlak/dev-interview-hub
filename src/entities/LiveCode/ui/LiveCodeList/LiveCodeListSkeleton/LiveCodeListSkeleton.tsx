import { memo } from 'react';
import { toggleFeatures } from '@/shared/lib/features';
import { VStack } from '@/shared/ui/common/Stack';
import cls from '../LiveCodeList.module.scss';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';

export const LiveCodeListSkeleton = memo(() => {
    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => '',
        off: () => cls.LiveCodeList,
    });
    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });

    return (
        <VStack gap="16" className={mainClass} max>
            {new Array(4).fill(0).map(() => (
                <Skeleton width="100%" height="300px" />
            ))}
        </VStack>
    );
});
