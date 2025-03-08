import React, { memo } from 'react';

import { ArticleListSkeleton, ArticleView } from '@/entities/Article';
import { VStack } from '@/shared/ui/common/Stack';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';

import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';

import { toggleFeatures, ToggleFeaturesComponent } from '@/shared/lib/features';
import { FlexGap } from '@/shared/types/flexTypes';

export const ArticleRecommendationsListSkeleton = memo(() => {
    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });
    const wrapGap: FlexGap = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => '24',
        off: () => '8',
    });

    return (
        <VStack max gap={wrapGap}>
            <Skeleton width="100%" height={40} border="34px" />
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <VStack gap="16" align="center" max justify="between">
                        <Skeleton width="100%" height={50} border="34px" />
                        <Skeleton width="100%" height={50} border="34px" />
                        <Skeleton width="100%" height={50} border="34px" />
                    </VStack>
                }
                off={
                    <ArticleListSkeleton
                        view={ArticleView.GRID}
                        skeletonCount={3}
                    />
                }
            />
        </VStack>
    );
});
