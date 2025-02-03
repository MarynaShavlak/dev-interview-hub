import React, { memo } from 'react';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { toggleFeatures } from '@/shared/lib/features';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import cls from './StatisticsCharts.module.scss';
import {
    CHART_GAP,
    DASHBOARD_CARD,
    SKELETON_SCALE_GAP,
} from '../../model/consts/chartsRects';
import { getSkeletonDimensions } from '../../lib/utilities/getSkeletonDimensions/getSkeletonDimensions';

export const StatisticsChartsSkeleton = memo(() => {
    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });
    const {
        activeUsersChart,
        articlesByCategoriesChart,
        commentsByArticlesChart,
        commentsByUsersChart,
        monthlyCategoryChart,
        ratingsByUsersChart,
        quarterlyCategoryChart,
        viewsByCategoriesChart,
        articleRatingDistributionChart,
    } = getSkeletonDimensions();

    return (
        <VStack gap={CHART_GAP} className={cls.parent}>
            <HStack gap={CHART_GAP} wrap="wrap" className={cls.dashboard}>
                <Skeleton
                    border="12px"
                    width={DASHBOARD_CARD.width}
                    height={DASHBOARD_CARD.height}
                />
                <Skeleton
                    border="12px"
                    width={DASHBOARD_CARD.width}
                    height={DASHBOARD_CARD.height}
                />
                <Skeleton
                    border="12px"
                    width={DASHBOARD_CARD.width}
                    height={DASHBOARD_CARD.height}
                />
                <Skeleton
                    border="12px"
                    width={DASHBOARD_CARD.width}
                    height={DASHBOARD_CARD.height}
                />
                <Skeleton
                    border="12px"
                    width={DASHBOARD_CARD.width}
                    height={DASHBOARD_CARD.height}
                />
                <Skeleton
                    border="12px"
                    width={DASHBOARD_CARD.width}
                    height={DASHBOARD_CARD.height}
                />
            </HStack>
            <Skeleton
                className={cls.usersActivityChart}
                border="12px"
                width={activeUsersChart.width}
                height={activeUsersChart.height}
            />
            <Skeleton
                className={cls.articleCategoriesChart}
                border="12px"
                width={articlesByCategoriesChart.width}
                height={
                    viewsByCategoriesChart.height +
                    articlesByCategoriesChart.height +
                    SKELETON_SCALE_GAP
                }
            />
            <Skeleton
                className={cls.bubbleChart}
                border="12px"
                width={ratingsByUsersChart.width}
                height={ratingsByUsersChart.height}
            />
            <Skeleton
                className={cls.articleRateDistributionChart}
                border="12px"
                width={articleRatingDistributionChart.width}
                height={articleRatingDistributionChart.height}
            />
            <Skeleton
                className={cls.commentsDistributionChart}
                border="12px"
                width={commentsByUsersChart.width}
                height={commentsByUsersChart.height}
            />
            <Skeleton
                className={cls.commentsRatingChart}
                border="12px"
                width={commentsByArticlesChart.width}
                height={commentsByArticlesChart.height}
            />
            <Skeleton
                className={cls.monthlyChart}
                border="12px"
                width={monthlyCategoryChart.width}
                height={monthlyCategoryChart.height}
            />
            <Skeleton
                className={cls.quarterlyChart}
                border="12px"
                width={quarterlyCategoryChart.width}
                height={quarterlyCategoryChart.height}
            />
        </VStack>
    );
});
