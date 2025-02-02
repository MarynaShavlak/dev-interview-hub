import { ChartDimensions } from '@/shared/ui/common/Charts/ui/types';

export type CategoryData = Record<string, number>;

export interface ArticleQuarterlyDataChartProps {
    categories: string[];
    data: Record<string, CategoryData>;
    className?: string;
    chartDimensions: ChartDimensions;
}
