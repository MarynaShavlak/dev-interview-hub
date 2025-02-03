import { SkeletonDimensions } from '@/shared/ui/common/Charts/ui/types';
import {
    CHART_GAP,
    ChartKeys,
    CHARTS_RECTS,
    DASHBOARD_CARD,
    SKELETON_SUBSTRACT,
} from '../../../model/consts/chartsRects';

export const calculateSkeletonDimensions = (
    key: ChartKeys,
): SkeletonDimensions => {
    const { width, height } = CHARTS_RECTS[key];
    return {
        width: Number(width) + Number(CHART_GAP),
        height:
            (key !== 'activeUsersChart' ? Number(height) : 0) +
            (key === 'activeUsersChart' ? DASHBOARD_CARD.height * 2 : 0) +
            (key === 'articlesByCategoriesChart' ? Number(CHART_GAP) : 0) -
            (key === 'commentsByUsersChart' ? SKELETON_SUBSTRACT : 0) +
            Number(CHART_GAP),
    };
};
