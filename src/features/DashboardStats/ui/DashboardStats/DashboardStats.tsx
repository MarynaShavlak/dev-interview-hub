import React from 'react';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/common/Stack';
import { DashboardCard } from '../DashboardCard/DashboardCard';

interface DashboardStatsProps {
    totalUsers: number;
    totalArticles: number;
    avgRating: number;
    feedbackPct: number;
    avgViews: number;
    commentsPct: number;
}

export const DashboardStats = (props: DashboardStatsProps) => {
    const {
        totalUsers,
        totalArticles,
        avgRating,
        feedbackPct,
        avgViews,
        commentsPct,
    } = props;
    const { t } = useTranslation('admin');
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
                value={`${feedbackPct}%`}
            />
            <DashboardCard
                title={t('Середня кількість переглядів статей')}
                value={`${avgViews}`}
            />
            <DashboardCard
                title={t('Частка статей із коментарями')}
                value={`${commentsPct}%`}
            />
        </HStack>
    );
};
