import { memo } from 'react';
import { toggleFeatures } from '@/shared/lib/features';
import { VStack } from '@/shared/ui/common/Stack';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';

export const LiveCodeListSkeleton = memo(() => {
    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });

    return (
        <VStack gap="16" max>
            {new Array(4).fill(0).map(() => (
                <Skeleton width="100%" height="300px" />
            ))}
        </VStack>
    );
});
