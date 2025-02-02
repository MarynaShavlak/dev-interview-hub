import { ChartDimensions } from '@/shared/ui/common/Charts/ui/types';

export type CategoryData = Record<string, number>;

export interface ArticlePeriodDataChartsProps {
    categories: string[];
    data: Record<string, CategoryData>;
    className?: string;
    isMonthlyChart?: boolean;
    isQuarterlyChart?: boolean;
    quarterlyCategoryDimensions: ChartDimensions;
    monthlyCategoryDimensions: ChartDimensions;
}
