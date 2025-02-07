import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    Table,
    useReactTable,
} from '@tanstack/react-table';
import { CommonFilterType } from '@/features/Table';
import { UserArticlesTableInfo } from '../../../model/types/userArticlesTableInfo';
import { DEFAULT_PAGE_SIZE } from '../../../model/consts/pagination';
import { useTableColumns } from '../useTableColumns/useTableColumns';

interface UseUserArticlesTableConfigParams {
    data: UserArticlesTableInfo[];
    columns: ReturnType<typeof useTableColumns>;
    globalFilter: string;
    columnFilters: CommonFilterType;
}

export const useUserArticlesTableConfig = (
    params: UseUserArticlesTableConfigParams,
): Table<UserArticlesTableInfo> => {
    const { data, columns, globalFilter, columnFilters } = params;
    const table = useReactTable<UserArticlesTableInfo>({
        data,
        columns,
        state: {
            columnFilters,
            globalFilter,
        },
        initialState: {
            pagination: {
                pageSize: DEFAULT_PAGE_SIZE,
            },
        },

        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        globalFilterFn: 'includesString',
        columnResizeMode: 'onChange',
    });

    return table;
};
