import React, { memo } from 'react';
import { VStack, HStack } from '@/shared/ui/common/Stack';
import { toggleFeatures } from '@/shared/lib/features';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';

export const StatisticsChartsSkeleton = memo(() => {
    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });

    return (
        <VStack gap="16">
            <HStack gap="16" wrap="wrap">
                <Skeleton border="12px" width={220} height={104} />
                <Skeleton border="12px" width={220} height={104} />
                <Skeleton border="12px" width={220} height={104} />
                <Skeleton border="12px" width={220} height={104} />
                <Skeleton border="12px" width={220} height={104} />
                <Skeleton border="12px" width={220} height={104} />
            </HStack>

            <HStack gap="16">
                <Skeleton border="12px" width={396} height={219} />
                <Skeleton border="12px" width={236} height={219} />
            </HStack>
            <HStack gap="16">
                <Skeleton border="12px" width={316} height={316} />
                <Skeleton border="12px" width={316} height={316} />
            </HStack>

            <Skeleton border="12px" width={816} height={331} />
            <Skeleton border="12px" width={816} height={331} />
            <HStack gap="16">
                <Skeleton border="12px" width={350} height={331} />
                <Skeleton border="12px" width={450} height={331} />
            </HStack>
            <Skeleton border="12px" width={816} height={331} />
        </VStack>
    );
});
