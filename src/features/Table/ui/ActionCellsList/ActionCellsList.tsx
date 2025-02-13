import { CellContext } from '@tanstack/react-table';

import React from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ActionCellsListRedesigned } from './ActionCellsListRedesigned/ActionCellsListRedesigned';
import { ActionCellsListDeprecated } from './ActionCellsListDeprecated/ActionCellsListDeprecated';

export interface ActionCellsListProps<TData> extends CellContext<TData, any> {
    deleteRow?: (id: string) => void;
    editRow?: (id: string) => void;
}

export const ActionCellsList = <TData extends { id: string }>(
    props: ActionCellsListProps<TData>,
) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<ActionCellsListRedesigned {...props} />}
            off={<ActionCellsListDeprecated {...props} />}
        />
    );
};
