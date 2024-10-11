import { useTranslation } from 'react-i18next';

import { calculateAverage } from '@/shared/lib/mathCalculations/calculateAverage';
import { calculatePercentage } from '@/shared/lib/mathCalculations/calculatePercentage';
import { UserRatingsBubbleChartProps } from '../../model/types/types';

export const useUserRatingsChartData = (
    data: UserRatingsBubbleChartProps['data'],
    totalArticles: number,
): {
    ratingsByUsersData: { name: string; data: number[][] }[];
    maxXaxisValue: number;
} => {
    const { t } = useTranslation('admin');
    let maxPercentageRated = 0;

    const ratingsByUsersData = Object.entries(data).map(
        ([userId, userData]) => {
            const averageRating = calculateAverage(
                userData.totalRating,
                userData.articlesWithRating,
            );

            const percentageRated = calculatePercentage(
                userData.articlesWithRating,
                totalArticles,
            );

            if (percentageRated > maxPercentageRated) {
                maxPercentageRated = percentageRated;
            }

            return {
                name: `${t('userId')}: ${userId}`,
                data: [
                    [
                        percentageRated,
                        averageRating,
                        userData.articlesWithFeedback,
                    ],
                ],
            };
        },
    );

    const maxXaxisValue = maxPercentageRated + 2;

    return {
        ratingsByUsersData,
        maxXaxisValue,
    };
};
