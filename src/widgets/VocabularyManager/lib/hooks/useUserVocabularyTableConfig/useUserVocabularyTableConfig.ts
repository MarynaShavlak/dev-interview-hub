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
import { useUserVocabularyTableColumns } from '../useUserVocabularyTableColumns/useUserVocabularyTableColumns';
import { Vocabulary } from '@/entities/Vocabulary';

interface UseUserVocabularyTableConfigParams {
    data: Vocabulary[];
    columns: ReturnType<typeof useUserVocabularyTableColumns>;
    globalFilter: string;
    columnFilters: CommonFilterType;
    editRow: (
        rowIndex: number,
        newValue: string,
        columnId: keyof Vocabulary,
    ) => void;
}

export const useUserVocabularyTableConfig = (
    params: UseUserVocabularyTableConfigParams,
): Table<Vocabulary> => {
    const { data, columns, globalFilter, columnFilters, editRow } = params;

    const table = useReactTable<Vocabulary>({
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
        meta: {
            updateData: (
                rowIndex: number,
                value: string,
                columnId: keyof Vocabulary,
            ) => {
                editRow(rowIndex, value, columnId);
            },
        },
    });

    return table;
};
