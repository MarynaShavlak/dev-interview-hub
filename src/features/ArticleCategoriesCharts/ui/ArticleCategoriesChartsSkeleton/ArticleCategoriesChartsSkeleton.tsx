import React from 'react';
import { HStack } from '@/shared/ui/common/Stack';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { RedesignedArticleCategoriesChartsSkeleton } from './RedesignedArticleCategoriesChartsSkeleton/RedesignedArticleCategoriesChartsSkeleton';
import { DeprecatedArticleCategoriesChartsSkeleton } from './DeprecatedArticleCategoriesChartsSkeleton/DeprecatedArticleCategoriesChartsSkeleton';

export const ArticleCategoriesChartsSkeleton = () => {
    return (
        <HStack gap="24" max>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<RedesignedArticleCategoriesChartsSkeleton />}
                off={<DeprecatedArticleCategoriesChartsSkeleton />}
            />
        </HStack>
    );
};
