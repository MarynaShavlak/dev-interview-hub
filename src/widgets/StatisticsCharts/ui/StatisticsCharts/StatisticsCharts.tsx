import { useTranslation } from 'react-i18next';
import React from 'react';
import { VStack, HStack } from '@/shared/ui/common/Stack';
import { DashboardStats } from '@/features/DashboardStats';
import { ArticlePeriodDataCharts } from '@/features/ArticlePeriodDataCharts';
import { processComments } from '../../lib/dataHandlers/processComments/processComments';
import { processRatings } from '../../lib/dataHandlers/processRatings/processRatings';
import { initializeData } from '../../lib/dataHandlers/initializeData/initializeData';
import { processArticles } from '../../lib/dataHandlers/processArticles/processArticles';
import { UsersActivityChart } from '@/features/UsersActivityChart';
import { ArticleRatingDistributionChart } from '@/features/ArticleRatingDistributionChart';
import { ArticleCategoriesCharts } from '@/features/ArticleCategoriesCharts';
import { ArticleCommentsCharts } from '@/features/ArticleCommentsCharts';
import { UserRatingsBubbleChart } from '@/features/UserRatingsBubbleChart';
import { useStatisticsData } from '../../lib/hooks/useStatisticsData';
import { StatisticsChartsError } from './StatisticsChartsError';
import { StatisticsChartsSkeleton } from './StatisticsChartsSkeleton';

export const StatisticsCharts = () => {
    const { t } = useTranslation('admin');

    const { users, articles, ratings, comments, isLoading, isError } =
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

    const articlesWithRatingQuantity = activeArticlesList.withRating.size;

    if (isLoading) return <StatisticsChartsSkeleton />;
    if (isError) return <StatisticsChartsError />;

    return (
        <VStack gap="16">
            <DashboardStats
                totalArticles={totalArticles}
                totalUsers={totalUsers}
                activeArticlesList={activeArticlesList}
                avgRating={averageRating}
                avgViews={averageViews}
            />
            <HStack gap="16">
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
            <UserRatingsBubbleChart
                data={ratingCountsByUser}
                totalArticles={totalArticles}
            />
        </VStack>
    );
};
