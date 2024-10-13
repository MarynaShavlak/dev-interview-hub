import { Popover } from '@/shared/ui/redesigned/Popups';
import cls from './FilterPopover.module.scss';
import { ColorOption } from '../ColorIndicatorOptionItem/ColorIndicatorOptionItem';
import {
    ColumnFilterHandlerProps,
    CommonFilterType,
} from '../../model/types/types';
import { FilterMenu } from './FilterMenu/FilterMenu';
import { FilterTrigger } from './FilterTrigger/FilterTrigger';

interface FilterPopoverProps extends ColumnFilterHandlerProps {
    filterCategory: string;
    columnFilters: CommonFilterType;
    allOptions: ColorOption[];
}

export const FilterPopover = (props: FilterPopoverProps) => {
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
            <FilterMenu
                allOptions={allOptions}
                filteredOptions={filteredOptions}
                setColumnFilters={setColumnFilters}
                filterCategory={filterCategory}
            />
        </Popover>
    );
};
