import React from 'react';
import { HStack } from '@/shared/ui/common/Stack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Card } from '@/shared/ui/redesigned/Card';

export const RedesignedArticleCategoriesChartSkeleton = () => {
    return (
        <HStack gap="24" max>
            <Card>
                <Skeleton width={300} height={300} />
            </Card>
            <Card>
                <Skeleton width={300} height={300} />
            </Card>
        </HStack>
    );
};
