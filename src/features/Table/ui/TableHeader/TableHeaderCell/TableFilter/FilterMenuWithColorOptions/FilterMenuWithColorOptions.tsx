import { VStack } from '@/shared/ui/common/Stack';
import { Each } from '@/shared/lib/components/Each/Each';

import { FilterItemWithIndicator } from '../FilterItemWithIndicator/FilterItemWithIndicator';
import { FilterItemWithCheckIcon } from '../FilterItemWthCheckIcon/FilterItemWithCheckIcon';
import {
    ColorOption,
    ColumnFilterHandlerProps,
} from '../../../../../model/types/tableTypes';

interface FilterMenuProps extends ColumnFilterHandlerProps {
    allOptions: (ColorOption | string)[];
    filteredOptions: string | string[];
    filterCategory: string;
    className?: string;
}

export const FilterMenuWithColorOptions = ({
    allOptions,
    setColumnFilters,
    filteredOptions,
    filterCategory,
    className,
}: FilterMenuProps) => {
    return (
        <VStack className={className}>
            <Each
                of={allOptions}
                render={(option) => {
                    if (typeof option === 'object') {
                        return (
                            <FilterItemWithIndicator
                                option={option}
                                isActive={filteredOptions.includes(option.id)}
                                setColumnFilters={setColumnFilters}
                                key={option.id}
                                filterCategory={filterCategory}
                            />
                        );
                    }
                    return (
                        <FilterItemWithCheckIcon
                            option={option}
                            isActive={filteredOptions.includes(option)}
                            setColumnFilters={setColumnFilters}
                            key={option}
                            filterCategory={filterCategory}
                        />
                    );
                }}
            />
        </VStack>
    );
};
