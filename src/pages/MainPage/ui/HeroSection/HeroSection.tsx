import React from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

import { HeroSectionDeprecated } from './HeroSectionDeprecated/HeroSectionDeprecated';
import { HeroSectionRedesigned } from './HeroSectionRedesigned/HeroSectionRedesigned';

export const HeroSection = () => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<HeroSectionRedesigned />}
            off={<HeroSectionDeprecated />}
        />
    );
};
