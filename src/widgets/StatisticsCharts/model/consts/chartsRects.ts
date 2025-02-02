import { ChartDimensions } from '@/shared/ui/common/Charts/ui/types';

export type ChartKeys =
    | 'activeUsersDataChart'
    | 'articlesByCategoriesChart'
    | 'viewsByCategoriesChart'
    | 'ratingsByUsersDataChart'
    | 'articleRatingDistributionChart'
    | 'commentsByArticlesChart'
    | 'commentsByUsersChart'
    | 'quarterlyCategoryChart'
    | 'monthlyCategoryChart';

export const CHARTS_RECTS: Record<ChartKeys, ChartDimensions> = {
    activeUsersDataChart: { width: '412', height: '200' },
    articlesByCategoriesChart: { width: '412', height: '150' },
    viewsByCategoriesChart: { width: '412', height: '140' },
    ratingsByUsersDataChart: { width: '384', height: '300' },
    articleRatingDistributionChart: { width: '220', height: '200' },
    commentsByArticlesChart: { width: '828', height: '300' }, // 828
    commentsByUsersChart: { width: '576', height: '220' },
    quarterlyCategoryChart: { width: '828', height: '200' }, // 828
    monthlyCategoryChart: { width: '828', height: '200' }, // 828
};
