import { flexRender, HeaderGroup } from '@tanstack/react-table';

import React from 'react';
import { Box } from '@/shared/ui/common/Box';
import cls from './TableHeaderCell.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { SortingIcon } from './SortingIcon/SortingIcon';
import { TableFilter } from './TableFilter/TableFilter';

import { HStack, VStack } from '@/shared/ui/common/Stack';
import {
    ColorOption,
    ColumnFilterHandlerProps,
    CommonFilterType,
} from '../../../model/types/tableTypes';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';

export interface TableHeaderCellProps<T> extends ColumnFilterHandlerProps {
    headerGroup: HeaderGroup<T>;
    columnFilters: CommonFilterType;
    headerOptionsMapping:
        | Record<string, string[]>
        | Record<string, (string | ColorOption)[]>;
    withResizer?: boolean;
}

export const TableHeaderCell = <T,>(props: TableHeaderCellProps<T>) => {
    const {
        headerGroup,
        setColumnFilters,
        columnFilters,
        headerOptionsMapping,
        withResizer = false,
    } = props;
    const additionalClasses = getFlexClasses({
        hStack: true,
        gap: '16',
        justify: 'center',
        align: 'center',
    });

    return (
        <Box className={cls.tr} key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
                const isSortAvailable = header.column.getCanSort();
                const isFilterAvailable = header.column.getCanFilter();
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

                        {isSortAvailable && isFilterAvailable && (
                            <VStack className={cls.optionActionBlock}>
                                <HStack gap="4">
                                    {isSortAvailable && (
                                        <SortingIcon column={header.column} />
                                    )}
                                </HStack>
                                {isFilterAvailable && (
                                    <TableFilter
                                        filterCategory={header.id}
                                        columnFilters={columnFilters}
                                        setColumnFilters={setColumnFilters}
                                        allOptions={
                                            headerOptionsMapping[header.id] ||
                                            []
                                        }
                                    />
                                )}
                            </VStack>
                        )}

                        {isSortAvailable && !isFilterAvailable && (
                            <VStack
                                gap="4"
                                className={cls.optionOneActionBlock}
                            >
                                <HStack gap="4">
                                    {isSortAvailable && (
                                        <SortingIcon column={header.column} />
                                    )}
                                </HStack>
                            </VStack>
                        )}
                        {!isSortAvailable && isFilterAvailable && (
                            <VStack
                                gap="4"
                                className={cls.optionOneActionBlock}
                            >
                                {isFilterAvailable && (
                                    <TableFilter
                                        filterCategory={header.id}
                                        columnFilters={columnFilters}
                                        setColumnFilters={setColumnFilters}
                                        allOptions={
                                            headerOptionsMapping[header.id] ||
                                            []
                                        }
                                    />
                                )}
                            </VStack>
                        )}

                        {/* {withResizer && ( */}
                        {/*    <Box */}
                        {/*        onMouseDown={header.getResizeHandler()} */}
                        {/*        onTouchStart={header.getResizeHandler()} */}
                        {/*        className={classNames(cls.resizer, { */}
                        {/*            isResizing: header.column.getIsResizing(), */}
                        {/*        })} */}
                        {/*    /> */}
                        {/* )} */}
                    </Box>
                );
            })}
        </Box>
    );
};
