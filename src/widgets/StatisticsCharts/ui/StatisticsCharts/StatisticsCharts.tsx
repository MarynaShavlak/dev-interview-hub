import { useTranslation } from 'react-i18next';
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

interface ArticlesByUserData {
    [userId: string]: number;
}

interface ArticleStats {
    [key: string]: number;
}

export const StatisticsCharts = () => {
    const { t } = useTranslation('admin');
    const additionalClasses = getFlexClasses({ vStack: true, gap: '8' });

    const { data: users, isLoading: isUsersLoading } = useUsers(null);
    const { data: articles, isLoading: isArticlesLoading } = useArticles(null);
    const { data: ratings = [], isLoading: isRatingsLoading } =
        useArticlesRatings(null);

    const totalUsers = users?.length || 0;

    // ______________INACTIVE IN ARTICLES WRITING USERS_____________
    const uniqueUsersInArticles: Set<string> = new Set();
    // ______________________________________

    articles?.forEach((article) => {
        uniqueUsersInArticles.add(article.user.id);
    });

    const uniqueUserInArticlesCount = uniqueUsersInArticles.size;
    const inactiveInArticlesUsersPercentage = Number(
        (100 - (uniqueUserInArticlesCount / totalUsers) * 100).toFixed(2),
    );
    console.log(
        'Number of unique users in articles:',
        uniqueUserInArticlesCount,
    );
    console.log(
        'inactiveInArticlesUsersPercentage:',
        inactiveInArticlesUsersPercentage,
    );

    // ______________iNACTIVE IN RATING USERS_____________

    const uniqueUsersInRatings: Set<string> = new Set();

    // ________________AVARAGE___RATING_______________________

    const articleRatingStats: { [articleId: string]: ArticleStats } = {};
    let totalArticleAverages = 0;
    let articleCount = 0;

    ratings.forEach((rating) => {
        if (!articleRatingStats[rating.articleId]) {
            articleRatingStats[rating.articleId] = { totalRating: 0, count: 0 };
        }
        articleRatingStats[rating.articleId].totalRating += rating.rate;
        articleRatingStats[rating.articleId].count += 1;

        // ____________________________
        uniqueUsersInRatings.add(rating.userId);
        // _______________________________
    });

    Object.keys(articleRatingStats).forEach((articleId) => {
        const { totalRating, count } = articleRatingStats[articleId];
        const articleAverage = totalRating / count;
        totalArticleAverages += articleAverage;
        articleCount += 1;
    });
    const overallAverage = (totalArticleAverages / articleCount).toFixed(2);
    console.log('Overall average rating:', overallAverage);

    // ___________________________________________________
    const uniqueUserInRatingsCount = uniqueUsersInRatings.size;
    const inactiveInRatingsUsersPercentage = Number(
        (100 - (uniqueUserInRatingsCount / totalUsers) * 100).toFixed(2),
    );
    console.log('Number of unique users:', uniqueUserInRatingsCount);
    console.log(
        'inactiveInRatingsUsersPercentage:',
        inactiveInRatingsUsersPercentage,
    );
    // ___________________________________________________

    // _______________________________________

    if (isUsersLoading || isArticlesLoading || isRatingsLoading) return null;

    return (
        <VStack gap="16">
            <HStack gap="16">
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
                        text={String(articles?.length)}
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
                        text={`${overallAverage}%`}
                        size="l"
                        align="right"
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
