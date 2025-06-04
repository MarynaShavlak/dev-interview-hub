import React from 'react';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { FeaturesSectionRedesigned } from './FeaturesSectionRedesigned/FeaturesSectionRedesigned';
import { FeaturesSectionDeprecated } from './FeaturesSectionDeprecated/FeaturesSectionDeprecated';

export const FeaturesSection = () => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<FeaturesSectionRedesigned />}
            off={<FeaturesSectionDeprecated />}
        />
    );
};
