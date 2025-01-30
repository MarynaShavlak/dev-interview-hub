import { memo, useCallback, useEffect, useState } from 'react';
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Box } from '@/shared/ui/common/Box';
import cls from './UserArticlesTable.module.scss';
import { SearchInput } from '../SearchInput/SearchInput';
import { TablePagination } from '../TablePagination/TablePagination';
import { TableRow } from '../TableRow/TableRow';
import { Each } from '@/shared/lib/components/Each/Each';
import { TableHeader } from '../TableHeader/TableHeader';
import { useArticlesByUserData } from '../../lib/hooks/useArticlesByUserData/useArticlesByUserData';
import { VStack } from '@/shared/ui/common/Stack';
import { UserArticlesTableInfo } from '../../model/types/userArticlesTableInfo';
import { useTableData } from '../../lib/hooks/useTableData/useTableData';

export const UserArticlesTable = memo(() => {
    const { articles, isLoading } = useArticlesByUserData();
    console.log('___articles', articles);

    const [data, setData] = useState<UserArticlesTableInfo[]>([]);
    console.log('___data', data);

    useEffect(() => {
        if (!isLoading && articles.length !== data.length) {
            setData(articles);
        }
    }, [articles, isLoading, data.length, setData]);

    const updateData = useCallback(
        (rowIndex: number, columnId: string, value: any) => {
            console.log('update data');
            setData((prevData) =>
                prevData.map((row, index) =>
                    index === rowIndex ? { ...row, [columnId]: value } : row,
                ),
            );
            console.log('data after update: ', data);
        },
        [data],
    );

    const deleteRow = useCallback(
        (rowIndex: string) => {
            console.log('rowIndex', rowIndex);

            setData((prevData) =>
                prevData.filter((row, index) => row.id !== rowIndex),
            );
            console.log('data after update: ', data);
        },
        [data],
    );

    const {
        columns,
        headerOptionsMapping,
        globalFilter,
        setGlobalFilter,
        columnFilters,
        setColumnFilters,
    } = useTableData({ data, deleteRow });

    const table = useReactTable<UserArticlesTableInfo>({
        data,
        columns,
        state: {
            columnFilters,
            globalFilter,
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
    if (data.length === 0) {
        return null;
    }
    return (
        <VStack gap="16">
            <SearchInput
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
            />

            <VStack gap="16" className={cls.tableWrap}>
                <Box className={cls.table} width={table.getTotalSize()}>
                    <Each
                        of={table.getHeaderGroups()}
                        render={(headerGroup) => {
                            return (
                                <TableHeader
                                    key={headerGroup.id}
                                    headerGroup={headerGroup}
                                    setColumnFilters={setColumnFilters}
                                    headerOptionsMapping={headerOptionsMapping}
                                    columnFilters={columnFilters}
                                />
                            );
                        }}
                    />

                    <Each
                        of={table.getRowModel().rows}
                        render={(row) => <TableRow key={row.id} row={row} />}
                    />
                </Box>
                <TablePagination table={table} />
            </VStack>
        </VStack>
    );
});
