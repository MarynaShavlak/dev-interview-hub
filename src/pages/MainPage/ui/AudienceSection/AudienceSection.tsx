import React from 'react';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { AudienceSectionRedesigned } from './AudienceSectionRedesigned/AudienceSectionRedesigned';
import { AudienceSectionDeprecated } from './AudienceSectionDeprecated/AudienceSectionDeprecated';

export const AudienceSection = () => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<AudienceSectionRedesigned />}
            off={<AudienceSectionDeprecated />}
        />
    );
};
