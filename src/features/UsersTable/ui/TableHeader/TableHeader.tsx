import { HeaderGroup, flexRender } from '@tanstack/react-table';

import { Box } from '@/shared/ui/common/Box';
import cls from './TableHeader.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { SortingIcon } from '../SortingIcon/SortingIcon';
import { FilterPopover } from '../FilterPopover/FilterPopover';
import {
    ColumnFilterHandlerProps,
    CommonFilterType,
} from '../../model/types/types';
import { ColorOption } from '../ColorIndicatorOptionItem/ColorIndicatorOptionItem';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';

interface TableHeaderProps<T> extends ColumnFilterHandlerProps {
    headerGroup: HeaderGroup<T>;
    columnFilters: CommonFilterType;
    allOptions: ColorOption[];
}

export const TableHeader = <T,>(props: TableHeaderProps<T>) => {
    const { headerGroup, setColumnFilters, columnFilters, allOptions } = props;
    const additionalClasses = getFlexClasses({
        hStack: true,
        gap: '4',
        justify: 'center',
        align: 'center',
    });
    return (
        <Box className={cls.tr} key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
                <Box
                    className={classNames(cls.th, {}, [...additionalClasses])}
                    key={header.id}
                    width={header.getSize()}
                >
                    {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                    )}
                    <SortingIcon column={header.column} />
                    <FilterPopover
                        filterCategory={header.id}
                        columnFilters={columnFilters}
                        setColumnFilters={setColumnFilters}
                        allOptions={allOptions}
                    />
                    <Box
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={classNames(cls.resizer, {
                            isResizing: header.column.getIsResizing(),
                        })}
                    />
                </Box>
            ))}
        </Box>
    );
};
