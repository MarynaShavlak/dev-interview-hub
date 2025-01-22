import { CellContext, Row } from '@tanstack/react-table';
import { capitalizeFirstLetter } from '@/shared/lib/text/capitalizeFirstLetter/capitalizeFirstLetter';

type StaticTextColumnConfig<T> = {
    id: string;
    size: number;
    sortable?: boolean;
    filterable?: boolean;
};

export const createStaticTextColumn = <T>() => {
    return ({
        id,
        size,
        sortable = false,
        filterable = false,
    }: StaticTextColumnConfig<T>) => ({
        id,
        header: capitalizeFirstLetter(id),
        cell: (props: CellContext<T, string | number | undefined>) =>
            `${props.getValue()}`,
        size,
        enableColumnFilter: filterable,
        enableSorting: sortable,
        filterFn: (row: Row<T>, columnId: string, filterCriteria: any) => {
            if (filterCriteria.length === 0) return true;
            return filterCriteria.includes(row.getValue(columnId));
        },
    });
};
