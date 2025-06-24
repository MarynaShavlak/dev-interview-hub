import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { UserRatingsBubbleChartDeprecated } from './UserRatingsBubbleChartDeprecated/UserRatingsBubbleChartDeprecated';
import { UserRatingsBubbleChartRedesigned } from './UserRatingsBubbleChartRedesigned/UserRatingsBubbleChartRedesigned';
import { UserRatingsBubbleChartProps } from '../../model/types/types';

export const UserRatingsBubbleChart = memo(
    (props: UserRatingsBubbleChartProps) => {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<UserRatingsBubbleChartRedesigned {...props} />}
                off={<UserRatingsBubbleChartDeprecated {...props} />}
            />
        );
    },
);
