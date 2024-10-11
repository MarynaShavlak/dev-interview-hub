import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DeprecatedUserRatingsBubbleChart } from './DeprecatedUserRatingsBubbleChart/DeprecatedUserRatingsBubbleChart';
import { RedesignedUserRatingsBubbleChart } from './RedesignedUserRatingsBubbleChart/RedesignedUserRatingsBubbleChart';
import { UserRatingsBubbleChartProps } from '../../model/types/types';

export const UserRatingsBubbleChart = memo(
    (props: UserRatingsBubbleChartProps) => {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<RedesignedUserRatingsBubbleChart {...props} />}
                off={<DeprecatedUserRatingsBubbleChart {...props} />}
            />
        );
    },
);
