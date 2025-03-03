import React from 'react';
import { CellContext } from '@tanstack/react-table';

interface LinkCellProps<TData> extends CellContext<TData, any> {
    value: string;
    navigateFn: (id: string) => void;
}

export const LinkCell = <TData extends { id: string }>({
    value,
    navigateFn,
    row,
}: LinkCellProps<TData>) => {
    return <button onClick={() => navigateFn(row.original.id)}>{value}</button>;
};
