import React from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DeprecatedUserRatingsBubbleChart } from './DeprecatedUserRatingsBubbleChart/DeprecatedUserRatingsBubbleChart';
import { RedesignedUserRatingsBubbleChart } from './RedesignedUserRatingsBubbleChart/RedesignedUserRatingsBubbleChart';
import { UserRatingsBubbleChartProps } from '../../model/types/types';

// export interface UserRatingsBubbleChartProps {
//     // ratingsByUsersData: { name: string; data: number[][] }[];
//     // maxXaxisValue: number;
//
//     data:
//     totalArticles: number
// }

export const UserRatingsBubbleChart = (props: UserRatingsBubbleChartProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedUserRatingsBubbleChart {...props} />}
            off={<DeprecatedUserRatingsBubbleChart {...props} />}
        />
    );
};
