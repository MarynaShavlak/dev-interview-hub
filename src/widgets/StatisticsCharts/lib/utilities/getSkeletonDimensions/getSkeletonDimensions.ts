import { SkeletonDimensions } from '@/shared/ui/common/Charts/ui/types';
import { calculateSkeletonDimensions } from '../calculateSkeletonDimensions/calculateSkeletonDimensions';
import { ChartKeys, CHARTS_RECTS } from '../../../model/consts/chartsRects';

export const getSkeletonDimensions = (): Record<
    ChartKeys,
    SkeletonDimensions
> => {
    return Object.keys(CHARTS_RECTS).reduce(
        (acc, key) => {
            acc[key as ChartKeys] = calculateSkeletonDimensions(
                key as ChartKeys,
            );
            return acc;
        },
        {} as Record<ChartKeys, SkeletonDimensions>,
    );
};
