import React from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Card } from '@/shared/ui/redesigned/Card';

export const UsersActivityChartSkeleton = () => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <Card>
                    <Skeleton width={380} height={203} />
                </Card>
            }
            off={
                <CardDeprecated>
                    <SkeletonDeprecated width={380} height={203} />
                </CardDeprecated>
            }
        />
    );
};
