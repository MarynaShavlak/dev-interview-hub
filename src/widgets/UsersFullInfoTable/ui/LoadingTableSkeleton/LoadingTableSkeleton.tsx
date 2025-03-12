import { memo } from 'react';

import { HStack, VStack } from '@/shared/ui/common/Stack';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { toggleFeatures } from '@/shared/lib/features';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';

export const LoadingTableSkeleton = memo(() => {
    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });
    return (
        <VStack gap="16" max align="center">
            <HStack justify="between" max>
                <Skeleton width={300} height={38} border="48px" />
            </HStack>
            <Skeleton width="100%" height={400} />
        </VStack>
    );
});
