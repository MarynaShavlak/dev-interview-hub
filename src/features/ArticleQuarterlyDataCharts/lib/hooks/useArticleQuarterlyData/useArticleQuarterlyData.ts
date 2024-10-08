import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import { Article, useArticles } from '@/entities/Article';

interface QuarterlyData {
    [key: string]: number;
}

interface QuarterlyCount {
    [key: string]: QuarterlyData;
}

interface ChartData {
    name: string;
    data: number[];
}

interface UseArticleQuarterlyDataProps {
    isAccumulated?: boolean;
}

export const useArticleQuarterlyData = (
    props: UseArticleQuarterlyDataProps,
) => {
    const { isAccumulated = false } = props;
    const { t } = useTranslation('admin');
    const { data: articles, isLoading } = useArticles(null);

    const getQuarter = useCallback(
        (month: number): string => {
            if (month >= 1 && month <= 3) return `${t('Q')}1`;
            if (month >= 4 && month <= 6) return `${t('Q')}2`;
            if (month >= 7 && month <= 9) return `${t('Q')}3`;
            if (month >= 10 && month <= 12) return `${t('Q')}4`;
            return '';
        },
        [t],
    );

    const getQuartersList = useCallback(() => {
        return Array.from({ length: 4 }, (_, index) => `${t('Q')}${index + 1}`);
    }, [t]);

    const extractYearsAndCategories = useCallback(
        (articles: Article[]) => {
            const years = new Set<string>();
            const categories = new Set<string>();

            articles.forEach((article) => {
                const year = article.createdAt.split('.')[2]; // Extract year
                years.add(year);
                article.category.forEach((cat: string) => categories.add(cat));
            });

            return {
                years: Array.from(years).sort(),
                categories: Array.from(categories).map((cat) => t(`${cat}`)),
            };
        },
        [t],
    );

    const initializeQuarterlyData = useCallback(
        (years: string[], categories: string[]): QuarterlyCount => {
            const quarterlyData: QuarterlyCount = {};

            years.forEach((year) => {
                getQuartersList().forEach((quarter) => {
                    const key = `${quarter}/${year}`;
                    quarterlyData[key] = categories.reduce((acc, category) => {
                        acc[category] = 0; // Initialize category count to 0
                        return acc;
                    }, {} as QuarterlyData);
                });
            });

            return quarterlyData;
        },
        [getQuartersList],
    );

    const processQuarterlyData = useCallback(
        (
            articles: Article[] | undefined,
            initialData: QuarterlyCount,
            accumulate: boolean,
        ) => {
            const processedData: QuarterlyCount = { ...initialData };

            articles?.forEach((article) => {
                const [day, month, year] = article.createdAt
                    .split('.')
                    .map(Number);
                const quarter = getQuarter(month);
                const key = `${quarter}/${year}`;

                article.category.forEach((category: string) => {
                    if (processedData[key]) {
                        const localeCategory = t(`${category}`);
                        processedData[key][localeCategory] += 1;
                    }
                });
            });

            if (accumulate) {
                Object.keys(processedData).forEach((key, index, keys) => {
                    if (index > 0) {
                        const previousKey = keys[index - 1];
                        Object.keys(processedData[key]).forEach((category) => {
                            processedData[key][category] +=
                                processedData[previousKey][category];
                        });
                    }
                });
            }

            return processedData;
        },
        [getQuarter, t],
    );

    const { years, categories } = useMemo(
        () => extractYearsAndCategories(articles || []),
        [articles, extractYearsAndCategories],
    );

    const quarterlyData = useMemo(() => {
        return initializeQuarterlyData(years, categories);
    }, [years, categories, initializeQuarterlyData]);

    const processedQuarterlyData = useMemo(() => {
        const initialData = { ...quarterlyData };
        return processQuarterlyData(articles, initialData, isAccumulated);
    }, [articles, quarterlyData, processQuarterlyData, isAccumulated]);

    const periodLabels = Object.keys(processedQuarterlyData);

    const chartData: ChartData[] = useMemo(() => {
        return categories.map((category) => {
            const data = Object.values(processedQuarterlyData).map(
                (quarter) => quarter[category],
            );
            return { name: category, data };
        });
    }, [categories, processedQuarterlyData]);

    return {
        periodLabels,
        chartData,
    };
};

