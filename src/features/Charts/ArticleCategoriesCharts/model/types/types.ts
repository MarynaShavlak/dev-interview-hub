import { ChartDimensions } from '@/shared/ui/common/Charts/ui/types';

export interface ArticleStats {
    [key: string]: number;
}

export interface ArticleCategoriesChartsProps {
    data: Record<string, ArticleStats>;
    className?: string;
    articlesByCategoriesDimensions: ChartDimensions;
    viewsByCategoriesDimensions: ChartDimensions;
}
