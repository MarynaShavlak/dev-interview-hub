import { ChartDimensions } from '@/shared/ui/common/Charts/ui/types';
import { toggleFeatures } from '@/shared/lib/features';

export type ChartKeys =
    | 'activeUsersChart'
    | 'articlesByCategoriesChart'
    | 'viewsByCategoriesChart'
    | 'ratingsByUsersChart'
    | 'articleRatingDistributionChart'
    | 'commentsByArticlesChart'
    | 'commentsByUsersChart'
    | 'quarterlyCategoryChart'
    | 'monthlyCategoryChart';

const byCategoriesChartsWidth = toggleFeatures({
    name: 'isAppRedesigned',
    off: () => '382',
    on: () => '412',
});

export const CHARTS_RECTS: Record<ChartKeys, ChartDimensions> = {
    activeUsersChart: { width: '412', height: '200' },
    articlesByCategoriesChart: {
        width: byCategoriesChartsWidth,
        height: '150',
    },
    viewsByCategoriesChart: { width: byCategoriesChartsWidth, height: '140' },
    ratingsByUsersChart: { width: '384', height: '300' },
    articleRatingDistributionChart: { width: '220', height: '200' },
    commentsByArticlesChart: { width: '828', height: '300' }, // 828
    commentsByUsersChart: { width: '576', height: '220' },
    quarterlyCategoryChart: { width: '828', height: '300' }, // 828
    monthlyCategoryChart: { width: '828', height: '300' }, // 828
};

export const CHART_GAP = '16';
export const DASHBOARD_CARD = {
    width: 192,
    height: 105,
};
export const SKELETON_SCALE_GAP = 100;
export const SKELETON_SUBSTRACT = 20;
