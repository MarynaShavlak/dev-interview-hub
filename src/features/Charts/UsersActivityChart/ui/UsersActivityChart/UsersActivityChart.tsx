import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { UsersActivityChartDeprecated } from './UsersActivityChartDeprecated/UsersActivityChartDeprecated';
import { UsersActivityChartRedesigned } from './UsersActivityChartRedesigned/UsersActivityChartRedesigned';
import { UsersActivityChartProps } from '../../model/types/types';

export const UsersActivityChart = memo((props: UsersActivityChartProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<UsersActivityChartRedesigned {...props} />}
            off={<UsersActivityChartDeprecated {...props} />}
        />
    );
});
