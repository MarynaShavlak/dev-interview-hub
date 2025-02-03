import React, { memo } from 'react';
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    HeaderGroup,
    useReactTable,
} from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { Box } from '@/shared/ui/common/Box';
import cls from './UserArticlesTable.module.scss';
import { TablePagination, TableHeaderNoResizer } from '@/features/Table';
import { VStack } from '@/shared/ui/common/Stack';
import { UserArticlesTableInfo } from '../../model/types/userArticlesTableInfo';
import { useUserArticlesTableData } from '../../lib/hooks/useUserArticlesTableData/useUserArticlesTableData';
import { ConfirmDeleteModal } from '@/features/ConfirmDeleteModal';
import { LoadingTableSkeleton } from '../LoadingTableSkeleton/LoadingTableSkeleton';
import { EmptyTableState } from '../EmptyTableState/EmptyTableState';
import { TableActionBar } from '../TableActionBar/TableActionBar';

import { TableBody } from '../TableBody/TableBody';
import { useManageTableRow } from '../../lib/hooks/useManageTableRow/useManageTableRow';
import { DEFAULT_PAGE_SIZE } from '../../model/consts/pagination';

interface UserArticlesTableProps {
    onDeleteArticle: (articleId: string) => Promise<string | null>;
}

export const UserArticlesTable = memo(
    ({ onDeleteArticle }: UserArticlesTableProps) => {
        const { t } = useTranslation('articleDetails');

        const {
            handleDeleteClick,
            handleEditClick,
            confirmDelete,
            articleTitle,
            isLoading,
            data,
            deleteArticleModal,
        } = useManageTableRow(onDeleteArticle);

        const {
            columns,
            headerOptionsMapping,
            globalFilter,
            setGlobalFilter,
            columnFilters,
            setColumnFilters,
        } = useUserArticlesTableData({
            data,
            deleteRow: handleDeleteClick,
            editRow: handleEditClick,
        });

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

        if (isLoading) {
            return <LoadingTableSkeleton />;
        }
        if (data.length === 0) {
            return <EmptyTableState />;
        }
        const headerGroups =
            table.getHeaderGroups() as HeaderGroup<UserArticlesTableInfo>[];

        return (
            <VStack gap="16" max>
                <TableActionBar
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />

                <VStack gap="16" className={cls.tableWrap} data-testid="table">
                    <Box className={cls.table} width={table.getTotalSize()}>
                        <TableHeaderNoResizer
                            headerGroups={headerGroups}
                            setColumnFilters={setColumnFilters}
                            headerOptionsMapping={headerOptionsMapping}
                            columnFilters={columnFilters}
                        />
                        <TableBody rows={table.getRowModel().rows} />
                    </Box>
                    <TablePagination table={table} />
                </VStack>
                {deleteArticleModal.isVisible && (
                    <ConfirmDeleteModal
                        isOpen={deleteArticleModal.isVisible}
                        onCancel={deleteArticleModal.hide}
                        text={`${t('статтю')} ${articleTitle}`}
                        onConfirm={confirmDelete}
                    />
                )}
            </VStack>
        );
    },
);
