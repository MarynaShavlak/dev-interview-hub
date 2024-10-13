import { VStack } from '@/shared/ui/common/Stack';
import { Each } from '@/shared/lib/components/Each/Each';
import { ColumnFilterHandlerProps } from '../../../model/types/types';
import { ColorOption } from '../../ColorIndicatorOptionItem/ColorIndicatorOptionItem';
import { FilterItem } from '../FilterItem/FilterItem';

interface FilterMenuProps extends ColumnFilterHandlerProps {
    allOptions: ColorOption[];
    filteredOptions: string | string[];
    filterCategory: string;
}

export const FilterMenu = ({
    allOptions,
    setColumnFilters,
    filteredOptions,
    filterCategory,
}: FilterMenuProps) => {
    return (
        <VStack max>
            <Each
                of={allOptions}
                render={(option) => (
                    <FilterItem
                        option={option}
                        isActive={filteredOptions.includes(option.id)}
                        setColumnFilters={setColumnFilters}
                        key={option.id}
                        filterCategory={filterCategory}
                    />
                )}
            />
        </VStack>
    );
};
