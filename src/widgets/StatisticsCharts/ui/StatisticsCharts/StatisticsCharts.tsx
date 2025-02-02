import React from 'react';
import { ArticleCommentatorsDistributionChart } from '@/features/ArticleCommentatorsDistributionChart';
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

import { processComments } from '../../lib/dataHandlers/processComments/processComments';
import { UserRatingsBubbleChart } from '@/features/UserRatingsBubbleChart';
import { ArticleRatingDistributionChart } from '@/features/ArticleRatingDistributionChart';
import { ArticlePeriodDataCharts } from '@/features/ArticlePeriodDataCharts';
import { CHARTS_RECTS } from '../../model/consts/chartsRects';
import { TopCommentedArticlesChart } from '@/features/TopCommentedArticlesChart';

export const StatisticsCharts = () => {
    const { users, articles, ratings, comments, isLoading, isError } =
        useStatisticsData();
    const {
        activeUsersDataChart,
        articlesByCategoriesChart,
        commentsByArticlesChart,
        commentsByUsersChart,
        monthlyCategoryChart,
        ratingsByUsersDataChart,
        quarterlyCategoryChart,
        viewsByCategoriesChart,
        articleRatingDistributionChart,
    } = CHARTS_RECTS;

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
                width={activeUsersDataChart.width}
                height={activeUsersDataChart.height}
            />
            <ArticleCategoriesCharts
                data={categoryData}
                className={cls.articleCategoriesChart}
                articlesByCategoriesDimensions={articlesByCategoriesChart}
                viewsByCategoriesDimensions={viewsByCategoriesChart}
            />

            <UserRatingsBubbleChart
                data={ratingCountsByUser}
                totalArticles={totalArticles}
                className={cls.bubbleChart}
                width={ratingsByUsersDataChart.width}
                height={ratingsByUsersDataChart.height}
            />
            <ArticleRatingDistributionChart
                ratingDistributionMap={ratingDistributionMap}
                totalArticlesWithRatings={articlesWithRatingQuantity}
                className={cls.articleRateDistributionChart}
                width={articleRatingDistributionChart.width}
                height={articleRatingDistributionChart.height}
            />
            <ArticleCommentatorsDistributionChart
                commentCountsByUser={commentCountsByUser}
                className={cls.commentsDistributionChart}
                chartDimensions={commentsByUsersChart}
            />
            <TopCommentedArticlesChart
                className={cls.commentsRatingChart}
                articleCommentCounts={articleCommentCounts}
                chartDimensions={commentsByArticlesChart}
            />

            <ArticlePeriodDataCharts
                categories={categories}
                data={monthlyDataByCategories}
                className={cls.quarterlyChart}
                isQuarterlyChart
                quarterlyCategoryDimensions={quarterlyCategoryChart}
                monthlyCategoryDimensions={monthlyCategoryChart}
            />
            <ArticlePeriodDataCharts
                categories={categories}
                data={monthlyDataByCategories}
                className={cls.monthlyChart}
                isMonthlyChart
                quarterlyCategoryDimensions={quarterlyCategoryChart}
                monthlyCategoryDimensions={monthlyCategoryChart}
            />
        </div>
    );
};
