import { useTranslation } from 'react-i18next';
import React from 'react';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { useStatisticsData } from '../../lib/hooks/useStatisticsData/useStatisticsData';
import { ArticleCategoriesCharts } from '@/features/ArticleCategoriesCharts';
import { ArticleCommentsCharts } from '@/features/ArticleCommentsCharts';
import { DashboardStats } from '@/features/DashboardStats';
import { UserRatingsBubbleChart } from '@/features/UserRatingsBubbleChart';
import { useUserRatingsChartData } from '../../lib/hooks/useUserRatingsChartData/useUserRatingsChartData';
import { useArticleCategoriesChartData } from '../../lib/hooks/useArticleCategoriesChartData/useArticleCategoriesChartData';
import { useArticleCommentsChartData } from '../../lib/hooks/useArticleCommentsChartData/useArticleCommentsChartData';
import { useDashboardPctData } from '../../lib/hooks/useDashboardPctData/useDashboardPctData';
import { useActiveUsersChartData } from '../../lib/hooks/useActiveUsersChartData/useActiveUsersChartData';
import { useRatingsDistributionChartData } from '../../lib/hooks/useRatingsDistributionChartData/useRatingsDistributionChartData';
import { UsersActivityChart } from '@/features/UsersActivityChart';
import { ArticleRatingDistributionChart } from '@/features/ArticleRatingDistributionChart';
import { ArticlePeriodDataCharts } from '@/features/ArticleQuarterlyDataCharts';
import { processComments } from '../../lib/dataHandlers/processComments/processComments';
import { processRatings } from '../../lib/dataHandlers/processRatings/processRatings';
import { initializeData } from '../../lib/dataHandlers/initializeData/initializeData';
import { processArticles } from '../../lib/dataHandlers/processArticles/processArticles';

export const StatisticsCharts = () => {
    const { t } = useTranslation('admin');

    const { users, articles, ratings, comments, isLoading } =
        useStatisticsData();

    const data = initializeData(articles, users);
    processArticles(data, articles);
    processComments(data, comments);
    processRatings(data, ratings);

    // console.log('data', data);

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
        monthlyDataByCategories,
        categories,
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

    const articlesByRatingDistributionData = useRatingsDistributionChartData(
        ratingDistributionMap,
        articlesWithRatingQuantity,
    );
    if (isLoading) return null;

    console.log('monthlyDataByCategories', monthlyDataByCategories);
    const monthLabels = Object.keys(monthlyDataByCategories);
    console.log('monthLabels', monthLabels);
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
            <ArticlePeriodDataCharts
                labels={monthLabels}
                categories={categories}
                data={monthlyDataByCategories}
            />
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
