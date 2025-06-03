import React from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

import { HeroSectionDeprecated } from './HeroSectionDeprecated/HeroSectionDeprecated';
import { HeroSectionRedesigned } from './HeroSectionRedesigned/HeroSectionRedesigned';

export const HeroSection = () => {
    const { t } = useTranslation('main');

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<HeroSectionRedesigned />}
            off={<HeroSectionDeprecated />}
        />
    );
};
