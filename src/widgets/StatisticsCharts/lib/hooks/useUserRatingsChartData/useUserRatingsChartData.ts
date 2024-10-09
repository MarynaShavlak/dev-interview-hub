import { useTranslation } from 'react-i18next';
import { ArticleStats } from '../../../model/types/stats';
import { UserRatingsBubbleChartProps } from '@/features/UserRatingsBubbleChart';
import { calculateAverage } from '@/shared/lib/mathCalculations/calculateAverage';
import { calculatePercentage } from '@/shared/lib/mathCalculations/calculatePercentage';

export const useUserRatingsChartData = (
    ratingFromUsersData: Record<string, ArticleStats>,
    totalArticles: number,
): UserRatingsBubbleChartProps => {
    const { t } = useTranslation('admin');
    let maxPercentageRated = 0;

    const ratingsByUsersData = Object.entries(ratingFromUsersData).map(
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
