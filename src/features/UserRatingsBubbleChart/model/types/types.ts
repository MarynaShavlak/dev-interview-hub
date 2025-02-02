import { ChartDimensions } from '@/shared/ui/common/Charts/ui/types';

export interface ArticleStats {
    [key: string]: number;
}

export interface UserRatingsBubbleChartProps extends ChartDimensions {
    data: Record<string, ArticleStats>;
    totalArticles: number;
    className?: string;
}
