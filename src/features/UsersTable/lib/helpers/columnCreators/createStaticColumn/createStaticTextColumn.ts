import { CellContext } from '@tanstack/react-table';
import { capitalizeFirstLetter } from '@/shared/lib/text/capitalizeFirstLetter/capitalizeFirstLetter';

type StaticTextColumnConfig<T> = {
    id: string;
    size: number;
    sortable?: boolean;
};

export const createStaticTextColumn = <T>() => {
    return ({ id, size, sortable = false }: StaticTextColumnConfig<T>) => ({
        id,
        header: capitalizeFirstLetter(id),
        cell: (props: CellContext<T, string | number | undefined>) =>
            `${props.getValue()}`,
        size,
        enableColumnFilter: false,
        enableSorting: sortable,
    });
};
