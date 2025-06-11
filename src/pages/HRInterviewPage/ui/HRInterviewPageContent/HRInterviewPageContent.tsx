import React from 'react';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { HRInterviewPageContentDeprecated } from './HRInterviewPageContentDeprecated/HRInterviewPageContentDeprecated';
import { HRInterviewPageContentRedesigned } from './HRInterviewPageContentRedesigned/HRInterviewPageContentRedesigned';

export const HRInterviewPageContent = () => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<HRInterviewPageContentRedesigned />}
            off={<HRInterviewPageContentDeprecated />}
        />
    );
};
