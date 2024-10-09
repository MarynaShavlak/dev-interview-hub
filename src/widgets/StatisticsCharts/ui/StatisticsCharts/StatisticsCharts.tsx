import { useTranslation } from 'react-i18next';
import React from 'react';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { useStatisticsData } from '../../lib/hooks/useStatisticsData/useStatisticsData';

import { User } from '@/entities/User';

import { Article } from '@/entities/Article';
import { ArticleCategoriesCharts } from '@/features/ArticleCategoriesCharts';
import { ArticleCommentsCharts } from '@/features/ArticleCommentsCharts';
import { DashboardStats } from '@/features/DashboardStats';
import { UserRatingsBubbleChart } from '@/features/UserRatingsBubbleChart';
import { calculateAverage } from '@/shared/lib/mathCalculations/calculateAverage';
import { ArticleStats, InitializedData } from '../../model/types/stats';
import { ArticleComment } from '../../model/types/articleComment';
import { ArticleRating } from '../../model/types/articleRating';
import { useUserRatingsChartData } from '../../lib/hooks/useUserRatingsChartData/useUserRatingsChartData';
import { useArticleCategoriesChartData } from '../../lib/hooks/useArticleCategoriesChartData/useArticleCategoriesChartData';
import { useArticleCommentsChartData } from '../../lib/hooks/useArticleCommentsChartData/useArticleCommentsChartData';
import { useDashboardPctData } from '../../lib/hooks/useDashboardPctData/useDashboardPctData';
import { useActiveUsersChartData } from '../../lib/hooks/useActiveUsersChartData/useActiveUsersChartData';
import { useArticleByRatingsDistributionChartData } from '../../lib/hooks/useArticleByRatingsDistributionChartData/useArticleByRatingsDistributionChartData';
import { UsersActivityChart } from '@/features/UsersActivityChart';
import { ArticleRatingDistributionChart } from '@/features/ArticleRatingDistributionChart';

const initializeData = (
    articles?: Article[],
    users?: User[],
): InitializedData => {
    const totalArticles = articles?.length || 0;
    const totalUsers = users?.length || 0;
    return {
        totalArticles,
        totalUsers,
        averageRating: 0,
        averageViews: 0,
        categoryData: {},
        articleCommentCounts: [],
        commentCountsByArticle: {},
        commentCountsByUser: {},
        ratingCountsByUser: {},
        activeUsersList: {
            inArticles: new Set(),
            inComments: new Set(),
            inRatings: new Set(),
        },
        activeArticlesList: {
            withRating: new Set(),
            withComments: new Set(),
            withFeedback: new Set(),
        },
        ratingDistributionMap: new Map<number, number>([
            [1, 0],
            [2, 0],
            [3, 0],
            [4, 0],
            [5, 0],
        ]),
    };
};

const processArticles = (data: InitializedData, articles?: Article[]) => {
    let totalViews = 0;
    articles?.forEach((article) => {
        data.activeUsersList.inArticles.add(article.user.id);
        totalViews += article.views;

        article.category.forEach((cat) => {
            if (!data.categoryData[cat]) {
                data.categoryData[cat] = { articleCount: 0, viewCount: 0 };
            }
            data.categoryData[cat].articleCount += 1;
            data.categoryData[cat].viewCount += article.views;
        });
    });

    data.averageViews = calculateAverage(totalViews, data.totalArticles, 0);
};

const processComments = (
    data: InitializedData,
    comments?: ArticleComment[],
) => {
    comments?.forEach((comment) => {
        const {
            user: { id, username },
            articleId,
        } = comment;
        data.activeUsersList.inComments.add(id);
        data.activeArticlesList.withComments.add(articleId);

        data.commentCountsByArticle[articleId] =
            (data.commentCountsByArticle[articleId] || 0) + 1;
        data.commentCountsByUser[username] =
            (data.commentCountsByUser[username] || 0) + 1;
    });

    data.articleCommentCounts = Object.entries(data.commentCountsByArticle)
        .map(([articleId, commentCount]) => ({ articleId, commentCount }))
        .sort((a, b) => b.commentCount - a.commentCount);
};

