import React, { memo } from 'react';
import { DashboardCardProps } from '../../model/types/types';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DashboardCardRedesigned } from './DashboardCardRedesigned/DashboardCardRedesigned';
import { DashboardCardDeprecated } from './DashboardCardDeprecated/DashboardCardDeprecated';

export const DashboardCard = memo((props: DashboardCardProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<DashboardCardRedesigned {...props} />}
            off={<DashboardCardDeprecated {...props} />}
        />
    );
});
