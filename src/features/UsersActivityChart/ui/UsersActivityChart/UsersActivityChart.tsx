import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DeprecatedUsersActivityChart } from './DeprecatedUsersActivityChart/DeprecatedUsersActivityChart';
import { RedesignedUsersActivityChart } from './RedesignedUsersActivityChart/RedesignedUsersActivityChart';
import { UsersActivityChartProps } from '../../model/types/types';

export const UsersActivityChart = memo((props: UsersActivityChartProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedUsersActivityChart {...props} />}
            off={<DeprecatedUsersActivityChart {...props} />}
        />
    );
});
