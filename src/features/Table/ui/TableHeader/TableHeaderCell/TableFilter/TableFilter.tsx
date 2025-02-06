import { Popover } from '@/shared/ui/redesigned/Popups';
import cls from './FilterPopover.module.scss';

import { FilterMenuWithColorOptions } from './FilterMenuWithColorOptions/FilterMenuWithColorOptions';
import { FilterTrigger } from './FilterTrigger/FilterTrigger';
import {
    ColorOption,
    ColumnFilterHandlerProps,
    CommonFilterType,
} from '../../../../model/types/tableTypes';
import { FilterMenuWithStringOptions } from './FilterMenuWithStringOptions/FilterMenuWithStringOptions';
import { getFilterOptions } from '../../../../lib/utilities/getFilterOptions/getFilterOptions';

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
