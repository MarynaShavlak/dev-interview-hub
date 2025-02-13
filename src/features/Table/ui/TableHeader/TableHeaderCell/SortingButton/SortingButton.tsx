import { Column } from '@tanstack/react-table';

import React from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { SortingButtonRedesigned } from './SortingButtonRedesigned/SortingButtonRedesigned';
import { SortingButtonDeprecated } from './SortingButtonDeprecated/SortingButtonDeprecated';

export interface SortingButtonProps<T> {
    column: Column<T>;
}

export const SortingButton = <T,>(props: SortingButtonProps<T>) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<SortingButtonRedesigned {...props} />}
            off={<SortingButtonDeprecated {...props} />}
        />
    );
};
