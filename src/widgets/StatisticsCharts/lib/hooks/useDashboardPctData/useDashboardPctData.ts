import {
    ActiveArticlesList,
    DashboardPctDataStats,
} from '../../../model/types/stats';
import { calculatePercentage } from '@/shared/lib/mathCalculations/calculatePercentage';

export const useDashboardPctData = (
    activeArticlesList: ActiveArticlesList,
    totalArticles: number,
): DashboardPctDataStats => {
    const withRating = activeArticlesList.withRating.size;
    const withComments = activeArticlesList.withComments.size;
    const withFeedback = activeArticlesList.withFeedback.size;

    const articlesWithCommentsPercentage = calculatePercentage(
        withComments,
        totalArticles,
    );

    const articlesWithFeedbackPercentage = calculatePercentage(
        withFeedback,
        withRating,
    );

    return {
        articlesWithCommentsPercentage,
        articlesWithFeedbackPercentage,
    };
};
