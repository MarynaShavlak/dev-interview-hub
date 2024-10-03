import React from 'react';
import { HStack } from '@/shared/ui/common/Stack';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';

export const DeprecatedArticleCategoriesChartsSkeleton = () => {
    return (
        <HStack gap="24" max>
            <CardDeprecated>
                <SkeletonDeprecated width={300} height={300} />
            </CardDeprecated>
            <CardDeprecated>
                <SkeletonDeprecated width={300} height={300} />
            </CardDeprecated>
        </HStack>
    );
};
