import { Table } from '@tanstack/react-table';

import React from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { TablePaginationRedesigned } from './TablePaginationRedesigned/TablePaginationRedesigned';
import { TablePaginationDeprecated } from './TablePaginationDeprecated/TablePaginationDeprecated';

export interface TablePaginationProps<T> {
    table: Table<T>;
    className?: string;
}

export const TablePagination = <T,>(props: TablePaginationProps<T>) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<TablePaginationRedesigned {...props} />}
            off={<TablePaginationDeprecated {...props} />}
        />
    );
};
