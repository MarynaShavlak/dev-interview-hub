import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import React, { memo } from 'react';
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
import { VStack } from '@/shared/ui/common/Stack';
import { useUsersFullInfoTableData } from '../../lib/hooks/useUsersFullInfoTableData/useUsersFullInfoTableData';
import { Each } from '@/shared/lib/components/Each/Each';

import { useManageUsersFullInfoTableRow } from '../../lib/hooks/useManageUsersFullInfoTableRow/useManageUsersFullInfoTableRow';
import { ConfirmDeleteModal } from '@/features/ConfirmDeleteModal';
import { LoadingTableSkeleton } from '../LoadingTableSkeleton/LoadingTableSkeleton';

interface UsersFullInfoTableProps {
    onDeleteUser: (userId: string) => Promise<string | null>;
}

export const UsersFullInfoTable = memo(
    ({ onDeleteUser }: UsersFullInfoTableProps) => {
        const { t } = useTranslation('admin');

        const {
            handleDeleteClick,
            handleEditClick,
            confirmDelete,
            selectedUser,
            isLoading,
            data,
            deleteUserModal,
        } = useManageUsersFullInfoTableRow(onDeleteUser);

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

        if (isLoading) {
            return <LoadingTableSkeleton />;
        }
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
                            render={(row) => (
                                <TableRow key={row.id} row={row} />
                            )}
                        />
                    </Box>
                    <TablePagination table={table} />
                </VStack>
                {deleteUserModal.isVisible && (
                    <ConfirmDeleteModal
                        isOpen={deleteUserModal.isVisible}
                        onCancel={deleteUserModal.hide}
                        text={`${t('користувача')} ${selectedUser?.username}`}
                        onConfirm={confirmDelete}
                    />
                )}
            </VStack>
        );
    },
);

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
