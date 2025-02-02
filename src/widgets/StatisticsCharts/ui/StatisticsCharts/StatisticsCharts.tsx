import { useTranslation } from 'react-i18next';
import React from 'react';
import { DashboardStats } from '@/features/DashboardStats';
import { processRatings } from '../../lib/dataHandlers/processRatings/processRatings';
import { initializeData } from '../../lib/dataHandlers/initializeData/initializeData';
import { processArticles } from '../../lib/dataHandlers/processArticles/processArticles';
import { useStatisticsData } from '../../lib/hooks/useStatisticsData';
import { StatisticsChartsError } from './StatisticsChartsError';
import { StatisticsChartsSkeleton } from './StatisticsChartsSkeleton';
import cls from './StatisticsCharts.module.scss';
import { UsersActivityChart } from '@/features/UsersActivityChart';
import { ArticleCategoriesCharts } from '@/features/ArticleCategoriesCharts';
// import { UserRatingsBubbleChart } from '@/features/UserRatingsBubbleChart';
import { processComments } from '../../lib/dataHandlers/processComments/processComments';
import { UserRatingsBubbleChart } from '@/features/UserRatingsBubbleChart';
import { ArticleRatingDistributionChart } from '@/features/ArticleRatingDistributionChart';
import { ArticleCommentsCharts } from '@/features/ArticleCommentsCharts';
import { ArticlePeriodDataCharts } from '@/features/ArticlePeriodDataCharts';

export const StatisticsCharts = () => {
    const { t } = useTranslation('admin');

    const { users, articles, ratings, comments, isLoading, isError } =
        useStatisticsData();

    const data = initializeData(articles, users);
    processArticles(data, articles);
    processComments(data, comments, articles);
    processRatings(data, ratings);

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
        // <VStack gap="16">
        <div className={cls.parent}>
            <DashboardStats
                totalArticles={totalArticles}
                totalUsers={totalUsers}
                activeArticlesList={activeArticlesList}
                avgRating={averageRating}
                avgViews={averageViews}
                className={cls.dashboard}
            />

            <UsersActivityChart
                activeUsersList={activeUsersList}
                totalUsers={totalUsers}
                className={cls.usersActivityChart}
            />
            <ArticleCategoriesCharts
                data={categoryData}
                className={cls.articleCategoriesChart}
            />

            <UserRatingsBubbleChart
                data={ratingCountsByUser}
                totalArticles={totalArticles}
                className={cls.bubbleChart}
            />
            <ArticleRatingDistributionChart
                ratingDistributionMap={ratingDistributionMap}
                totalArticlesWithRatings={articlesWithRatingQuantity}
                className={cls.articleRateDistributionChart}
            />
            <ArticleCommentsCharts
                articleCommentCounts={articleCommentCounts}
                commentCountsByUser={commentCountsByUser}
                className={cls.commentsDistributionChart}
                isDistributionChart
            />
            <ArticleCommentsCharts
                articleCommentCounts={articleCommentCounts}
                commentCountsByUser={commentCountsByUser}
                className={cls.commentsRatingChart}
                isRatingChart
            />

            <ArticlePeriodDataCharts
                categories={categories}
                data={monthlyDataByCategories}
                className={cls.quarterlyChart}
                isQuarterlyChart
            />
            <ArticlePeriodDataCharts
                categories={categories}
                data={monthlyDataByCategories}
                className={cls.monthlyChart}
                isMonthlyChart
            />
        </div>
    );
};
