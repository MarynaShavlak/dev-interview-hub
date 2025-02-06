import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@/shared/ui/common/Box';

import cls from './UsersFullInfoTable.module.scss';
import {
    SearchInput,
    TableHeader,
    TablePagination,
    TableRow,
} from '@/features/Table';

import { UsersTableInfo } from '../../model/types/usersTableInfo';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { useUsersFullInfoTableData } from '../../lib/hooks/useUsersFullInfoTableData/useUsersFullInfoTableData';
import { Each } from '@/shared/lib/components/Each/Each';

import { useManageUsersFullInfoTableRow } from '../../lib/hooks/useManageUsersFullInfoTableRow/useManageUsersFullInfoTableRow';
import { LoadingTableSkeleton } from '../LoadingTableSkeleton/LoadingTableSkeleton';
import { Button } from '@/shared/ui/redesigned/Button';

export const UsersFullInfoTable = memo(() => {
    const { t } = useTranslation('admin');
    const [isEditRoleMode, setIsEditRoleMode] = useState(false);
    const toggleEditRoleMode = useCallback(() => {
        setIsEditRoleMode((prev) => !prev);
    }, []);

    const {
        handleEditClick,

        isLoading,
        data,
    } = useManageUsersFullInfoTableRow();

    const {
        columns,
        headerOptionsMapping,
        globalFilter,
        setGlobalFilter,
        columnFilters,
        setColumnFilters,
    } = useUsersFullInfoTableData({
        data,
        isEditRoleMode,
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
    const openEditRoleMode = useCallback(() => {
        console.log('openEditRoleMode');
    }, []);

    if (isLoading) {
        return <LoadingTableSkeleton />;
    }
    if (data.length === 0) {
        return null;
    }

    return (
        <VStack gap="16">
            <HStack justify="between" max>
                <SearchInput
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
                <Button
                    size="s"
                    onClick={toggleEditRoleMode}
                    className={cls.editRoleButton}
                    variant="save"
                >
                    {!isEditRoleMode
                        ? t('Редагувати ролі користувачів')
                        : t('Перейти в режим читання')}
                </Button>
            </HStack>

            <VStack gap="16" className={cls.tableWrap}>
                <Box
                    className={cls.table}
                    // width={`${table.getTotalSize() + 5}px`}
                >
                    <TableHeader<UsersTableInfo>
                        headerGroups={table.getHeaderGroups()}
                        setColumnFilters={setColumnFilters}
                        headerOptionsMapping={headerOptionsMapping}
                        columnFilters={columnFilters}
                        withResizer
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
