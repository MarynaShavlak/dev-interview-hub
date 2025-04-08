import { memo } from 'react';
import { toggleFeatures } from '@/shared/lib/features';
import { VStack } from '@/shared/ui/common/Stack';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';

export const QuestionsListSkeleton = memo(() => {
    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });

    return (
        <VStack max gap="24">
            <Skeleton width="100%" height={98} border="20px" />
            <Skeleton width="100%" height={98} border="20px" />
            <Skeleton width="100%" height={98} border="20px" />
            <Skeleton width="100%" height={98} border="20px" />
            <Skeleton width="100%" height={98} border="20px" />
        </VStack>
    );
});
