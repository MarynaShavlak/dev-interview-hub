import { useTranslation } from 'react-i18next';
import { calculateAverage } from '@/shared/lib/mathCalculations/calculateAverage';
import { calculatePercentage } from '@/shared/lib/mathCalculations/calculatePercentage';
import { UserRatingsBubbleChartProps } from '../../model/types/types';

type ChartDataPoint = [number, number, number]; // [percentageRated, averageRating, articlesWithFeedback]
type ChartDataSeries = { name: string; data: ChartDataPoint[] };

interface ChartData {
    ratingsByUsersData: ChartDataSeries[];
    maxXaxisValue: number;
    minXaxisValue: number;
    maxYaxisValue: number;
}

export const useUserRatingsChartData = (
    data: UserRatingsBubbleChartProps['data'],
    totalArticles: number,
): ChartData => {
    const { t } = useTranslation('admin');

    const initialMetrics = {
        maxPercentageRated: -Infinity,
        minPercentageRated: Infinity,
        maxYaxisValue: -Infinity,
    };

    const ratingsByUsersData = Object.entries(data).reduce<ChartDataSeries[]>(
        (acc, [userId, userData]) => {
            const { totalRating, articlesWithRating, articlesWithFeedback } =
                userData;

            const averageRating = calculateAverage(
                totalRating,
                articlesWithRating,
            );
            const percentageRated = calculatePercentage(
                articlesWithRating,
                totalArticles,
            );

            initialMetrics.maxPercentageRated = Math.max(
                initialMetrics.maxPercentageRated,
                percentageRated,
            );
            initialMetrics.minPercentageRated = Math.min(
                initialMetrics.minPercentageRated,
                percentageRated,
            );
            initialMetrics.maxYaxisValue = Math.max(
                initialMetrics.maxYaxisValue,
                averageRating,
            );

            acc.push({
                name: `${t('Користувач')}: ${userId}`,
                data: [[percentageRated, averageRating, articlesWithFeedback]],
            });

            return acc;
        },
        [],
    );

    const { maxPercentageRated, minPercentageRated, maxYaxisValue } =
        initialMetrics;

    return {
        ratingsByUsersData,
        maxXaxisValue: maxPercentageRated + 2,
        minXaxisValue: Math.floor(minPercentageRated),
        maxYaxisValue: Math.ceil(maxYaxisValue * 1.2),
    };
};
