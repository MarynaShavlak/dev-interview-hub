import React, { memo } from 'react';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { toggleFeatures, ToggleFeaturesComponent } from '@/shared/lib/features';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';

interface ContentSkeletonProps {
    width?: string;
    height?: string;
}

export const ContentSkeleton = memo((props: ContentSkeletonProps) => {
    const { width = '100%', height = '560px' } = props;

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<Skeleton width={width} height={height} border="40px" />}
            off={<Skeleton width={width} height={height} />}
        />
    );
});
