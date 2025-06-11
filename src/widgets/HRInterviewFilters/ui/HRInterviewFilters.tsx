import React from 'react';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { HRInterviewFiltersRedesigned } from './HRInterviewFiltersRedesigned/HRInterviewFiltersRedesigned';
import { HRInterviewFiltersDeprecated } from './HRInterviewFiltersDeprecated/HRInterviewFiltersDeprecated';

export interface HRInterviewFiltersProps {
    className?: string;
}

export const HRInterviewFilters = (props: HRInterviewFiltersProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<HRInterviewFiltersRedesigned {...props} />}
            off={<HRInterviewFiltersDeprecated {...props} />}
        />
    );
};
