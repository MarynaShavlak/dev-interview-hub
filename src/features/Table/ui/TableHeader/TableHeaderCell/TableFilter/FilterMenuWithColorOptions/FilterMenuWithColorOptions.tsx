import { VStack } from '@/shared/ui/common/Stack';
import { Each } from '@/shared/lib/components/Each/Each';

import { FilterItemWithIndicator } from '../FilterItemWithIndicator/FilterItemWithIndicator';
import {
    ColorOption,
    ColumnFilterHandlerProps,
} from '../../../../../model/types/tableTypes';

export interface FilterColorMenuProps extends ColumnFilterHandlerProps {
    allOptions: ColorOption[];
    filteredOptions: string | ColorOption[];
    filterCategory: string;
    className?: string;
}

export const FilterMenuWithColorOptions = ({
    allOptions,
    setColumnFilters,
    filteredOptions,
    filterCategory,
    className,
}: FilterColorMenuProps) => {
    const isFilteredArray = Array.isArray(filteredOptions);
    return (
        <VStack className={className}>
            <Each
                of={allOptions}
                render={(option) => {
                    const isActive = isFilteredArray
                        ? filteredOptions.includes(option)
                        : false;
                    return (
                        <FilterItemWithIndicator
                            option={option}
                            isActive={isActive}
                            setColumnFilters={setColumnFilters}
                            key={option.id}
                            filterCategory={filterCategory}
                        />
                    );
                }}
            />
        </VStack>
    );
};
