import React from 'react';

export interface DashboardCardProps {
    title: string;
    value: string;
    Icon?: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export interface ActiveArticlesList {
    withRating: Set<string>;
    withFeedback: Set<string>;
    withComments: Set<string>;
}

export interface DashboardStatsProps {
    totalUsers: number;
    totalArticles: number;
    avgRating: number;
    avgViews: number;
    activeArticlesList: ActiveArticlesList;
}

export interface DashboardPctDataStats {
    articlesWithCommentsPercentage: number;
    articlesWithFeedbackPercentage: number;
}
