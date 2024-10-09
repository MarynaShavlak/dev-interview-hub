import React from 'react';
import { useArticles } from '@/entities/Article';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DeprecatedUsersActivityChart } from './DeprecatedUsersActivityChart/DeprecatedUsersActivityChart';
import { RedesignedUsersActivityChart } from './RedesignedUsersActivityChart/RedesignedUsersActivityChart';
import { UsersActivityChartSkeleton } from './UsersActivityChartSkeleton';

export interface UsersActivityChartProps {
    activeUsersData: number[];
}

export const UsersActivityChart = (props: UsersActivityChartProps) => {
    const { isLoading: isArticlesLoading, error } = useArticles(null);

    if (error) return null;

    if (isArticlesLoading) {
        return <UsersActivityChartSkeleton />;
    }

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedUsersActivityChart {...props} />}
            off={<DeprecatedUsersActivityChart {...props} />}
        />
    );
};
