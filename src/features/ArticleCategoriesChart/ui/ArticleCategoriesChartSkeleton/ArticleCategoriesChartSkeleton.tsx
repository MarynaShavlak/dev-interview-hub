import React from 'react';
import { HStack } from '@/shared/ui/common/Stack';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { RedesignedArticleCategoriesChartSkeleton } from './RedesignedArticleCategoriesChartSkeleton/RedesignedArticleCategoriesChartSkeleton';
import { DeprecatedArticleCategoriesChartSkeleton } from './DeprecatedArticleCategoriesChartSkeleton/DeprecatedArticleCategoriesChartSkeleton';

export const ArticleCategoriesChartSkeleton = () => {
    return (
        <HStack gap="24" max>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<RedesignedArticleCategoriesChartSkeleton />}
                off={<DeprecatedArticleCategoriesChartSkeleton />}
            />
        </HStack>
    );
};
