import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { DashboardCard } from '../DashboardCard/DashboardCard';
import { DashboardStatsProps } from '../../model/types/types';
import { useDashboardPctData } from '../../lib/hooks/useDashboardPctData';
import StarIcon from '@/shared/assets/icons/star.svg';
import ArticleIconDeprecated from '@/shared/assets/icons/article-20-20.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import { toggleFeatures } from '@/shared/lib/features';
import ProfileIconDeprecated from '@/shared/assets/icons/profile-20-20.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import ViewDeprecated from '@/shared/assets/icons/eye-20-20.svg';
import View from '@/shared/assets/icons/eye.svg';
import FeedbackIcon from '@/shared/assets/icons/like.svg';
import CommentIcon from '@/shared/assets/icons/comment.svg';
import { VStack } from '@/shared/ui/common/Stack';

export const DashboardStats = memo((props: DashboardStatsProps) => {
    const {
        totalUsers,
        totalArticles,
        avgRating,
        activeArticlesList,
        avgViews,
        className,
    } = props;
    const { t } = useTranslation('admin');

    const ArticlesIcon = toggleFeatures({
        name: 'isAppRedesigned',
        off: () => ArticleIconDeprecated,
        on: () => ArticleIcon,
    });

    const UsersIcon = toggleFeatures({
        name: 'isAppRedesigned',
        off: () => ProfileIconDeprecated,
        on: () => ProfileIcon,
    });

    const ViewsIcon = toggleFeatures({
        name: 'isAppRedesigned',
        off: () => ViewDeprecated,
        on: () => View,
    });

    const { articlesWithCommentsPercentage, articlesWithFeedbackPercentage } =
        useDashboardPctData(activeArticlesList, totalArticles);

    return (
        <VStack gap="16" wrap="wrap" className={className}>
            <DashboardCard
                title={t('Кількість користувачів')}
                value={`${totalUsers}`}
                Icon={UsersIcon}
            />
            <DashboardCard
                title={t('Кількість статей')}
                value={`${totalArticles}`}
                Icon={ArticlesIcon}
            />
            <DashboardCard
                title={t('Середній рейтинг статей')}
                value={`${avgRating}`}
                Icon={StarIcon}
            />
            <DashboardCard
                title={t('Частка оцінених із фідбеком статей')}
                value={`${articlesWithFeedbackPercentage}%`}
                Icon={FeedbackIcon}
            />
            <DashboardCard
                title={t('Середня кількість переглядів статей')}
                value={`${avgViews}`}
                Icon={ViewsIcon}
            />
            <DashboardCard
                title={t('Частка статей із коментарями')}
                value={`${articlesWithCommentsPercentage}%`}
                Icon={CommentIcon}
            />
        </VStack>
    );
});
