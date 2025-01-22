import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { useCallback, useState } from 'react';
import { CommonFilterType } from '../../../model/types/types';
import { UserArticlesTableInfo } from '../../../model/types/userArticlesTableInfo';
import { useTableColumns } from '../useTableColumns/useTableColumns';

export interface TableState {
    columnFilters: CommonFilterType;
    globalFilter: string;
    pagination: PaginationState;
    sorting: SortingState;
}

export const useTableState = () => {
    // const [tableState, setTableState] = useState<TableState>({
    //     columnFilters: [],
    //     globalFilter: '',
    //     pagination: { pageIndex: 0, pageSize: 20 },
    //     sorting: [],
    // });

    // const updateTableState = useCallback((newState: Partial<TableState>) => {
    //     setTableState((prev) => ({ ...prev, ...newState }));
    // }, []);

    // const [data, setData] = useState<UserArticlesTableInfo[]>([]);

    // const updateData = useCallback(
    //     (rowIndex: number, columnId: string, value: any) => {
    //         setData((prev) =>
    //             prev.map((row, index) =>
    //                 index === rowIndex ? { ...row, [columnId]: value } : row,
    //             ),
    //         );
    //     },
    //     [],
    // );

    const [data, setData] = useState<UserArticlesTableInfo[]>([]);
    const [columnFilters, setColumnFilters] = useState<CommonFilterType>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const columns = useTableColumns();

    const updateData = useCallback(
        (rowIndex: number, columnId: string, value: any) => {
            setData((prevData) =>
                prevData.map((row, index) =>
                    index === rowIndex ? { ...row, [columnId]: value } : row,
                ),
            );
        },
        [],
    );

    const tableState = useReactTable<UserArticlesTableInfo>({
        data,
        columns,
        state: {
            // columnFilters,
            // globalFilter,
            columnFilters: [],
            globalFilter: '',
        },
        initialState: {
            pagination: {
                pageSize: 20,
            },
        },

        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        globalFilterFn: 'includesString',
        columnResizeMode: 'onChange',
        meta: { updateData },
    });

    return {
        tableState,
        // updateTableState,
        data,
        setData,
        updateData,
        globalFilter,
        setGlobalFilter,
        columnFilters,
        setColumnFilters,
    };
};
