import React from 'react';

import { ToggleFeaturesComponent } from '@/shared/lib/features';

import { ProblemsSectionDeprecated } from './ProblemsSectionDeprecated/ProblemsSectionDeprecated';
import { ProblemsSectionRedesigned } from './ProblemsSectionRedesigned/ProblemsSectionRedesigned';

export const ProblemsSection = () => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<ProblemsSectionRedesigned />}
            off={<ProblemsSectionDeprecated />}
        />
    );
};
