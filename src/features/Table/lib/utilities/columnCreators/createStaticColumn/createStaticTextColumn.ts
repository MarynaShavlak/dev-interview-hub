import { CellContext, Row } from '@tanstack/react-table';
import { capitalizeFirstLetter } from '@/shared/lib/text/capitalizeFirstLetter/capitalizeFirstLetter';
import { truncateText } from '@/shared/lib/text/truncateText/truncateText';
import { LinkCell } from '../../../../ui/LinkCell/LinkCell';

type StaticTextColumnConfig<T> = {
    id: string;
    size: number;
    sortable?: boolean;
    filterable?: boolean;
    link?: boolean;
    navigateTo?: (id: string) => void;
};

export const createStaticTextColumn = <T extends { id: string }>(
    maxLength?: number,
) => {
    return ({
        id,
        size,
        sortable = false,
        filterable = false,
        link = false,
        navigateTo,
    }: StaticTextColumnConfig<T>) => ({
        id,
        header: capitalizeFirstLetter(id),
        cell: (props: CellContext<T, any>) => {
            const value = maxLength
                ? `${truncateText(String(props.getValue()), maxLength)}`
                : `${props.getValue()}`;
            if (!link || !navigateTo) return value;
            return LinkCell({
                ...props,
                navigateFn: navigateTo,
                value,
            });
        },
        size,
        enableColumnFilter: filterable,
        enableSorting: sortable,
        filterFn: (row: Row<T>, columnId: string, filterCriteria: any) => {
            if (filterCriteria.length === 0) return true;
            return filterCriteria.includes(row.getValue(columnId));
        },
    });
};
