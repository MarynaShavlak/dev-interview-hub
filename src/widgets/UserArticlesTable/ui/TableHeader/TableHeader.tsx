import React, { memo } from 'react';

import { HeaderGroup } from '@tanstack/react-table';
import { Each } from '@/shared/lib/components/Each/Each';
import { TableHeaderCell } from './TableHeaderCell/TableHeaderCell';
import { CommonFilterType } from '../../model/types/types';

interface TableHeaderProps<T> {
    headerGroups: HeaderGroup<T>[];
    setColumnFilters: (filters: any) => void;
    headerOptionsMapping: Record<string, string[]>;
    columnFilters: CommonFilterType;
}

export const TableHeader = memo(<T,>(props: TableHeaderProps<T>) => {
    const {
        headerGroups,
        setColumnFilters,
        headerOptionsMapping,
        columnFilters,
    } = props;
    return (
        <Each
            of={headerGroups}
            render={(headerGroup) => {
                return (
                    <TableHeaderCell
                        key={headerGroup.id}
                        headerGroup={headerGroup}
                        setColumnFilters={setColumnFilters}
                        headerOptionsMapping={headerOptionsMapping}
                        columnFilters={columnFilters}
                    />
                );
            }}
        />
    );
});
