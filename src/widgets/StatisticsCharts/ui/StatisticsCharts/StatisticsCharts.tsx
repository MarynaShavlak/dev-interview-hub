import { useTranslation } from 'react-i18next';
import React from 'react';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { useStatisticsData } from '../../lib/hooks/useStatisticsData';

import { User } from '@/entities/User';

import { RatingType } from '@/entities/Rating';
import { Article } from '@/entities/Article';
import {
    ArticleCategoriesCharts,
    ArticleCategoriesChartsProps,
} from '@/features/ArticleCategoriesCharts';
import {
    ArticleCommentsCharts,
    ArticleCommentsChartsProps,
} from '@/features/ArticleCommentsCharts';
import { RadialbarChart } from '@/shared/ui/common/Charts/ui/RadialbarChart';
import { Card } from '@/shared/ui/redesigned/Card';
import { DashboardStats } from '@/features/DashboardStats';
import {
    ArticleRatingsCharts,
    ArticleRatingsChartsProps,
} from '@/features/ArticleRatingsCharts';
import { calculatePercentage } from '@/shared/lib/mathCalculations/calculatePercentage';
import { calculateAverage } from '@/shared/lib/mathCalculations/calculateAverage';

interface ArticlesByUserData {
    [userId: string]: number;
}

// interface UserRatingData {
//     totalRating: number;
//     articlesWithRating: number;
//     articlesWithFeedback: number;
// }

export interface ArticleComment extends Comment {
    articleId: string;
    user: User;
}

export interface ArticleRating extends RatingType {
    articleId: string;
    userId: string;
}

interface ArticleStats {
    [key: string]: number;
}

// interface ProcessedRatings {
//     averageRating: string;
//     ratingCount: {
//         rate1to2: number;
//         rate3to4: number;
//         rate5: number;
//     };
// }

interface ArticleCommentCount {
    articleId: string;
    commentCount: number;
}

interface ActiveUsersList {
    inArticles: Set<string>;
    inComments: Set<string>;
    inRatings: Set<string>;
}

interface ActiveArticlesList {
    withRating: Set<string>;
    withFeedback: Set<string>;
    withComments: Set<string>;
}

interface DashboardPctDataStats {
    articlesWithCommentsPercentage: number;
    articlesWithFeedbackPercentage: number;
}

interface InitializedData {
    totalArticles: number;
    totalUsers: number;
    totalViews: number;
    averageRating: number;
    averageViews: number;
    categoryData: Record<string, ArticleStats>;
    articleRatingStats: Record<string, ArticleStats>;
    articleCommentCounts: ArticleCommentCount[];
    commentCountsByArticle: Record<string, number>;
    commentCountsByUser: Record<string, number>;
    ratingFromUsersData: Record<string, ArticleStats>;
    activeUsersList: ActiveUsersList;
    activeArticlesList: ActiveArticlesList;
    ratingDistributionMap: Map<number, number>;
}

const getUserRatingsChartData = (
    ratingFromUsersData: Record<string, ArticleStats>,
    totalArticles: number,
    tooltipName: string,
): ArticleRatingsChartsProps => {
    let maxPercentageRated = 0;

    const ratingsByUsersData = Object.entries(ratingFromUsersData).map(
        ([userId, userData]) => {
            const averageRating = calculateAverage(
                userData.totalRating,
                userData.articlesWithRating,
            );

            const percentageRated = calculatePercentage(
                userData.articlesWithRating,
                totalArticles,
            );

            if (percentageRated > maxPercentageRated) {
                maxPercentageRated = percentageRated;
            }

            return {
                name: `${tooltipName}: ${userId}`,
                data: [
                    [
                        percentageRated,
                        averageRating,
                        userData.articlesWithFeedback,
                    ],
                ],
            };
        },
    );

    const maxXaxisValue = maxPercentageRated + 2;

    return {
        ratingsByUsersData,
        maxXaxisValue,
    };
};

