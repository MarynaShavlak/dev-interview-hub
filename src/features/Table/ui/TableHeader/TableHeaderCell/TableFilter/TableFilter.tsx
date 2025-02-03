import { Popover } from '@/shared/ui/redesigned/Popups';
import cls from './FilterPopover.module.scss';

import { FilterMenuWithColorOptions } from './FilterMenuWithColorOptions/FilterMenuWithColorOptions';
import { FilterTrigger } from './FilterTrigger/FilterTrigger';
import {
    ColorOption,
    ColumnFilterHandlerProps,
    CommonFilterType,
} from '../../../../model/types/tableTypes';

interface FilterPopoverProps extends ColumnFilterHandlerProps {
    filterCategory: string;
    columnFilters: CommonFilterType;
    allOptions: (ColorOption | string)[];
}

export const TableFilter = (props: FilterPopoverProps) => {
    const { columnFilters, setColumnFilters, filterCategory, allOptions } =
        props;
    const filteredOptions =
        columnFilters.find((f) => f.id === filterCategory)?.value ||
        ([] as string[]);

    const isFilterActive = filteredOptions.length > 0;
    return (
        <Popover
            direction="bottom left"
            trigger={<FilterTrigger isFilterActive={isFilterActive} />}
            noPadding
            className={cls.filterPopover}
        >
            <FilterMenuWithColorOptions
                className={cls.filterMenu}
                allOptions={allOptions}
                filteredOptions={filteredOptions}
                setColumnFilters={setColumnFilters}
                filterCategory={filterCategory}
            />
        </Popover>
    );
};
