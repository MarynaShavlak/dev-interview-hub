import React, { memo } from 'react';

import { Row } from '@tanstack/react-table';
import { TableRow } from './TableRow/TableRow';
import { Each } from '@/shared/lib/components/Each/Each';

interface TableBodyProps<T> {
    rows: Row<T>[];
}

export const TableBody = memo(<T,>(props: TableBodyProps<T>) => {
    const { rows } = props;

    return (
        <Each of={rows} render={(row) => <TableRow key={row.id} row={row} />} />
    );
});
