import React from 'react';
import { Popover as PopoverRedesigned } from '@/shared/ui/redesigned/Popups';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import cls from './TableFilter.module.scss';

import { FilterMenuWithColorOptions } from './FilterMenuWithColorOptions/FilterMenuWithColorOptions';
import { FilterTrigger } from './FilterTrigger/FilterTrigger';
import {
    ColorOption,
    ColumnFilterHandlerProps,
    CommonFilterType,
} from '../../../../model/types/tableTypes';
import { FilterMenuWithStringOptions } from './FilterMenuWithStringOptions/FilterMenuWithStringOptions';
import { getFilterOptions } from '../../../../lib/utilities/getFilterOptions/getFilterOptions';

import { toggleFeatures } from '@/shared/lib/features';

export interface FilterPopoverProps extends ColumnFilterHandlerProps {
    filterCategory: string;
    columnFilters: CommonFilterType;
    allOptions: (ColorOption | string)[];
}

export const TableFilter = (props: FilterPopoverProps) => {
    const { columnFilters, setColumnFilters, filterCategory, allOptions } =
        props;

    const {
        isFilterActive,
        filteredStringOptions,
        filteredColorOptions,
        allStringOptions,
        allColorOptions,
        isStringOptions,
    } = getFilterOptions(filterCategory, columnFilters, allOptions);

    const Popover = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => PopoverRedesigned,
        off: () => PopoverDeprecated,
    });

    return (
        <Popover
            direction="bottom left"
            trigger={<FilterTrigger isFilterActive={isFilterActive} />}
            noPadding
            className={cls.filterPopover}
        >
            {isStringOptions && (
                <FilterMenuWithStringOptions
                    className={cls.filterMenu}
                    allOptions={allStringOptions}
                    filteredOptions={filteredStringOptions}
                    setColumnFilters={setColumnFilters}
                    filterCategory={filterCategory}
                />
            )}
            {!isStringOptions && (
                <FilterMenuWithColorOptions
                    className={cls.filterMenu}
                    allOptions={allColorOptions}
                    filteredOptions={filteredColorOptions}
                    setColumnFilters={setColumnFilters}
                    filterCategory={filterCategory}
                />
            )}
        </Popover>
    );
};
