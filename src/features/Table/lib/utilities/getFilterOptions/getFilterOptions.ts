import { FilterStringMenuProps } from '../../../ui/TableHeader/TableHeaderCell/TableFilter/FilterMenuWithStringOptions/FilterMenuWithStringOptions';
import { ColorOption, CommonFilterType } from '../../../model/types/tableTypes';
import { FilterColorMenuProps } from '../../../ui/TableHeader/TableHeaderCell/TableFilter/FilterMenuWithColorOptions/FilterMenuWithColorOptions';

export const getFilterOptions = (
    filterCategory: string,
    columnFilters: CommonFilterType,
    allOptions: (ColorOption | string)[],
) => {
    const filteredOptions =
        columnFilters.find((f) => f.id === filterCategory)?.value ||
        ([] as string[]);

    const isFilterActive = filteredOptions.length > 0;
    const isStringOptions = allOptions.every(
        (option) => typeof option === 'string',
    );
    const isFilteredOptionsIsString = typeof filteredOptions === 'string';
    const allStringOptions: FilterStringMenuProps['allOptions'] =
        allOptions.filter(
            (option): option is string => typeof option === 'string',
        );
    const allColorOptions: FilterColorMenuProps['allOptions'] =
        allOptions.filter(
            (option): option is ColorOption => typeof option !== 'string',
        );
    const filteredStringOptions: FilterStringMenuProps['filteredOptions'] =
        isFilteredOptionsIsString
            ? filteredOptions
            : filteredOptions.filter(
                  (option): option is string => typeof option === 'string',
              );

    const filteredColorOptions: FilterColorMenuProps['filteredOptions'] =
        isFilteredOptionsIsString
            ? filteredOptions
            : filteredOptions.filter(
                  (option): option is ColorOption => typeof option !== 'string',
              );

    return {
        isFilterActive,
        isStringOptions,
        filteredStringOptions,
        filteredColorOptions,
        allStringOptions,
        allColorOptions,
    };
};
