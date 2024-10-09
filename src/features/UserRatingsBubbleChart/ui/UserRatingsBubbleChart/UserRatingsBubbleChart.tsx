import React from 'react';
import { useArticles } from '@/entities/Article';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { UserRatingsBubbleChartSkeleton } from './UserRatingsBubbleChartSkeleton';
import { DeprecatedUserRatingsBubbleChart } from './DeprecatedUserRatingsBubbleChart/DeprecatedUserRatingsBubbleChart';
import { RedesignedUserRatingsBubbleChart } from './RedesignedUserRatingsBubbleChart/RedesignedUserRatingsBubbleChart';

export interface UserRatingsBubbleChartProps {
    ratingsByUsersData: { name: string; data: number[][] }[];
    maxXaxisValue: number;
}

export const UserRatingsBubbleChart = (props: UserRatingsBubbleChartProps) => {
    const { isLoading: isArticlesLoading, error } = useArticles(null);

    if (error) return null;

    if (isArticlesLoading) {
        return <UserRatingsBubbleChartSkeleton />;
    }

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedUserRatingsBubbleChart {...props} />}
            off={<DeprecatedUserRatingsBubbleChart {...props} />}
        />
    );
};