const processRatings = (data: InitializedData, ratings?: ArticleRating[]) => {
    let totalArticleAverages = 0;
    let articlesWithRatingCount = 0;
    const articleRatingStats: Record<string, ArticleStats> = {};

    const updateUserRatingData = (
        userId: string,
        rate: number,
        feedback: string | undefined,
    ) => {
        if (!data.ratingCountsByUser[userId]) {
            data.ratingCountsByUser[userId] = {
                totalRating: 0,
                articlesWithRating: 0,
                articlesWithFeedback: 0,
            };
        }
        data.ratingCountsByUser[userId].totalRating += rate;
        data.ratingCountsByUser[userId].articlesWithRating += 1;

        if (feedback) {
            data.ratingCountsByUser[userId].articlesWithFeedback += 1;
        }
        data.activeUsersList.inRatings.add(userId);
    };

    const updateArticleRatingData = (
        articleId: string,
        rate: number,
        feedback: string | undefined,
    ) => {
        if (!articleRatingStats[articleId]) {
            articleRatingStats[articleId] = { totalRating: 0, count: 0 };
        }

        articleRatingStats[articleId].totalRating += rate;
        articleRatingStats[articleId].count += 1;
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

    ratings?.forEach((rating) => {
        const { articleId, rate, feedback, userId } = rating;
        updateUserRatingData(userId, rate, feedback);
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

export const StatisticsCharts = () => {
    const { t } = useTranslation('admin');

    const { users, articles, ratings, comments, isLoading } =
        useStatisticsData();

    const data = initializeData(articles, users);
    processArticles(data, articles);
    processComments(data, comments);
    processRatings(data, ratings);

    console.log('data', data);

    const {
        categoryData,
        articleCommentCounts,
        commentCountsByUser,
        ratingCountsByUser,
        activeArticlesList,
        activeUsersList,
        totalArticles,
        totalUsers,
        averageRating,
        averageViews,
        ratingDistributionMap,
    } = data;

    const {
        labels: categoryChartLabels,
        viewsByCategories,
        articlesByCategories,
    } = useArticleCategoriesChartData(categoryData);

    const {
        labels: articleCommentsLabels,
        commentsByArticlesData,
        commentsByUsersData,
    } = useArticleCommentsChartData(articleCommentCounts, commentCountsByUser);

    const { ratingsByUsersData, maxXaxisValue } = useUserRatingsChartData(
        ratingCountsByUser,
        totalArticles,
    );
    const { articlesWithCommentsPercentage, articlesWithFeedbackPercentage } =
        useDashboardPctData(activeArticlesList, totalArticles);

    const activeUsersData = useActiveUsersChartData(
        activeUsersList,
        totalUsers,
    );

    const articlesWithRatingQuantity = activeArticlesList.withRating.size;

    const articlesByRatingDistributionData =
        useArticleByRatingsDistributionChartData(
            ratingDistributionMap,
            articlesWithRatingQuantity,
        );
    if (isLoading) return null;
    return (
        <VStack gap="16">
            <DashboardStats
                commentsPct={articlesWithCommentsPercentage}
                feedbackPct={articlesWithFeedbackPercentage}
                totalArticles={totalArticles}
                totalUsers={totalUsers}
                avgRating={Number(averageRating)}
                avgViews={Number(averageViews)}
            />
            <HStack gap="24">
                <UsersActivityChart activeUsersData={activeUsersData} />
                <ArticleRatingDistributionChart
                    data={articlesByRatingDistributionData}
                    totalValue={`${articlesWithRatingQuantity}`}
                />
            </HStack>

            <ArticleCategoriesCharts
                labels={categoryChartLabels}
                viewsByCategories={viewsByCategories}
                articlesByCategories={articlesByCategories}
            />
            {/* <ArticleQuarterlyDataCharts /> */}
            <ArticleCommentsCharts
                labels={articleCommentsLabels}
                commentsByArticlesData={commentsByArticlesData}
                commentsByUsersData={commentsByUsersData}
            />
            <UserRatingsBubbleChart
                ratingsByUsersData={ratingsByUsersData}
                maxXaxisValue={maxXaxisValue}
            />
        </VStack>
    );
};
