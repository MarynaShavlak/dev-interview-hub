import { CellContext, Row } from '@tanstack/react-table';
import { capitalizeFirstLetter } from '@/shared/lib/text/capitalizeFirstLetter/capitalizeFirstLetter';
import { OptionCell } from '../../../../ui/OptionCell/OptionCell';
import { ColorOption } from '../../../../model/types/tableTypes';

type OptionColumnConfig<T> = {
    id: string;
    size: number;
    sortable?: boolean;
    filterable?: boolean;
    options: (ColorOption | string)[];
};

export const createOptionColumn = <T>() => {
    return ({
        id,
        size,
        sortable = true,
        filterable = true,
        options,
    }: OptionColumnConfig<T>) => {
        console.log('options', options);
        return {
            id,
            header: capitalizeFirstLetter(id),
            cell: (props: CellContext<T, any>) =>
                OptionCell({
                    ...props,
                    options,
                }),
            size,
            enableColumnFilter: filterable,
            enableSorting: sortable,
            filterFn: (row: Row<T>, columnId: string, filterCriteria: any) => {
                if (filterCriteria.length === 0) return true;
                return filterCriteria.includes(row.getValue(columnId));
            },
        };
    };
};
