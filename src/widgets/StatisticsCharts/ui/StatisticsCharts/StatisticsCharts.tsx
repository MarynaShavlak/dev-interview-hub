import { useTranslation } from 'react-i18next';
import React from 'react';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { ArticleCategoriesCharts } from '@/features/ArticleCategoriesCharts';
import { ArticleQuarterlyDataCharts } from '@/features/ArticleQuarterlyDataCharts';
import { ArticleCommentsCharts } from '@/features/ArticleCommentsCharts';
import { ArticleRatingsCharts } from '@/features/ArticleRatingsCharts';
import { Card } from '@/shared/ui/redesigned/Card';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { RadialbarChart } from '@/shared/ui/common/Charts/ui/RadialbarChart';
import { useStatisticsData } from '../../lib/hooks/useStatisticsData';
import { DashboardCard } from '@/features/DashboardCard';

interface ArticlesByUserData {
    [userId: string]: number;
}

// interface UserRatingData {
//     totalRating: number;
//     articlesWithRating: number;
//     articlesWithFeedback: number;
// }

interface ArticleStats {
    [key: string]: number;
}

export const StatisticsCharts = () => {
    const { t } = useTranslation('admin');
    const additionalClasses = getFlexClasses({
        vStack: true,
        justify: 'between',
    });
    const { users, articles, ratings, comments, isLoading } =
        useStatisticsData();
    if (isLoading) return null;

    const totalArticlesCount = articles?.length || 0;
    const totalUsers = users?.length || 0;
    const activeUsersData: number[] = [];
    const articlesByRatingDistributionData: number[] = [];
    const categoryData: Record<string, ArticleStats> = {};
    const articleCommentCounts: { articleId: string; commentCount: number }[] =
        [];
    const commentCountsByArticle: Record<string, number> = {};
    const commentCountsByUser: Record<string, number> = {};
    const ratingFromUsersData: Record<string, ArticleStats> = {};

    let totalViews = 0;

    const uniqueUsersInArticlesList: Set<string> = new Set();
    const uniqueUsersInCommentsList: Set<string> = new Set();
    const uniqueUsersInRatingsList: Set<string> = new Set();
    const articlesWithFeedbackList: Set<string> = new Set();
    const articlesWithCommentsList: Set<string> = new Set();
    // _______________________________________________________

    articles?.forEach((article) => {
        uniqueUsersInArticlesList.add(article.user.id);
        totalViews += article.views;

        article.category.forEach((cat) => {
            if (!categoryData[cat]) {
                categoryData[cat] = { articleCount: 0, viewCount: 0 };
            }
            categoryData[cat].articleCount += 1;
            categoryData[cat].viewCount += article.views;
        });
    });

    comments?.forEach((comment) => {
        const {
            user: { id, username },
            articleId,
        } = comment;
        uniqueUsersInCommentsList.add(id);
        articlesWithCommentsList.add(articleId);
        if (commentCountsByArticle[articleId]) {
            commentCountsByArticle[articleId] += 1;
        } else {
            commentCountsByArticle[articleId] = 1;
        }

        if (commentCountsByUser[username]) {
            commentCountsByUser[username] += 1;
        } else {
            commentCountsByUser[username] = 1;
        }
    });

    Object.entries(commentCountsByArticle).forEach(
        ([articleId, commentCount]) => {
            articleCommentCounts.push({ articleId, commentCount });
        },
    );

    articleCommentCounts.sort((a, b) => b.commentCount - a.commentCount);

    // ________________
    const uniqueUserInArticlesCount = uniqueUsersInArticlesList.size;
    const activeInArticlesUsersPercentage = Number(
        ((uniqueUserInArticlesCount / totalUsers) * 100).toFixed(2),
    );

    // ________________

    const uniqueUserInCommentsCount = uniqueUsersInCommentsList.size;
    const activeInCommentsUsersPercentage = Number(
        ((uniqueUserInCommentsCount / totalUsers) * 100).toFixed(2),
    );

    // ________________AVeRAGE___RATING_______________________
    const articleRatingStats: { [articleId: string]: ArticleStats } = {};
    let totalArticleAverages = 0;
    let articlesWithRatingCount = 0;
    const ratingCount = { rate1to2: 0, rate3to4: 0, rate5: 0 };

    ratings.forEach((rating) => {
        const { articleId, rate, feedback, userId } = rating;
        if (!articleRatingStats[articleId]) {
            articleRatingStats[articleId] = { totalRating: 0, count: 0 };
        }
        articleRatingStats[articleId].totalRating += rate;
        articleRatingStats[articleId].count += 1;

        uniqueUsersInRatingsList.add(userId);

        if (feedback) {
            articlesWithFeedbackList.add(articleId);
        }

        if (!ratingFromUsersData[userId]) {
            ratingFromUsersData[userId] = {
                totalRating: 0,
                articlesWithRating: 0,
                articlesWithFeedback: 0,
            };
        }
        ratingFromUsersData[userId].totalRating += rate;
        ratingFromUsersData[userId].articlesWithRating += 1;
        if (feedback) {
            ratingFromUsersData[userId].articlesWithFeedback += 1;
        }
    });

    const percentageRatedValues: number[] = [];

    Object.keys(articleRatingStats).forEach((articleId) => {
        const { totalRating, count } = articleRatingStats[articleId];
        const articleAverage = totalRating / count;
        totalArticleAverages += articleAverage;
        articlesWithRatingCount += 1;

        if (articleAverage >= 1 && articleAverage <= 2) {
            ratingCount.rate1to2 += 1;
        } else if (articleAverage >= 3 && articleAverage < 5) {
            ratingCount.rate3to4 += 1;
        } else {
            ratingCount.rate5 += 1;
        }
    });

    const averageRating = (
        totalArticleAverages / articlesWithRatingCount
    ).toFixed(2);
    const averageViews =
        articlesWithRatingCount > 0
            ? (totalViews / totalArticlesCount).toFixed(0)
            : 0;

    // ___________________________________________________
    const uniqueUserInRatingsCount = uniqueUsersInRatingsList.size;
    const activeInRatingsUsersPercentage = Number(
        ((uniqueUserInRatingsCount / totalUsers) * 100).toFixed(2),
    );
    // ___________________________________________________
    const articlesWithFeedbackCount = articlesWithFeedbackList.size;
    const articlesWithFeedbackCountPercentage = Number(
        ((articlesWithFeedbackCount / articlesWithRatingCount) * 100).toFixed(
            2,
        ),
    );

    const articlesWithCommentsCount = articlesWithCommentsList.size;
    const articlesWithCommentsCountPercentage = Number(
        ((articlesWithCommentsCount / articlesWithRatingCount) * 100).toFixed(
            2,
        ),
    );

    // _______________________________________
    activeUsersData.push(
        activeInArticlesUsersPercentage,
        activeInCommentsUsersPercentage,
        activeInRatingsUsersPercentage,
    );
    articlesByRatingDistributionData.push(
        ratingCount.rate1to2,
        ratingCount.rate3to4,
        ratingCount.rate5,
    );

    const activeUserLabels = [
        `${t('Автори статей')}`,
        `${t('Коментатори статей')}`,
        `${t('Оцінка статей')}`,
    ];

    const articlesByRatingDistributionLabels = [
        `${t('Оцінка 1-2')}`,
        `${t('Оцінка 3-4')}`,
        `${t('Оцінка 5')}`,
    ];

    // _____________________________ArticleCategoriesCharts_______________________
    const categoryChartLabels = Object.keys(categoryData);
    const articlesCategoriesChartData = categoryChartLabels.map(
        (label) => categoryData[label].articleCount,
    );
    const viewsChartData = categoryChartLabels.map(
        (label) => categoryData[label].viewCount,
    );

    // _____________________________ArticleCommentsCharts_______________________

    const sortedCommentCounts = articleCommentCounts.map(
        (item) => item.commentCount,
    );
    const sortedArticleIdsByComments = articleCommentCounts.map(
        (item) => item.articleId,
    );
    const commentsByUserData = Object.entries(commentCountsByUser)
        .map(([username, commentCount]) => ({ x: username, y: commentCount }))
        .sort((a, b) => b.y - a.y);

    // _____________________________ArticleRatingsCharts_______________________

    const ratingsChartData = Object.entries(ratingFromUsersData).map(
        ([userId, userData]) => {
            const { totalRating, articlesWithRating, articlesWithFeedback } =
                userData;

            const averageRating = articlesWithRating
                ? (totalRating / articlesWithRating).toFixed(1)
                : '0.0';

            const percentageRated = totalArticlesCount
                ? (articlesWithRating / totalArticlesCount) * 100
                : 0;

            const formattedPercentageRated = parseFloat(
                percentageRated.toFixed(1),
            );

            percentageRatedValues.push(formattedPercentageRated);

            return {
                name: `${t(`userId`)}:  ${userId} `,
                data: [
                    [
                        formattedPercentageRated,
                        parseFloat(averageRating),
                        articlesWithFeedback,
                    ],
                ],
            };
        },
    );
    const maxXaxisValue = Math.max(...percentageRatedValues);

    return (
        <VStack gap="16">
            <HStack gap="16" wrap="wrap">
                <DashboardCard
                    title={t('Кількість користувачів')}
                    value={totalUsers}
                />
                <DashboardCard
                    title={t('Кількість статей')}
                    value={totalArticlesCount}
                />
                <DashboardCard
                    title={t('Середній рейтинг статей')}
                    value={`${averageRating}%`}
                />
                <DashboardCard
                    title={t('Частка оцінених із фідбеком')}
                    value={`${articlesWithFeedbackCountPercentage}%`}
                />
                <DashboardCard
                    title={t('Середня кількість переглядів статей')}
                    value={`${averageViews}`}
                />
                <DashboardCard
                    title={t('Частка статей із коментарями')}
                    value={`${articlesWithCommentsCountPercentage}%`}
                />
            </HStack>
            <HStack gap="24">
                <Card>
                    <RadialbarChart
                        data={activeUsersData}
                        labels={activeUserLabels}
                        title={t('Відсоток активних користувачів, %')}
                        legendPosition="top"
                        height="200"
                        width="380"
                        totalLabel={t('Загальний відсоток')}
                    />
                </Card>

                <Card>
                    <RadialbarChart
                        data={articlesByRatingDistributionData}
                        labels={articlesByRatingDistributionLabels}
                        title={t('Розподіл статей за оцінками')}
                        legendPosition="top"
                        height="200"
                        width="220"
                        totalLabel={t('Загальна кількість')}
                        totalValue={`${articlesWithRatingCount}`}
                    />
                </Card>
            </HStack>

            <ArticleCategoriesCharts
                labels={categoryChartLabels}
                viewData={viewsChartData}
                articleData={articlesCategoriesChartData}
            />
            <ArticleQuarterlyDataCharts />
            <ArticleCommentsCharts
                articleCommentsLabels={sortedArticleIdsByComments}
                articleCommentsData={sortedCommentCounts}
                commentsByUsersData={commentsByUserData}
            />
            <ArticleRatingsCharts
                articleRatingsByUsersData={ratingsChartData}
                maxXaxisValue={maxXaxisValue}
            />
        </VStack>
    );
};
