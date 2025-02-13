import { flexRender, HeaderGroup } from '@tanstack/react-table';

import React from 'react';
import { Box } from '@/shared/ui/common/Box';
import cls from './TableHeaderCell.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';

import {
    ColorOption,
    ColumnFilterHandlerProps,
    CommonFilterType,
} from '../../../model/types/tableTypes';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { toggleFeatures } from '@/shared/lib/features';
import { TableCellBar } from './TableCellBar/TableCellBar';

export interface TableHeaderCellProps<T> extends ColumnFilterHandlerProps {
    headerGroup: HeaderGroup<T>;
    columnFilters: CommonFilterType;
    headerOptionsMapping:
        | Record<string, string[]>
        | Record<string, (string | ColorOption)[]>;
    withResizer?: boolean;
}

export const TableHeaderCell = <T,>(props: TableHeaderCellProps<T>) => {
    const { headerGroup, withResizer = false, ...otherProps } = props;
    const additionalClasses = getFlexClasses({
        hStack: true,
        gap: '16',
        justify: 'center',
        align: 'center',
    });

    const resizerClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.resizerRedesigned,
        off: () => cls.resizereDeprecated,
    });

    const thClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.thRedesigned,
        off: () => cls.thDeprecated,
    });

    return (
        <Box className={cls.tr} key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
                const isSortAvailable = header.column.getCanSort();
                const isFilterAvailable = header.column.getCanFilter();
                return (
                    <Box
                        className={classNames(thClass, {}, [
                            cls.th,
                            ...additionalClasses,
                        ])}
                        key={header.id}
                        width={header.getSize()}
                    >
                        <span className={cls.headerTitle}>
                            {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                            )}
                        </span>
                        <TableCellBar
                            header={header}
                            isSortAvailable={isSortAvailable}
                            isFilterAvailable={isFilterAvailable}
                            {...otherProps}
                        />

                        {withResizer && (
                            <Box
                                onMouseDown={header.getResizeHandler()}
                                onTouchStart={header.getResizeHandler()}
                                className={classNames(
                                    resizerClass,
                                    {
                                        isResizing:
                                            header.column.getIsResizing(),
                                    },
                                    [cls.resizer],
                                )}
                            />
                        )}
                    </Box>
                );
            })}
        </Box>
    );
};
