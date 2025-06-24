import React, { ReactNode } from 'react';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { EntityFiltersRedesigned } from './EntityFiltersRedesigned/EntityFiltersRedesigned';
import { EntityFiltersDeprecated } from './EntityFiltersDeprecated/EntityFiltersDeprecated';

export interface EntityFiltersProps {
    className?: string;
    children?: ReactNode;
}

export const EntityFilters = (props: EntityFiltersProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<EntityFiltersRedesigned {...props} />}
            off={<EntityFiltersDeprecated {...props} />}
        />
    );
};
