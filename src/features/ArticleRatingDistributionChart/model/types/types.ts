import { ChartDimensions } from '@/shared/ui/common/Charts/ui/types';

export interface ArticleRatingDistributionChartProps extends ChartDimensions {
    ratingDistributionMap: Map<number, number>;
    totalArticlesWithRatings: number;
    className?: string;
}
