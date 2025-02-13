import React, { memo } from 'react';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { TableActionBarDeprecated } from './TableActionBarDeprecated/TableActionBarDeprecated';
import { TableActionBarRedesigned } from './TableActionBarRedesigned/TableActionBarRedesigned';

export interface TableActionBarProps {
    globalFilter: string;
    setGlobalFilter: (filterValue: string) => void;
    isEditRoleMode: boolean;
    toggleEditRoleMode: () => void;
    isToggleBtnShown: boolean;
}

export const TableActionBar = memo((props: TableActionBarProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<TableActionBarRedesigned {...props} />}
            off={<TableActionBarDeprecated {...props} />}
        />
    );
});