// // ________________AVeRAGE___RATING_______________________
// const articleRatingStats: { [articleId: string]: ArticleStats } = {};
// let totalArticleAverages = 0;
// let articlesWithRatingCount = 0;
// const ratingCount = { rate1to2: 0, rate3to4: 0, rate5: 0 };
//
// ratings.forEach((rating) => {
//     const { articleId, rate, feedback, userId } = rating;
//     if (!articleRatingStats[articleId]) {
//         articleRatingStats[articleId] = { totalRating: 0, count: 0 };
//     }
//     articleRatingStats[articleId].totalRating += rate;
//     articleRatingStats[articleId].count += 1;
//
//     uniqueUsersInRatingsList.add(userId);
//
//     if (feedback) {
//         articlesWithFeedbackList.add(articleId);
//     }
//
//     if (!ratingFromUsersData[userId]) {
//         ratingFromUsersData[userId] = {
//             totalRating: 0,
//             articlesWithRating: 0,
//             articlesWithFeedback: 0,
//         };
//     }
//     ratingFromUsersData[userId].totalRating += rate;
//     ratingFromUsersData[userId].articlesWithRating += 1;
//     if (feedback) {
//         ratingFromUsersData[userId].articlesWithFeedback += 1;
//     }
// });
//
// const percentageRatedValues: number[] = [];
//
// Object.keys(articleRatingStats).forEach((articleId) => {
//     const { totalRating, count } = articleRatingStats[articleId];
//     const articleAverage = totalRating / count;
//     totalArticleAverages += articleAverage;
//     articlesWithRatingCount += 1;
//
//     if (articleAverage >= 1 && articleAverage <= 2) {
//         ratingCount.rate1to2 += 1;
//     } else if (articleAverage >= 3 && articleAverage < 5) {
//         ratingCount.rate3to4 += 1;
//     } else {
//         ratingCount.rate5 += 1;
//     }
// });
//
// const averageRating = (
//     totalArticleAverages / articlesWithRatingCount
// ).toFixed(2);
// const averageViews =
//     articlesWithRatingCount > 0
//         ? (totalViews / totalArticles).toFixed(0)
//         : 0;
//
// // ___________________________________________________
// const uniqueUserInRatingsCount = uniqueUsersInRatingsList.size;
// const activeInRatingsUsersPercentage = Number(
//     ((uniqueUserInRatingsCount / totalUsers) * 100).toFixed(2),
// );

// // ___________________________________________________
// const uniqueUserInRatingsCount = uniqueUsersInRatingsList.size;
// const activeInRatingsUsersPercentage = Number(
//     ((uniqueUserInRatingsCount / totalUsers) * 100).toFixed(2),
// );
// // ___________________________________________________
// const articlesWithFeedbackCount = articlesWithFeedbackList.size;
// const articlesWithFeedbackCountPercentage = Number(
//     ((articlesWithFeedbackCount / articlesWithRatingCount) * 100).toFixed(
//         2,
//     ),
// );
//
// const articlesWithCommentsCount = articlesWithCommentsList.size;
// const articlesWithCommentsCountPercentage = Number(
//     ((articlesWithCommentsCount / articlesWithRatingCount) * 100).toFixed(
//         2,
//     ),
// );

