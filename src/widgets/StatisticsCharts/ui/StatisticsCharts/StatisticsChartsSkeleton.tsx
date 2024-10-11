import React from 'react';
import { VStack, HStack } from '@/shared/ui/common/Stack';
import { ArticlePeriodDataCharts } from '@/features/ArticlePeriodDataCharts';
import { ArticleRatingDistributionChart } from '@/features/ArticleRatingDistributionChart';
import { ArticleCategoriesCharts } from '@/features/ArticleCategoriesCharts';
import { ArticleCommentsCharts } from '@/features/ArticleCommentsCharts';
import { UserRatingsBubbleChart } from '@/features/UserRatingsBubbleChart';
import { toggleFeatures } from '@/shared/lib/features';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';

export const StatisticsChartsSkeleton = () => {
    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });

    return (
        <VStack gap="16">
            <HStack gap="16" wrap="wrap">
                <Skeleton width={220} height={104} />
                <Skeleton width={220} height={104} />
                <Skeleton width={220} height={104} />
                <Skeleton width={220} height={104} />
                <Skeleton width={220} height={104} />
                <Skeleton width={220} height={104} />
            </HStack>

            <HStack gap="24">
                <Skeleton width={396} height={219} />
                <ArticleRatingDistributionChart
                    ratingDistributionMap={ratingDistributionMap}
                    totalArticlesWithRatings={articlesWithRatingQuantity}
                />
            </HStack>

            <ArticleCategoriesCharts data={categoryData} />
            <ArticlePeriodDataCharts
                categories={categories}
                data={monthlyDataByCategories}
            />
            <ArticleCommentsCharts
                articleCommentCounts={articleCommentCounts}
                commentCountsByUser={commentCountsByUser}
            />
            <UserRatingsBubbleChart
                data={ratingCountsByUser}
                totalArticles={totalArticles}
            />
        </VStack>
    );
};
