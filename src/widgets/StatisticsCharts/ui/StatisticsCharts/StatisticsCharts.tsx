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
    totalRating: number;
    count: number;
}

export const StatisticsCharts = () => {
    const { t } = useTranslation('admin');
    const additionalClasses = getFlexClasses({ vStack: true, gap: '8' });

    const { data: users, isLoading: isUsersLoading } = useUsers(null);
    const { data: articles, isLoading: isArticlesLoading } = useArticles(null);
    const { data: ratings = [], isLoading: isRatingsLoading } =
        useArticlesRatings(null);

    const articlesByUserData: ArticlesByUserData = {};
    articles?.forEach((article) => {
        const userId: string = article.user.id;
        articlesByUserData[userId] = (articlesByUserData[userId] || 0) + 1;
    });

    const articleStats: { [articleId: string]: ArticleStats } = {};

    ratings.forEach((rating) => {
        if (!articleStats[rating.articleId]) {
            articleStats[rating.articleId] = { totalRating: 0, count: 0 };
        }
        articleStats[rating.articleId].totalRating += rating.rate;
        articleStats[rating.articleId].count += 1;
    });

    let totalArticleAverages = 0;
    let articleCount = 0;

    Object.keys(articleStats).forEach((articleId) => {
        const { totalRating, count } = articleStats[articleId];
        const articleAverage = totalRating / count;
        totalArticleAverages += articleAverage;
        articleCount += 1;
    });
    const overallAverage = (totalArticleAverages / articleCount).toFixed(2);
    console.log('Overall average rating:', overallAverage);

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
                        text={String(users?.length)}
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
