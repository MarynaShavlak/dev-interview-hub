import { useCallback } from 'react';
import { CommonFilterType } from '../../..';
import { FilterType } from '../../../model/types/tableTypes';

export const useStringOptionsFilterOperations = () => {
    const createNewFilter = useCallback(
        (filterCategory: string, option: string): FilterType => {
            return { id: filterCategory, value: [option] };
        },
        [],
    );
    const addNewFilter = useCallback(
        (
            prevFilters: CommonFilterType,
            filterCategory: string,
            option: string,
        ): CommonFilterType => {
            return [...prevFilters, createNewFilter(filterCategory, option)];
        },
        [createNewFilter],
    );

    const updateFilterValue = useCallback(
        (
            stringOptions: string[],
            option: string,
            isActive: boolean,
        ): string[] => {
            if (isActive) {
                return stringOptions.filter((o) => o !== option);
            }
            return [...stringOptions, option];
        },
        [],
    );

    const updateExistingFilter = useCallback(
        (
            prevFilters: CommonFilterType,
            filterCategory: string,
            option: string,
            isActive: boolean,
            stringOptions: string[],
        ): CommonFilterType => {
            return prevFilters.map((filter) => {
                if (filter.id === filterCategory) {
                    return {
                        ...filter,
                        value: updateFilterValue(
                            stringOptions,
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
