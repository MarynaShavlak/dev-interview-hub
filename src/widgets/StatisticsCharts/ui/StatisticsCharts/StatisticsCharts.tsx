import { useTranslation } from 'react-i18next';
import React from 'react';
import { VStack, HStack } from '@/shared/ui/common/Stack';
import { useStatisticsData } from '../../lib/hooks/useStatisticsData/useStatisticsData';
import { DashboardStats } from '@/features/DashboardStats';
import { useUserRatingsChartData } from '../../lib/hooks/useUserRatingsChartData/useUserRatingsChartData';
import { ArticlePeriodDataCharts } from '@/features/ArticlePeriodDataCharts';
import { processComments } from '../../lib/dataHandlers/processComments/processComments';
import { processRatings } from '../../lib/dataHandlers/processRatings/processRatings';
import { initializeData } from '../../lib/dataHandlers/initializeData/initializeData';
import { processArticles } from '../../lib/dataHandlers/processArticles/processArticles';
import { UsersActivityChart } from '@/features/UsersActivityChart';
import { ArticleRatingDistributionChart } from '@/features/ArticleRatingDistributionChart';
import { ArticleCategoriesCharts } from '@/features/ArticleCategoriesCharts';
import { ArticleCommentsCharts } from '@/features/ArticleCommentsCharts';

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
        monthlyDataByCategories,
        categories,
    } = data;

    const { ratingsByUsersData, maxXaxisValue } = useUserRatingsChartData(
        ratingCountsByUser,
        totalArticles,
    );

    const articlesWithRatingQuantity = activeArticlesList.withRating.size;

    if (isLoading) return null;

    console.log('monthlyDataByCategories', monthlyDataByCategories);
    return (
        <VStack gap="16">
            <DashboardStats
                totalArticles={totalArticles}
                totalUsers={totalUsers}
                activeArticlesList={activeArticlesList}
                avgRating={averageRating}
                avgViews={averageViews}
            />
            <HStack gap="24">
                <UsersActivityChart
                    activeUsersList={activeUsersList}
                    totalUsers={totalUsers}
                />
                <ArticleRatingDistributionChart
                    ratingDistributionMap={ratingDistributionMap}
                    totalArticlesWithRatings={articlesWithRatingQuantity}
                />
            </HStack>

            <ArticleCategoriesCharts data={categoryData} />
            <ArticlePeriodDataCharts
                categories={categories}
                data={monthlyDataByCategories}
            />
            <ArticleCommentsCharts
                articleCommentCounts={articleCommentCounts}
                commentCountsByUser={commentCountsByUser}
            />
            {/* <UserRatingsBubbleChart */}
            {/*    ratingsByUsersData={ratingsByUsersData} */}
            {/*    maxXaxisValue={maxXaxisValue} */}
            {/* /> */}
        </VStack>
    );
};
