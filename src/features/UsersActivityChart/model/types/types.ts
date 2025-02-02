import { ChartDimensions } from '@/shared/ui/common/Charts/ui/types';

export interface ActiveUsersList {
    inArticles: Set<string>;
    inComments: Set<string>;
    inRatings: Set<string>;
}

export interface UsersActivityChartProps extends ChartDimensions {
    totalUsers: number;
    activeUsersList: ActiveUsersList;
    className?: string;
}
