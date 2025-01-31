import { flexRender, HeaderGroup } from '@tanstack/react-table';

import { Box } from '@/shared/ui/common/Box';
import cls from './TableHeaderCell.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { SortingIcon } from './SortingIcon/SortingIcon';
import { TableFilter } from './TableFilter/TableFilter';
import {
    ColumnFilterHandlerProps,
    CommonFilterType,
} from '../../model/types/types';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { HStack, VStack } from '@/shared/ui/common/Stack';

export interface TableHeaderCellProps<T> extends ColumnFilterHandlerProps {
    headerGroup: HeaderGroup<T>;
    columnFilters: CommonFilterType;
    headerOptionsMapping: Record<string, string[]>;
}

export const TableHeaderCell = <T,>(props: TableHeaderCellProps<T>) => {
    const {
        headerGroup,
        setColumnFilters,
        columnFilters,
        headerOptionsMapping,
    } = props;
    const additionalClasses = getFlexClasses({
        hStack: true,
        gap: '8',
        justify: 'center',
        align: 'center',
    });

    return (
        <Box className={cls.tr} key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
                const d = header.column.columnDef.header;

                return (
                    <Box
                        className={classNames(cls.th, {}, [
                            ...additionalClasses,
                        ])}
                        key={header.id}
                        width={header.getSize()}
                    >
                        {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                        )}
                        <VStack gap="4">
                            <HStack gap="4">
                                {header.column.getCanSort() && (
                                    <SortingIcon column={header.column} />
                                )}
                            </HStack>
                            {header.column.getCanFilter() && (
                                <TableFilter
                                    filterCategory={header.id}
                                    columnFilters={columnFilters}
                                    setColumnFilters={setColumnFilters}
                                    allOptions={
                                        headerOptionsMapping[header.id] || []
                                    }
                                />
                            )}
                        </VStack>
                    </Box>
                );
            })}
        </Box>
    );
};
