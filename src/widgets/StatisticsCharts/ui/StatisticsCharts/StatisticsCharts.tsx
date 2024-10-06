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

interface ArticlesByUserData {
    [userId: string]: number;
}

export const StatisticsCharts = () => {
    const { t } = useTranslation('admin');
    const additionalClasses = getFlexClasses({ vStack: true, gap: '8' });

    const { data: users, isLoading: isUsersLoading } = useUsers(null);
    const { data: articles, isLoading: isArticlesLoading } = useArticles(null);

    const articlesByUserData: ArticlesByUserData = {};
    articles?.forEach((article) => {
        const userId: string = article.user.id;
        articlesByUserData[userId] = (articlesByUserData[userId] || 0) + 1;
    });

    console.log('articlesByUserData', Object.keys(articlesByUserData).length);
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
            </HStack>

            <ArticleCategoriesCharts />
            <ArticleQuarterlyDataCharts />
            <ArticleCommentsCharts />
            <ArticleRatingsCharts />
        </VStack>
    );
};
