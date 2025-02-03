import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@/shared/ui/common/Box';

import cls from './UsersFullInfoTable.module.scss';
import {
    SearchInput,
    TableHeaderWithResizer,
    TablePagination,
} from '@/features/Table';

import { TableRow } from '../TableRow/TableRow';
import { Each } from '@/shared/lib/components/Each/Each';
import { useUsersTableData } from '../../lib/hooks/useUsersTableData';
import { UsersTableInfo } from '../../model/types/usersTableInfo';
import { VStack } from '@/shared/ui/common/Stack';
import { useUsersFullInfoTableData } from '../../lib/hooks/useUsersFullInfoTableData/useUsersFullInfoTableData';

export const UsersFullInfoTable = () => {
    const { t } = useTranslation('admin');
    const { users, isLoading } = useUsersTableData();
    // console.log('users', users);
    const [data, setData] = useState<UsersTableInfo[]>([]);
    // console.log('data', data);

    // const [columnFilters, setColumnFilters] = useState<CommonFilterType>([]);
    // const [globalFilter, setGlobalFilter] = useState<string>('');

    const handleDeleteClick = (index: string) => {
        console.log('index', index);
    };
    const handleEditClick = (index: string) => {
        console.log('index', index);
    };

    useEffect(() => {
        if (!isLoading && users.length !== data.length) {
            setData(users); // Update data only if users has changed
        }
    }, [users, isLoading, data.length]);

    // const updateData = useCallback(
    //     (rowIndex: number, columnId: string, value: any) => {
    //         console.log('update data');
    //         setData((prevData) =>
    //             prevData.map((row, index) =>
    //                 index === rowIndex ? { ...row, [columnId]: value } : row,
    //             ),
    //         );
    //         console.log('data after update: ', data);
    //     },
    //     [data],
    // );

    const {
        columns,
        headerOptionsMapping,
        globalFilter,
        setGlobalFilter,
        columnFilters,
        setColumnFilters,
    } = useUsersFullInfoTableData({
        data,
        deleteRow: handleDeleteClick,
        editRow: handleEditClick,
    });

    const table = useReactTable<UsersTableInfo>({
        data,
        columns,
        state: {
            columnFilters,
            globalFilter,
        },

        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        globalFilterFn: 'includesString',
        columnResizeMode: 'onChange',
        // meta: { updateData },
    });
    // const headerGroups =
    //     table.getHeaderGroups() as HeaderGroup<UsersTableInfo>[];

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
                                <TableHeaderWithResizer
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
};
