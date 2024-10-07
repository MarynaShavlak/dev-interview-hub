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
    let articleCount = 0;

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
        articleCount += 1;
    });
    const averageRating = (totalArticleAverages / articleCount).toFixed(2);
    const averageViews =
        articleCount > 0 ? (totalViews / totalArticlesCount).toFixed(0) : 0;

    console.log('articleCount', articleCount);
    // ___________________________________________________
    const uniqueUserInRatingsCount = uniqueUsersInRatings.size;
    const activeInRatingsUsersPercentage = Number(
        ((uniqueUserInRatingsCount / totalUsers) * 100).toFixed(2),
    );
    // ___________________________________________________
    const articlesWithFeedbackCount = articlesWithFeedback.size;
    const articlesWithFeedbackCountPercentage = Number(
        ((articlesWithFeedbackCount / articleCount) * 100).toFixed(2),
    );

    const articlesWithCommentsCount = articlesWithComments.size;
    const articlesWithCommentsCountPercentage = Number(
        ((articlesWithCommentsCount / articleCount) * 100).toFixed(2),
    );

    // _______________________________________
    activeUsersData.push(
        activeInArticlesUsersPercentage,
        activeInCommentsUsersPercentage,
        activeInRatingsUsersPercentage,
    );

    const activeUserLabels = [
        `${t('Автори статей')}`,
        `${t('Коментатори статей')}`,
        `${t('Оцінка статей')}`,
    ];

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
                    />
                </Card>
            </HStack>
            <HStack>
                <Card>
                    <RadialbarChart
                        data={activeUsersData}
                        labels={activeUserLabels}
                        title={t('Відсоток активних користувачів, %')}
                        legendPosition="top"
                        height="260"
                        width="260"
                        totalLabel={t('Загальний відсоток')}
                    />
                </Card>
            </HStack>

            <ArticleCategoriesCharts />
            <ArticleQuarterlyDataCharts />
            <ArticleCommentsCharts />
            <ArticleRatingsCharts />
        </VStack>
    );
};
