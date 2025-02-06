import { useCallback } from 'react';
import { ColorOption, CommonFilterType } from '../../..';
import { FilterType } from '../../../model/types/tableTypes';

export const useFilterOperations = () => {
    const createNewFilter = useCallback(
        (filterCategory: string, option: ColorOption): FilterType => {
            return { id: filterCategory, value: [option] };
        },
        [],
    );
    const addNewFilter = useCallback(
        (
            prevFilters: CommonFilterType,
            filterCategory: string,
            option: ColorOption,
        ): CommonFilterType => {
            return [...prevFilters, createNewFilter(filterCategory, option)];
        },
        [],
    );

    const updateFilterValue = useCallback(
        (
            colorOptions: ColorOption[],
            option: ColorOption,
            isActive: boolean,
        ): ColorOption[] => {
            if (isActive) {
                return colorOptions.filter((o) => o.id !== option.id);
            }
            return [...colorOptions, option];
        },
        [],
    );

    const updateExistingFilter = useCallback(
        (
            prevFilters: CommonFilterType,
            filterCategory: string,
            option: ColorOption,
            isActive: boolean,
            colorOptions: ColorOption[],
        ): CommonFilterType => {
            return prevFilters.map((filter) => {
                if (filter.id === filterCategory) {
                    return {
                        ...filter,
                        value: updateFilterValue(
                            colorOptions,
                            option,
                            isActive,
                        ),
                    };
                }
                return filter;
            });
        },
        [updateFilterValue],
    );
    return { addNewFilter, updateExistingFilter };
};
