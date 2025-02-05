import { CellContext, Row } from '@tanstack/react-table';
import { capitalizeFirstLetter } from '@/shared/lib/text/capitalizeFirstLetter/capitalizeFirstLetter';
import { truncateText } from '@/shared/lib/text/truncateText/truncateText';

type StaticTextColumnConfig<T> = {
    id: string;
    size: number;
    sortable?: boolean;
    filterable?: boolean;
};

export const createStaticTextColumn = <T>(maxLength?: number) => {
    return ({
        id,
        size,
        sortable = false,
        filterable = false,
    }: StaticTextColumnConfig<T>) => ({
        id,
        header: capitalizeFirstLetter(id),
        cell: (props: CellContext<T, string | number | undefined>) =>
            maxLength
                ? `${truncateText(String(props.getValue()), maxLength)}`
                : `${props.getValue()}`,
        size,
        enableColumnFilter: filterable,
        enableSorting: sortable,
        filterFn: (row: Row<T>, columnId: string, filterCriteria: any) => {
            if (filterCriteria.length === 0) return true;
            return filterCriteria.includes(row.getValue(columnId));
        },
    });
};
