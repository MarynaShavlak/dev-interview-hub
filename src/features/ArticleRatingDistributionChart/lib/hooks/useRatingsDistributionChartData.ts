import { calculatePercentage } from '@/shared/lib/mathCalculations/calculatePercentage';

export const useRatingsDistributionChartData = (
    ratingDistributionMap: Map<number, number>,
    totalArticlesWithRatings: number,
): number[] => {
    const articlesByRatingDistributionData: number[] = [
        calculatePercentage(
            ratingDistributionMap.get(1)! + ratingDistributionMap.get(2)!,
            totalArticlesWithRatings,
            1,
        ),
        calculatePercentage(
            ratingDistributionMap.get(3)! + ratingDistributionMap.get(4)!,
            totalArticlesWithRatings,
            1,
        ),
        calculatePercentage(
            ratingDistributionMap.get(5)!,
            totalArticlesWithRatings,
            1,
        ),
    ];
    return articlesByRatingDistributionData;
};
