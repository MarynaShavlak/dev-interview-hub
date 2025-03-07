import { SkeletonDimensions } from '@/shared/ui/common/Charts/ui/types';
import {
    CHART_GAP,
    ChartKeys,
    CHARTS_RECTS,
    DASHBOARD_CARD,
    SKELETON_SUBSTRACT,
} from '../../../model/consts/chartsRects';
import { toggleFeatures } from '@/shared/lib/features';

export const calculateSkeletonDimensions = (
    key: ChartKeys,
): SkeletonDimensions => {
    const { width, height } = CHARTS_RECTS[key];

    const gap = toggleFeatures({
        name: 'isAppRedesigned',
        off: () => 0,
        on: () => Number(CHART_GAP),
    });
    return {
        width:
            Number(width) +
            (key === 'activeUsersChart' ||
            key === 'articlesByCategoriesChart' ||
            key === 'commentsByUsersChart'
                ? Number(CHART_GAP) * 2
                : Number(CHART_GAP)),
        height:
            (key !== 'activeUsersChart' ? Number(height) : 0) +
            (key === 'activeUsersChart' ? DASHBOARD_CARD.height * 2 : 0) +
            (key === 'articlesByCategoriesChart' ? Number(CHART_GAP) : 0) -
            (key === 'commentsByUsersChart' ? SKELETON_SUBSTRACT : 0) +
            Number(CHART_GAP),
    };
};
