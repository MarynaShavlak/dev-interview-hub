import React from 'react';
import { VStack } from '@/shared/ui/common/Stack';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Card } from '@/shared/ui/redesigned/Card';

export const ArticleMonthlyDataChartSkeleton = () => {
    return (
        <VStack gap="16" max>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <>
                        <Card>
                            <Skeleton width={800} height={300} />
                        </Card>
                        <Card>
                            <Skeleton width={800} height={300} />
                        </Card>
                    </>
                }
                off={
                    <>
                        <CardDeprecated>
                            <SkeletonDeprecated width={750} height={300} />
                        </CardDeprecated>
                        <CardDeprecated>
                            <SkeletonDeprecated width={750} height={300} />
                        </CardDeprecated>
                    </>
                }
            />
        </VStack>
    );
};
