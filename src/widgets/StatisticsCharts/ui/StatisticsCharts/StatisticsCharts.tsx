import { useTranslation } from 'react-i18next';
import React from 'react';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { ArticleCategoriesCharts } from '@/features/ArticleCategoriesCharts';
import { ArticleQuarterlyDataCharts } from '@/features/ArticleQuarterlyDataCharts';
import { ArticleCommentsCharts } from '@/features/ArticleCommentsCharts';
import { ArticleRatingsCharts } from '@/features/ArticleRatingsCharts';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './StatisticsCharts.module.scss';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { useUsers } from '@/entities/User';
import { useArticles } from '@/entities/Article';
import { useArticlesRatings } from '../../api/articlesRatingsApi';
import { useArticlesComments } from '../../api/articlesCommentsApi';
import { RadialbarChart } from '@/shared/ui/common/Charts/ui/RadialbarChart';

interface ArticlesByUserData {
    [userId: string]: number;
}

interface ArticleStats {
    [key: string]: number;
}

export const StatisticsCharts = () => {
    const { t } = useTranslation('admin');
    const additionalClasses = getFlexClasses({
        vStack: true,
        justify: 'between',
    });

    const { data: users, isLoading: isUsersLoading } = useUsers(null);
    const { data: articles, isLoading: isArticlesLoading } = useArticles(null);
    const { data: ratings = [], isLoading: isRatingsLoading } =
        useArticlesRatings(null);
    const { data: comments = [], isLoading: isCommentsLoading } =
        useArticlesComments(null);

    const totalArticlesCount = articles?.length || 0;
    const totalUsers = users?.length || 0;
    const activeUsersData: number[] = [];
    const articlesByRatingDistributionData: number[] = [];
    const categoryData: Record<
        string,
        { articleCount: number; viewCount: number }
    > = {};
    let totalViews = 0;

    const uniqueUsersInArticles: Set<string> = new Set();
    const uniqueUsersInComments: Set<string> = new Set();
    const uniqueUsersInRatings: Set<string> = new Set();
    const articlesWithFeedback: Set<string> = new Set();
    const articlesWithComments: Set<string> = new Set();
    // _______________________________________________________

    articles?.forEach((article) => {
        uniqueUsersInArticles.add(article.user.id);
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
        uniqueUsersInComments.add(comment.user.id);
        articlesWithComments.add(comment.articleId);
    });

    const uniqueUserInArticlesCount = uniqueUsersInArticles.size;
    const activeInArticlesUsersPercentage = Number(
        ((uniqueUserInArticlesCount / totalUsers) * 100).toFixed(2),
    );
    // console.log(
    //     'Number of unique users in articles:',
    //     uniqueUserInArticlesCount,
    // );
    // console.log(
    //     'activeInArticlesUsersPercentage:',
    //     activeInArticlesUsersPercentage,
    // );

    const uniqueUserInCommentsCount = uniqueUsersInComments.size;
    const activeInCommentsUsersPercentage = Number(
        ((uniqueUserInCommentsCount / totalUsers) * 100).toFixed(2),
    );

    // ________________AVeRAGE___RATING_______________________
    const articleRatingStats: { [articleId: string]: ArticleStats } = {};
    let totalArticleAverages = 0;
    let articlesWithRatingCount = 0;
    const ratingCount = { rate1to2: 0, rate3to4: 0, rate5: 0 };

    ratings.forEach((rating) => {
        if (!articleRatingStats[rating.articleId]) {
            articleRatingStats[rating.articleId] = { totalRating: 0, count: 0 };
        }
        articleRatingStats[rating.articleId].totalRating += rating.rate;
        articleRatingStats[rating.articleId].count += 1;

        uniqueUsersInRatings.add(rating.userId);
        if (rating.feedback) {
            articlesWithFeedback.add(rating.articleId);
        }
    });

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

    console.log('articleRatingStats', articleRatingStats);
    // ___________________________________________________
    const uniqueUserInRatingsCount = uniqueUsersInRatings.size;
    const activeInRatingsUsersPercentage = Number(
        ((uniqueUserInRatingsCount / totalUsers) * 100).toFixed(2),
    );
    // ___________________________________________________
    const articlesWithFeedbackCount = articlesWithFeedback.size;
    const articlesWithFeedbackCountPercentage = Number(
        ((articlesWithFeedbackCount / articlesWithRatingCount) * 100).toFixed(
            2,
        ),
    );

    const articlesWithCommentsCount = articlesWithComments.size;
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
    const labels = Object.keys(categoryData);
    const articleData = labels.map((label) => categoryData[label].articleCount);
    const viewData = labels.map((label) => categoryData[label].viewCount);

    // _____________________________ArticleCategoriesCharts_______________________

    if (
        isUsersLoading ||
        isArticlesLoading ||
        isRatingsLoading ||
        isCommentsLoading
    )
        return null;

    return (
        <VStack gap="16">
            <HStack gap="16" wrap="wrap">
                <Card
                    className={classNames(
                        cls.dashboardCard,
                        {},
                        additionalClasses,
                    )}
                >
                    <Text bold text={t('Кількість користувачів')} />
                    <Text
                        bold
                        text={String(totalUsers)}
                        size="l"
                        align="right"
                        variant="accent"
                    />
                </Card>
                <Card
                    className={classNames(
                        cls.dashboardCard,
                        {},
                        additionalClasses,
                    )}
                >
                    <Text bold text={t('Кількість статей')} />
                    <Text
                        bold
                        text={String(totalArticlesCount)}
                        size="l"
                        align="right"
                        variant="accent"
                    />
                </Card>
                <Card
                    className={classNames(
                        cls.dashboardCard,
                        {},
                        additionalClasses,
                    )}
                >
                    <Text bold text={t('Середній рейтинг статей')} />
                    <Text
                        bold
                        text={`${averageRating}%`}
                        size="l"
                        align="right"
                        variant="accent"
                    />
                </Card>
                <Card
                    className={classNames(
                        cls.dashboardCard,
                        {},
                        additionalClasses,
                    )}
                >
                    <Text
                        bold
                        text={t('Частка оцінених із фідбеком')}
                        className={cls.dashboardCardLabel}
                    />
                    <Text
                        bold
                        text={`${articlesWithFeedbackCountPercentage}%`}
                        size="l"
                        align="right"
                        variant="accent"
                    />
                </Card>
                <Card
                    className={classNames(
                        cls.dashboardCard,
                        {},
                        additionalClasses,
                    )}
                >
                    <Text
                        bold
                        text={t('Середня кількість переглядів статей')}
                        className={cls.dashboardCardLabel}
                    />
                    <Text
                        bold
                        text={`${averageViews}`}
                        size="l"
                        align="right"
                        variant="accent"
                    />
                </Card>
                <Card
                    className={classNames(
                        cls.dashboardCard,
                        {},
                        additionalClasses,
                    )}
                >
                    <Text
                        bold
                        text={t('Частка статей із коментарями')}
                        className={cls.dashboardCardLabel}
                    />
                    <Text
                        bold
                        text={`${articlesWithCommentsCountPercentage}%`}
                        size="l"
                        align="right"
                        variant="accent"
                    />
                </Card>
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
                labels={labels}
                viewData={viewData}
                articleData={articleData}
            />
            <ArticleQuarterlyDataCharts />
            <ArticleCommentsCharts />
            <ArticleRatingsCharts />
        </VStack>
    );
};
