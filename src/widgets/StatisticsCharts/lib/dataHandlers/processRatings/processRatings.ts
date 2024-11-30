import { ArticleStats, StatisticsData } from '../../../model/types/stats';
import { ArticleRatingData } from '../../../../../features/ArticleRating/model/types/articleRatingData';
import { calculateAverage } from '@/shared/lib/mathCalculations/calculateAverage';

export const processRatings = (
    data: StatisticsData,
    ratings?: ArticleRatingData[],
) => {
    if (!ratings || ratings.length === 0) return;

    let totalArticleAverages = 0;
    let articlesWithRatingCount = 0;
    const articleRatingStats: Record<string, ArticleStats> = {};

    const updateUserRatingData = (
        userId: string,
        rate: number,
        feedback: string | null,
    ) => {
        const userStats = data.ratingCountsByUser[userId] || {
            totalRating: 0,
            articlesWithRating: 0,
            articlesWithFeedback: 0,
        };

        userStats.totalRating += rate;
        userStats.articlesWithRating += 1;

        if (feedback) {
            userStats.articlesWithFeedback += 1;
        }

        data.ratingCountsByUser[userId] = userStats;
        data.activeUsersList.inRatings.add(userId);
    };

    const updateArticleRatingData = (
        articleId: string,
        rate: number,
        feedback: string | null,
    ) => {
        const articleStats = articleRatingStats[articleId] || {
            totalRating: 0,
            count: 0,
        };

        articleStats.totalRating += rate;
        articleStats.count += 1;

        articleRatingStats[articleId] = articleStats;
        data.activeArticlesList.withRating.add(articleId);

        if (feedback) {
            data.activeArticlesList.withFeedback.add(articleId);
        }
    };

    const updateRatingDistribution = (average: number) => {
        const rating = Math.floor(average);

        if (rating >= 1 && rating <= 5) {
            data.ratingDistributionMap.set(
                rating,
                (data.ratingDistributionMap.get(rating) ?? 0) + 1,
            );
        }
    };

    ratings.forEach((rating) => {
        const { articleId, rate, feedback, user } = rating;
        updateUserRatingData(user?.id, rate, feedback);
        updateArticleRatingData(articleId, rate, feedback);
    });

    Object.entries(articleRatingStats).forEach(
        ([articleId, { totalRating, count }]) => {
            const articleAverage = totalRating / count;
            totalArticleAverages += articleAverage;

            articlesWithRatingCount += 1;
            updateRatingDistribution(articleAverage);
        },
    );

    data.averageRating = calculateAverage(
        totalArticleAverages,
        articlesWithRatingCount,
        2,
    );
};
