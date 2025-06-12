import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    Table,
    useReactTable,
} from '@tanstack/react-table';
import { CommonFilterType } from '@/features/Table';

import { DEFAULT_PAGE_SIZE } from '../../../model/consts/pagination';
import { useUserHRInterviewTableColumns } from '../useUserHRInterviewTableColumns/useUserHRInterviewTableColumns';
import { HRInterviewQA } from '@/entities/HRInterviewQA';

interface UseUserHRInterviewTableConfigParams {
    data: HRInterviewQA[];
    columns: ReturnType<typeof useUserHRInterviewTableColumns>;
    globalFilter: string;
    columnFilters: CommonFilterType;
}

export const useUserHRInterviewTableConfig = (
    params: UseUserHRInterviewTableConfigParams,
): Table<HRInterviewQA> => {
    const { data, columns, globalFilter, columnFilters } = params;
    const table = useReactTable<HRInterviewQA>({
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