/// /////////////////////////////////////
// const totalArticles = articles?.length || 0;
// const totalUsers = users?.length || 0;
// const activeUsersData: number[] = [];
// const articlesByRatingDistributionData: number[] = [];
// const categoryData: Record<string, ArticleStats> = {};
// const articleCommentCounts: { articleId: string; commentCount: number }[] =
//     [];
// const commentCountsByArticle: Record<string, number> = {};
// const commentCountsByUser: Record<string, number> = {};
// const ratingFromUsersData: Record<string, ArticleStats> = {};
//
// let totalViews = 0;
//
// const uniqueUsersInArticlesList: Set<string> = new Set();
// const uniqueUsersInCommentsList: Set<string> = new Set();
// const uniqueUsersInRatingsList: Set<string> = new Set();
// const articlesWithFeedbackList: Set<string> = new Set();
// const articlesWithCommentsList: Set<string> = new Set();
// // _______________________________________________________
//
// articles?.forEach((article) => {
//     uniqueUsersInArticlesList.add(article.user.id);
//     totalViews += article.views;
//
//     article.category.forEach((cat) => {
//         if (!categoryData[cat]) {
//             categoryData[cat] = { articleCount: 0, viewCount: 0 };
//         }
//         categoryData[cat].articleCount += 1;
//         categoryData[cat].viewCount += article.views;
//     });
// });
//
// comments?.forEach((comment) => {
//     const {
//         user: { id, username },
//         articleId,
//     } = comment;
//     uniqueUsersInCommentsList.add(id);
//     articlesWithCommentsList.add(articleId);
//     if (commentCountsByArticle[articleId]) {
//         commentCountsByArticle[articleId] += 1;
//     } else {
//         commentCountsByArticle[articleId] = 1;
//     }
//
//     if (commentCountsByUser[username]) {
//         commentCountsByUser[username] += 1;
//     } else {
//         commentCountsByUser[username] = 1;
//     }
// });
//
// Object.entries(commentCountsByArticle).forEach(
//     ([articleId, commentCount]) => {
//         articleCommentCounts.push({ articleId, commentCount });
//     },
// );
//
// articleCommentCounts.sort((a, b) => b.commentCount - a.commentCount);
//
// // ________________
// const uniqueUserInArticlesCount = uniqueUsersInArticlesList.size;
// const activeInArticlesUsersPercentage = Number(
//     ((uniqueUserInArticlesCount / totalUsers) * 100).toFixed(2),
// );
//
// // ________________
//
// const uniqueUserInCommentsCount = uniqueUsersInCommentsList.size;
// const activeInCommentsUsersPercentage = Number(
//     ((uniqueUserInCommentsCount / totalUsers) * 100).toFixed(2),
// );
//
// // ________________AVeRAGE___RATING_______________________
// const articleRatingStats: { [articleId: string]: ArticleStats } = {};
// let totalArticleAverages = 0;
// let articlesWithRatingCount = 0;
// const ratingCount = { rate1to2: 0, rate3to4: 0, rate5: 0 };
//
// ratings.forEach((rating) => {
//     const { articleId, rate, feedback, userId } = rating;
//     if (!articleRatingStats[articleId]) {
//         articleRatingStats[articleId] = { totalRating: 0, count: 0 };
//     }
//     articleRatingStats[articleId].totalRating += rate;
//     articleRatingStats[articleId].count += 1;
//
//     uniqueUsersInRatingsList.add(userId);
//
//     if (feedback) {
//         articlesWithFeedbackList.add(articleId);
//     }
//
//     if (!ratingFromUsersData[userId]) {
//         ratingFromUsersData[userId] = {
//             totalRating: 0,
//             articlesWithRating: 0,
//             articlesWithFeedback: 0,
//         };
//     }
//     ratingFromUsersData[userId].totalRating += rate;
//     ratingFromUsersData[userId].articlesWithRating += 1;
//     if (feedback) {
//         ratingFromUsersData[userId].articlesWithFeedback += 1;
//     }
// });
//
// const percentageRatedValues: number[] = [];
//
// Object.keys(articleRatingStats).forEach((articleId) => {
//     const { totalRating, count } = articleRatingStats[articleId];
//     const articleAverage = totalRating / count;
//     totalArticleAverages += articleAverage;
//     articlesWithRatingCount += 1;
//
//     if (articleAverage >= 1 && articleAverage <= 2) {
//         ratingCount.rate1to2 += 1;
//     } else if (articleAverage >= 3 && articleAverage < 5) {
//         ratingCount.rate3to4 += 1;
//     } else {
//         ratingCount.rate5 += 1;
//     }
// });
//
// const averageRating = (
//     totalArticleAverages / articlesWithRatingCount
// ).toFixed(2);
// const averageViews =
//     articlesWithRatingCount > 0
//         ? (totalViews / totalArticles).toFixed(0)
//         : 0;
//
// // ___________________________________________________
// const uniqueUserInRatingsCount = uniqueUsersInRatingsList.size;
// const activeInRatingsUsersPercentage = Number(
//     ((uniqueUserInRatingsCount / totalUsers) * 100).toFixed(2),
// );
// // ___________________________________________________
// const articlesWithFeedbackCount = articlesWithFeedbackList.size;
// const articlesWithFeedbackCountPercentage = Number(
//     ((articlesWithFeedbackCount / articlesWithRatingCount) * 100).toFixed(
//         2,
//     ),
// );
//
// const articlesWithCommentsCount = articlesWithCommentsList.size;
// const articlesWithCommentsCountPercentage = Number(
//     ((articlesWithCommentsCount / articlesWithRatingCount) * 100).toFixed(
//         2,
//     ),
// );
//
// // _______________________________________
// activeUsersData.push(
//     activeInArticlesUsersPercentage,
//     activeInCommentsUsersPercentage,
//     activeInRatingsUsersPercentage,
// );
// articlesByRatingDistributionData.push(
//     ratingCount.rate1to2,
//     ratingCount.rate3to4,
//     ratingCount.rate5,
// );

// // _____________________________ArticleCategoriesCharts_______________________
// const categoryChartLabels = Object.keys(categoryData);
// const articlesCategoriesChartData = categoryChartLabels.map(
//     (label) => categoryData[label].articleCount,
// );
// const viewsChartData = categoryChartLabels.map(
//     (label) => categoryData[label].viewCount,
// );
//
// // _____________________________ArticleCommentsCharts_______________________
//
// const sortedCommentCounts = articleCommentCounts.map(
//     (item) => item.commentCount,
// );
// const sortedArticleIdsByComments = articleCommentCounts.map(
//     (item) => item.articleId,
// );
// const commentsByUserData = Object.entries(commentCountsByUser)
//     .map(([username, commentCount]) => ({ x: username, y: commentCount }))
//     .sort((a, b) => b.y - a.y);
//
// // _____________________________ArticleRatingsCharts_______________________
//
// const ratingsChartData = Object.entries(ratingFromUsersData).map(
//     ([userId, userData]) => {
//         const { totalRating, articlesWithRating, articlesWithFeedback } =
//             userData;
//
//         const averageRating = articlesWithRating
//             ? (totalRating / articlesWithRating).toFixed(1)
//             : '0.0';
//
//         const percentageRated = totalArticles
//             ? (articlesWithRating / totalArticles) * 100
//             : 0;
//
//         const formattedPercentageRated = parseFloat(
//             percentageRated.toFixed(1),
//         );
//
//         percentageRatedValues.push(formattedPercentageRated);
//
//         return {
//             name: `${t(`userId`)}:  ${userId} `,
//             data: [
//                 [
//                     formattedPercentageRated,
//                     parseFloat(averageRating),
//                     articlesWithFeedback,
//                 ],
//             ],
//         };
//     },
// );
// const maxXaxisValue = Math.max(...percentageRatedValues);
