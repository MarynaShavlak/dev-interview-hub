import { VStack } from '@/shared/ui/common/Stack';
import { Each } from '@/shared/lib/components/Each/Each';
import { ColumnFilterHandlerProps } from '../../../../../model/types/tableTypes';
import { FilterItemWithCheckIcon } from '../FilterItemWthCheckIcon/FilterItemWithCheckIcon';

export interface FilterStringMenuProps extends ColumnFilterHandlerProps {
    allOptions: string[];
    filteredOptions: string | string[];
    filterCategory: string;
    className?: string;
}

export const FilterMenuWithStringOptions = ({
    allOptions,
    setColumnFilters,
    filteredOptions,
    filterCategory,
    className,
}: FilterStringMenuProps) => {
    return (
        <VStack className={className}>
            <Each
                of={allOptions}
                render={(option) => {
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
