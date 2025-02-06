import { useCallback } from 'react';
import { VStack } from '@/shared/ui/common/Stack';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './FilterItemWithIndicator.module.scss';
import {
    ColorOption,
    ColumnFilterHandlerProps,
} from '../../../../../model/types/tableTypes';
import { ColorIndicatorOptionItem } from '../../../../ColorIndicatorOptionItem/ColorIndicatorOptionItem';
import { getColorOptions } from '../../../../../lib/utilities/getColorOptions/getColorOptions';
import { useColorOptionsFilterOperations } from '../../../../../lib/hooks/useColorOptionsFilterOperations/useColorOptionsFilterOperations';

interface FilterItemProps extends ColumnFilterHandlerProps {
    option: ColorOption;
    isActive: boolean;
    filterCategory: string;
}

export const FilterItemWithIndicator = (props: FilterItemProps) => {
    const { option, setColumnFilters, isActive, filterCategory } = props;
    const { addNewFilter, updateExistingFilter } =
        useColorOptionsFilterOperations();

    const onClickHandler = useCallback(
        () =>
            setColumnFilters((prev) => {
                const existingFilter = prev.find(
                    (filter) => filter.id === filterCategory,
                );

                const options = existingFilter?.value;
                const colorOptions = getColorOptions(options);

                if (!colorOptions) {
                    return addNewFilter(prev, filterCategory, option);
                }
                return updateExistingFilter(
                    prev,
                    filterCategory,
                    option,
                    isActive ?? false,
                    colorOptions,
                );
            }),
        [
            addNewFilter,
            filterCategory,
            isActive,
            option,
            setColumnFilters,
            updateExistingFilter,
        ],
    );
    return (
        <VStack
            max
            className={classNames(
                cls.filterItem,
                { [cls.active]: isActive },
                [],
            )}
            onClick={onClickHandler}
        >
            <ColorIndicatorOptionItem option={option} />
        </VStack>
    );
};
