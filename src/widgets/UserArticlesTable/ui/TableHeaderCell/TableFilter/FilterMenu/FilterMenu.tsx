import { VStack } from '@/shared/ui/common/Stack';
import { Each } from '@/shared/lib/components/Each/Each';
import { ColumnFilterHandlerProps } from '../../../../model/types/types';
import { FilterItemWithCheckIcon } from '../FilterItemWthCheckIcon/FilterItemWithCheckIcon';

interface FilterMenuProps extends ColumnFilterHandlerProps {
    allOptions: string[];
    filteredOptions: string | string[];
    filterCategory: string;
    className?: string;
}

export const FilterMenu = ({
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
