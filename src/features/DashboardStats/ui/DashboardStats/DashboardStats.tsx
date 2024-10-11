import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/common/Stack';
import { DashboardCard } from '../DashboardCard/DashboardCard';
import { DashboardStatsProps } from '../../model/types/types';
import { useDashboardPctData } from '../../lib/hooks/useDashboardPctData';

export const DashboardStats = memo((props: DashboardStatsProps) => {
    const {
        totalUsers,
        totalArticles,
        avgRating,
        activeArticlesList,
        avgViews,
    } = props;
    const { t } = useTranslation('admin');

    const { articlesWithCommentsPercentage, articlesWithFeedbackPercentage } =
        useDashboardPctData(activeArticlesList, totalArticles);

    return (
        <HStack gap="16" wrap="wrap">
            <DashboardCard
                title={t('Кількість користувачів')}
                value={`${totalUsers}`}
            />
            <DashboardCard
                title={t('Кількість статей')}
                value={`${totalArticles}`}
            />
            <DashboardCard
                title={t('Середній рейтинг статей')}
                value={`${avgRating}`}
            />
            <DashboardCard
                title={t('Частка оцінених із фідбеком')}
                value={`${articlesWithFeedbackPercentage}%`}
            />
            <DashboardCard
                title={t('Середня кількість переглядів статей')}
                value={`${avgViews}`}
            />
            <DashboardCard
                title={t('Частка статей із коментарями')}
                value={`${articlesWithCommentsPercentage}%`}
            />
        </HStack>
    );
});
