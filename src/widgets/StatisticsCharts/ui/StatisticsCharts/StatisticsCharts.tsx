import { useTranslation } from 'react-i18next';
import React from 'react';
import { DashboardStats } from '@/features/DashboardStats';
import { processComments } from '../../lib/dataHandlers/processComments/processComments';
import { processRatings } from '../../lib/dataHandlers/processRatings/processRatings';
import { initializeData } from '../../lib/dataHandlers/initializeData/initializeData';
import { processArticles } from '../../lib/dataHandlers/processArticles/processArticles';
import { useStatisticsData } from '../../lib/hooks/useStatisticsData';
import { StatisticsChartsError } from './StatisticsChartsError';
import { StatisticsChartsSkeleton } from './StatisticsChartsSkeleton';
import { Box } from '@/shared/ui/common/Box';
import cls from './StatisticsCharts.module.scss';
import { ArticlePeriodDataCharts } from '@/features/ArticlePeriodDataCharts';
import { UsersActivityChart } from '@/features/UsersActivityChart';
import { ArticleRatingDistributionChart } from '@/features/ArticleRatingDistributionChart';

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
        <Box className={cls.statsWrap}>
            <DashboardStats
                totalArticles={totalArticles}
                totalUsers={totalUsers}
                activeArticlesList={activeArticlesList}
                avgRating={averageRating}
                avgViews={averageViews}
                className={cls.dashboard}
            />
            <ArticlePeriodDataCharts
                categories={categories}
                data={monthlyDataByCategories}
                className={cls.quarterlyChart}
            />

            <UsersActivityChart
                activeUsersList={activeUsersList}
                totalUsers={totalUsers}
                className={cls.usersActivityChart}
            />
            <ArticleRatingDistributionChart
                ratingDistributionMap={ratingDistributionMap}
                totalArticlesWithRatings={articlesWithRatingQuantity}
                className={cls.articleRatDistributionChart}
            />

            {/* <ArticleCategoriesCharts */}
            {/*    data={categoryData} */}
            {/*    className={cls.articleCategoriesChart} */}
            {/* /> */}

            {/* <ArticlePeriodDataCharts */}
            {/*    categories={categories} */}
            {/*    data={monthlyDataByCategories} */}
            {/*    className={cls.monthlyChart} */}
            {/* /> */}

            {/* <UserRatingsBubbleChart */}
            {/*    data={ratingCountsByUser} */}
            {/*    totalArticles={totalArticles} */}
            {/*    className={cls.bubbleChart} */}
            {/* /> */}

            {/* <ArticleCommentsCharts */}
            {/*    articleCommentCounts={articleCommentCounts} */}
            {/*    commentCountsByUser={commentCountsByUser} */}
            {/*    className={cls.commentsChart} */}
            {/* /> */}
        </Box>
    );
};
