import React, { memo } from 'react';
import { HStack } from '@/shared/ui/common/Stack';
import { toggleFeatures } from '@/shared/lib/features';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import cls from './StatisticsCharts.module.scss';
import {
    CHART_GAP,
    DASHBOARD_CARD,
    SKELETON_DEPR_SUBSTRACT,
    SKELETON_SCALE_GAP,
    SKELETON_SUBSTRACT,
} from '../../model/consts/chartsRects';
import { getSkeletonDimensions } from '../../lib/utilities/getSkeletonDimensions/getSkeletonDimensions';
import { Each } from '@/shared/lib/components/Each/Each';
import { chartsWrap } from '../../model/consts/classes';

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

    const articlesByCategoriesChartHeight =
        viewsByCategoriesChart.height +
        articlesByCategoriesChart.height +
        Number(SKELETON_SCALE_GAP) +
        toggleFeatures({
            name: 'isAppRedesigned',
            off: () => Number(SKELETON_DEPR_SUBSTRACT),
            on: () => Number(SKELETON_SUBSTRACT),
        });

    return (
        <div className={chartsWrap}>
            <HStack gap={CHART_GAP} wrap="wrap" className={cls.dashboard}>
                <Each
                    of={Array.from({ length: 6 })}
                    render={(item, index) => (
                        <Skeleton
                            border="12px"
                            key={`dashboard-card-${index}`}
                            width={DASHBOARD_CARD.width}
                            height={DASHBOARD_CARD.height}
                        />
                    )}
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
                height={articlesByCategoriesChartHeight}
            />
            <Skeleton
                className={cls.bubbleChart}
                border="12px"
                width={Number(ratingsByUsersChart.width) + Number(CHART_GAP)}
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
                height={Number(commentsByUsersChart.height) + Number(CHART_GAP)}
            />
            <Skeleton
                className={cls.commentsRatingChart}
                border="12px"
                width={commentsByArticlesChart.width + 14}
                height={commentsByArticlesChart.height}
            />
            <Skeleton
                className={cls.monthlyChart}
                border="12px"
                width={monthlyCategoryChart.width + 14}
                height={monthlyCategoryChart.height}
            />
            <Skeleton
                className={cls.quarterlyChart}
                border="12px"
                width={quarterlyCategoryChart.width + 14}
                height={quarterlyCategoryChart.height}
            />
        </div>
    );
});
