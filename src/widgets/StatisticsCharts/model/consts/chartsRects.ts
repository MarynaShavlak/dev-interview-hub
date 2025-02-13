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

const byCategoriesChartsHeight = toggleFeatures({
    name: 'isAppRedesigned',
    off: () => '135',
    on: () => '150',
});

const commentsByUsersChartHeight = toggleFeatures({
    name: 'isAppRedesigned',
    off: () => '200',
    on: () => '220',
});

const commentsByUsersChartWidth = toggleFeatures({
    name: 'isAppRedesigned',
    off: () => '560',
    on: () => '576',
});

const fullWidth = toggleFeatures({
    name: 'isAppRedesigned',
    off: () => '812',
    on: () => '828',
});
const fullHeight = toggleFeatures({
    name: 'isAppRedesigned',
    off: () => '284',
    on: () => '300',
});

export const CHARTS_RECTS: Record<ChartKeys, ChartDimensions> = {
    activeUsersChart: { width: '412', height: '200' },
    articlesByCategoriesChart: {
        width: byCategoriesChartsWidth,
        height: byCategoriesChartsHeight,
    },
    viewsByCategoriesChart: {
        width: byCategoriesChartsWidth,
        height: String(Number(byCategoriesChartsHeight) - 10),
    },
    ratingsByUsersChart: { width: '384', height: '300' },
    articleRatingDistributionChart: { width: '220', height: '200' },
    commentsByArticlesChart: { width: fullWidth, height: fullHeight }, // 828
    commentsByUsersChart: {
        width: commentsByUsersChartWidth,
        height: commentsByUsersChartHeight,
    },
    quarterlyCategoryChart: { width: fullWidth, height: fullHeight }, // 828
    monthlyCategoryChart: { width: fullWidth, height: fullHeight }, // 828
};

export const CHART_GAP = '16';
export const DASHBOARD_CARD = {
    width: 192,
    height: 105,
};
export const SKELETON_SCALE_GAP = 100;
export const SKELETON_SUBSTRACT = 20;