const getArticleCategoriesChartData = (
    categoryData: Record<string, ArticleStats>,
): ArticleCategoriesChartsProps => {
    const labels: string[] = [];
    const viewsByCategories: number[] = [];
    const articlesByCategories: number[] = [];

    Object.entries(categoryData).forEach(
        ([category, { viewCount, articleCount }]) => {
            labels.push(category);
            viewsByCategories.push(viewCount);
            articlesByCategories.push(articleCount);
        },
    );

    return {
        labels,
        viewsByCategories,
        articlesByCategories,
    };
};

const getArticleCommentsChartData = (
    articleCommentCounts: ArticleCommentCount[],
    commentCountsByUser: Record<string, number>,
): ArticleCommentsChartsProps => {
    const labels: string[] = [];
    const commentsByArticlesData: number[] = [];

    articleCommentCounts.forEach(({ articleId, commentCount }) => {
        labels.push(articleId);
        commentsByArticlesData.push(commentCount);
    });

    const commentsByUsersData = Object.entries(commentCountsByUser)
        .map(([username, commentCount]) => ({ x: username, y: commentCount }))
        .sort((a, b) => b.y - a.y);

    return {
        labels,
        commentsByArticlesData,
        commentsByUsersData,
    };
};

const getDashboardPctData = (
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

const getActiveUsersChartData = (
    activeUsersList: ActiveUsersList,
    totalUsers: number,
): number[] => {
    const calculateActivePercentage = (activeSet: Set<string>) =>
        calculatePercentage(activeSet?.size ?? 0, totalUsers);

    const activeUsersData = [
        calculateActivePercentage(activeUsersList.inArticles),
        calculateActivePercentage(activeUsersList.inComments),
        calculateActivePercentage(activeUsersList.inRatings),
    ];
    return activeUsersData;
};

const getArticleByRatingsDistributionChartData = (
    ratingDistributionMap: Map<number, number>,
    totalArticlesWithRatings: number,
): number[] => {
    const articlesByRatingDistributionData = [
        calculatePercentage(
            ratingDistributionMap.get(1)! + ratingDistributionMap.get(2)!,
            totalArticlesWithRatings,
            1,
        ),
        calculatePercentage(
            ratingDistributionMap.get(3)! + ratingDistributionMap.get(4)!,
            totalArticlesWithRatings,
            1,
        ),
        calculatePercentage(
            ratingDistributionMap.get(5)!,
            totalArticlesWithRatings,
            1,
        ),
    ];
    return articlesByRatingDistributionData;
};

const initializeData = (
    articles: Article[],
    users: User[],
): InitializedData => {
    const totalArticles = articles?.length || 0;
    const totalUsers = users?.length || 0;
    return {
        totalArticles,
        totalUsers,
        totalViews: 0,
        averageRating: 0,
        averageViews: 0,
        categoryData: {},
        articleCommentCounts: [],
        commentCountsByArticle: {},
        commentCountsByUser: {},
        articleRatingStats: {},
        ratingFromUsersData: {},
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

const processArticles = (articles: Article[], data: InitializedData) => {
    articles.forEach((article) => {
        data.activeUsersList.inArticles.add(article.user.id);
        data.totalViews += article.views;

        article.category.forEach((cat) => {
            if (!data.categoryData[cat]) {
                data.categoryData[cat] = { articleCount: 0, viewCount: 0 };
            }
            data.categoryData[cat].articleCount += 1;
            data.categoryData[cat].viewCount += article.views;
        });
    });

    data.averageViews = calculateAverage(
        data.totalViews,
        data.totalArticles,
        0,
    );
};

const processComments = (comments: ArticleComment[], data: InitializedData) => {
    comments.forEach((comment) => {
        const {
            user: { id, username },
            articleId,
        } = comment;
        data.activeUsersList.inComments.add(id);
        data.activeArticlesList.withComments.add(articleId);
        // data.articlesWithCommentsList.add(articleId);

        data.commentCountsByArticle[articleId] =
            (data.commentCountsByArticle[articleId] || 0) + 1;
        data.commentCountsByUser[username] =
            (data.commentCountsByUser[username] || 0) + 1;
    });

    data.articleCommentCounts = Object.entries(data.commentCountsByArticle)
        .map(([articleId, commentCount]) => ({ articleId, commentCount }))
        .sort((a, b) => b.commentCount - a.commentCount);
};

const processRatings = (ratings: ArticleRating[], data: InitializedData) => {
    let totalArticleAverages = 0;
    let articlesWithRatingCount = 0;

    const updateUserRatingData = (
        userId: string,
        rate: number,
        feedback: string | undefined,
    ) => {
        if (!data.ratingFromUsersData[userId]) {
            data.ratingFromUsersData[userId] = {
                totalRating: 0,
                articlesWithRating: 0,
                articlesWithFeedback: 0,
            };
        }
        data.ratingFromUsersData[userId].totalRating += rate;
        data.ratingFromUsersData[userId].articlesWithRating += 1;

        if (feedback) {
            data.ratingFromUsersData[userId].articlesWithFeedback += 1;
        }
        data.activeUsersList.inRatings.add(userId);
    };

    const updateArticleRatingData = (
        articleId: string,
        rate: number,
        feedback: string | undefined,
    ) => {
        if (!data.articleRatingStats[articleId]) {
            data.articleRatingStats[articleId] = { totalRating: 0, count: 0 };
        }
        data.articleRatingStats[articleId].totalRating += rate;
        data.articleRatingStats[articleId].count += 1;
        data.activeArticlesList.withRating.add(articleId);
        if (feedback) {
            data.activeArticlesList.withFeedback.add(articleId);
        }
    };

    ratings.forEach((rating) => {
        const { articleId, rate, feedback, userId } = rating;
        updateUserRatingData(userId, rate, feedback);
        updateArticleRatingData(articleId, rate, feedback);
    });

    console.log('totalArticleAverages after forEach', totalArticleAverages);
    console.log(
        'articlesWithRatingCount after forEach',
        articlesWithRatingCount,
    );

    Object.entries(data.articleRatingStats).forEach(
        ([articleId, { totalRating, count }]) => {
            const articleAverage = totalRating / count;
            totalArticleAverages += articleAverage;

            articlesWithRatingCount += 1;
            switch (articleAverage) {
                case 1:
                    data.ratingDistributionMap.set(
                        1,
                        (data.ratingDistributionMap.get(1) ?? 0) + 1,
                    );
                    break;
                case 2:
                    data.ratingDistributionMap.set(
                        2,
                        (data.ratingDistributionMap.get(3) ?? 0) + 1,
                    );
                    break;
                case 3:
                    data.ratingDistributionMap.set(
                        3,
                        (data.ratingDistributionMap.get(5) ?? 0) + 1,
                    );
                    break;
                case 4:
                    data.ratingDistributionMap.set(
                        4,
                        (data.ratingDistributionMap.get(5) ?? 0) + 1,
                    );
                    break;
                case 5:
                    data.ratingDistributionMap.set(
                        5,
                        (data.ratingDistributionMap.get(5) ?? 0) + 1,
                    );
                    break;
                default:
                    break;
            }
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

    if (!users || !articles || !ratings || !comments) return null;

    const data = initializeData(articles, users);
    processArticles(articles, data);
    processComments(comments, data);
    processRatings(ratings, data);

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

    if (isLoading) return null;
    console.log('data', data);

    const {
        totalArticles,
        totalUsers,
        averageRating,
        averageViews,
        // articlesByRatingDistributionData,
        categoryData,
        ratingFromUsersData,
        articleCommentCounts,
        commentCountsByUser,
        activeArticlesList,
        activeUsersList,
        ratingDistributionMap,
    } = data;

    const {
        labels: categoryChartLabels,
        viewsByCategories,
        articlesByCategories,
    } = getArticleCategoriesChartData(categoryData);

    const {
        labels: articleCommentsLabels,
        commentsByArticlesData,
        commentsByUsersData,
    } = getArticleCommentsChartData(articleCommentCounts, commentCountsByUser);

    const { ratingsByUsersData, maxXaxisValue } = getUserRatingsChartData(
        ratingFromUsersData,
        totalArticles,
        t('userId'),
    );
    const { articlesWithCommentsPercentage, articlesWithFeedbackPercentage } =
        getDashboardPctData(activeArticlesList, totalArticles);

    const activeUsersData = getActiveUsersChartData(
        activeUsersList,
        totalUsers,
    );

    const articlesWithRatingQuantity = activeArticlesList.withRating.size;

    const articlesByRatingDistributionData =
        getArticleByRatingsDistributionChartData(
            ratingDistributionMap,
            articlesWithRatingQuantity,
        );

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
                        totalValue={`${articlesWithRatingQuantity}`}
                    />
                </Card>
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
            <ArticleRatingsCharts
                ratingsByUsersData={ratingsByUsersData}
                maxXaxisValue={maxXaxisValue}
            />
        </VStack>
    );
};

//
// const initializeData = (): InitializedData => {
//     return {
//         totalArticles: 0,
//         totalUsers: 0,
//         activeUsersData: [],
//         articlesByRatingDistributionData: [],
//         categoryData: {},
//         articleCommentCounts: [],
//         commentCountsByArticle: {},
//         commentCountsByUser: {},
//         ratingFromUsersData: {},
//         totalViews: 0,
//         uniqueUsersInArticlesList: new Set(),
//         uniqueUsersInCommentsList: new Set(),
//         uniqueUsersInRatingsList: new Set(),
//         articlesWithFeedbackList: new Set(),
//         articlesWithCommentsList: new Set(),
//     };
// };
//
// const processArticles = (articles: Article[], data: InitializedData): void => {
//     articles?.forEach((article) => {
//         data.uniqueUsersInArticlesList.add(article.user.id);
//         data.totalViews += article.views;
//
//         article.category.forEach((cat) => {
//             if (!data.categoryData[cat]) {
//                 data.categoryData[cat] = { articleCount: 0, viewCount: 0 };
//             }
//             data.categoryData[cat].articleCount += 1;
//             data.categoryData[cat].viewCount += article.views;
//         });
//     });
// };
//
// const processComments = (
//     comments: ArticleComment[],
//     data: InitializedData,
// ): void => {
//     comments?.forEach((comment) => {
//         const {
//             user: { id, username },
//             articleId,
//         } = comment;
//         data.uniqueUsersInCommentsList.add(id);
//         data.articlesWithCommentsList.add(articleId);
//
//         data.commentCountsByArticle[articleId] =
//             (data.commentCountsByArticle[articleId] || 0) + 1;
//         data.commentCountsByUser[username] =
//             (data.commentCountsByUser[username] || 0) + 1;
//     });
//
//     Object.entries(data.commentCountsByArticle).forEach(
//         ([articleId, commentCount]) => {
//             data.articleCommentCounts.push({ articleId, commentCount });
//         },
//     );
//
//     data.articleCommentCounts.sort((a, b) => b.commentCount - a.commentCount);
// };
//
// const processRatings = (
//     ratings: ArticleRating[],
//     data: InitializedData,
// ): ProcessedRatings => {
//     const articleRatingStats: Record<string, ArticleStats> = {};
//     let totalArticleAverages = 0;
//     let articlesWithRatingCount = 0;
//     const ratingCount = { rate1to2: 0, rate3to4: 0, rate5: 0 };
//
//     ratings.forEach((rating) => {
//         const { articleId, rate, feedback, userId } = rating;
//
//         if (!articleRatingStats[articleId]) {
//             articleRatingStats[articleId] = { totalRating: 0, count: 0 };
//         }
//
//         articleRatingStats[articleId].totalRating += rate;
//         articleRatingStats[articleId].count += 1;
//
//         data.uniqueUsersInRatingsList.add(userId);
//
//         if (feedback) {
//             data.articlesWithFeedbackList.add(articleId);
//         }
//
//         if (!data.ratingFromUsersData[userId]) {
//             data.ratingFromUsersData[userId] = {
//                 totalRating: 0,
//                 articlesWithRating: 0,
//                 articlesWithFeedback: 0,
//             };
//         }
//
//         data.ratingFromUsersData[userId].totalRating += rate;
//         data.ratingFromUsersData[userId].articlesWithRating += 1;
//
//         if (feedback) {
//             data.ratingFromUsersData[userId].articlesWithFeedback += 1;
//         }
//     });
//
//     Object.keys(articleRatingStats).forEach((articleId) => {
//         const { totalRating, count } = articleRatingStats[articleId];
//         const articleAverage = totalRating / count;
//         totalArticleAverages += articleAverage;
//         articlesWithRatingCount += 1;
//
//         if (articleAverage >= 1 && articleAverage <= 2) {
//             ratingCount.rate1to2 += 1;
//         } else if (articleAverage >= 3 && articleAverage < 5) {
//             ratingCount.rate3to4 += 1;
//         } else {
//             ratingCount.rate5 += 1;
//         }
//     });
//
//     const averageRating = (
//         totalArticleAverages / articlesWithRatingCount
//     ).toFixed(2);
//
//     return { averageRating, ratingCount };
// };
//
// const calculatePercentages = (
//     totalUsers: number,
//     data: InitializedData,
// ): number[] => {
//     const uniqueUserInArticlesCount = data.uniqueUsersInArticlesList.size;
//     const uniqueUserInCommentsCount = data.uniqueUsersInCommentsList.size;
//     const uniqueUserInRatingsCount = data.uniqueUsersInRatingsList.size;
//
//     const activeInArticlesUsersPercentage = Number(
//         ((uniqueUserInArticlesCount / totalUsers) * 100).toFixed(2),
//     );
//     const activeInCommentsUsersPercentage = Number(
//         ((uniqueUserInCommentsCount / totalUsers) * 100).toFixed(2),
//     );
//     const activeInRatingsUsersPercentage = Number(
//         ((uniqueUserInRatingsCount / totalUsers) * 100).toFixed(2),
//     );
//
//     return [
//         activeInArticlesUsersPercentage,
//         activeInCommentsUsersPercentage,
//         activeInRatingsUsersPercentage,
//     ];
// };
//
// const prepareChartData = (data: InitializedData) => {
//     // const activeUserLabels = [
//     //     `${t('Authors')}`,
//     //     `${t('Commentators')}`,
//     //     `${t('Raters')}`,
//     // ];
//     // const articlesByRatingDistributionLabels = [
//     //     `${t('Rating 1-2')}`,
//     //     `${t('Rating 3-4')}`,
//     //     `${t('Rating 5')}`,
//     // ];
//     const categoryChartLabels = Object.keys(data.categoryData);
//     const articlesCategoriesChartData = categoryChartLabels.map(
//         (label) => data.categoryData[label].articleCount,
//     );
//     const viewsChartData = categoryChartLabels.map(
//         (label) => data.categoryData[label].viewCount,
//     );
//
//     return {
//         // activeUserLabels,
//         // articlesByRatingDistributionLabels,
//         categoryChartLabels,
//         articlesCategoriesChartData,
//         viewsChartData,
//     };
// };
//
// const processStatistics = (
//     users: User[],
//     articles: Article[],
//     ratings: ArticleRating[],
//     comments: ArticleComment[],
// ) => {
//     const data = initializeData();
//
//     data.totalArticles = articles?.length || 0;
//     data.totalUsers = users?.length || 0;
//
//     processArticles(articles, data);
//     processComments(comments, data);
//     const { averageRating, ratingCount } = processRatings(ratings, data);
//     const percentages = calculatePercentages(data.totalUsers, data);
//
//     const chartsData = prepareChartData(data);
//     data.activeUsersData.push(...percentages);
//     data.articlesByRatingDistributionData.push(
//         ratingCount.rate1to2,
//         ratingCount.rate3to4,
//         ratingCount.rate5,
//     );
//
//     return {
//         activeUsersData: data.activeUsersData,
//         articlesByRatingDistributionData: data.articlesByRatingDistributionData,
//         averageRating,
//         chartsData,
//     };
// };
