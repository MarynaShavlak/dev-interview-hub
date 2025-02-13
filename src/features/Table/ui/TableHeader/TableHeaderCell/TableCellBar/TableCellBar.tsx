import React from 'react';
import { Header } from '@tanstack/react-table';
import { VStack } from '@/shared/ui/common/Stack';
import cls from '../TableHeaderCell.module.scss';
import { SortingButton } from '../SortingButton/SortingButton';

import { TableHeaderCellProps } from '../TableHeaderCell';
import { TableFilter } from '../../TableHeaderCell/TableFilter/TableFilter';

interface TableCellBarProps<T>
    extends Omit<TableHeaderCellProps<T>, 'withResizer' | 'headerGroup'> {
    isSortAvailable: boolean;
    isFilterAvailable: boolean;
    header: Header<T, unknown>;
}

export const TableCellBar = <T,>(props: TableCellBarProps<T>) => {
    const {
        isSortAvailable,
        isFilterAvailable,
        columnFilters,
        setColumnFilters,
        headerOptionsMapping,
        header,
    } = props;
    return (
        <>
            {isSortAvailable && isFilterAvailable && (
                <VStack className={cls.optionActionBlock}>
                    <SortingButton column={header.column} />
                    <TableFilter
                        filterCategory={header.id}
                        columnFilters={columnFilters}
                        setColumnFilters={setColumnFilters}
                        allOptions={headerOptionsMapping[header.id] || []}
                    />
                </VStack>
            )}

            {isSortAvailable && !isFilterAvailable && (
                <VStack gap="4" className={cls.optionSortActionBlock}>
                    <SortingButton column={header.column} />
                </VStack>
            )}
            {!isSortAvailable && isFilterAvailable && (
                <VStack gap="4" className={cls.optionFilterActionBlock}>
                    <TableFilter
                        filterCategory={header.id}
                        columnFilters={columnFilters}
                        setColumnFilters={setColumnFilters}
                        allOptions={headerOptionsMapping[header.id] || []}
                    />
                </VStack>
            )}
        </>
    );
};
