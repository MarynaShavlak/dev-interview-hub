import { Row } from '@tanstack/react-table';
import { capitalizeFirstLetter } from '@/shared/lib/text/capitalizeFirstLetter/capitalizeFirstLetter';
import { EditableCell } from '../../../../ui/EditableCell/EditableCell';

type EditableColumnConfig<T> = {
    id: string;
    size: number;
    sortable?: boolean;
    filterable?: boolean;
};

export const createEditableColumn = <T>() => {
    return ({
        id,
        size,
        sortable = true,
        filterable = true,
    }: EditableColumnConfig<T>) => ({
        id,
        header: capitalizeFirstLetter(id),
        cell: EditableCell,
        size,
        enableColumnFilter: filterable,
        enableSorting: sortable,
        filterFn: (row: Row<T>, columnId: string, filterCriteria: any) => {
            if (filterCriteria.length === 0) return true;
            return filterCriteria.includes(row.getValue(columnId));
        },
    });
};
