import React, { memo } from 'react';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { HRInterviewPageRedesigned } from './HRInterviewPageRedesigned/HRInterviewPageRedesigned';
import { HRInterviewPageDeprecated } from './HRInterviewPageDeprecated/HRInterviewPageDeprecated';

const HRInterviewPage = () => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<HRInterviewPageRedesigned />}
            off={<HRInterviewPageDeprecated />}
        />
    );
};

export default memo(HRInterviewPage);
