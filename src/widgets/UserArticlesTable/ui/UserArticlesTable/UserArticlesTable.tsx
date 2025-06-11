import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';
import { AddNewEntityButton } from '@/shared/ui/common/AddNewEntityButton';
import { ConfirmDeleteModal } from '@/shared/ui/common/ConfirmDeleteModal';
import { Box } from '@/shared/ui/common/Box';
import cls from './UserArticlesTable.module.scss';
import {
    TablePagination,
    TableHeader,
    TableRow,
    EmptyTableState,
} from '@/features/Table';
import { VStack } from '@/shared/ui/common/Stack';
import { UserArticlesTableInfo } from '../../model/types/userArticlesTableInfo';
import { useUserArticlesTableData } from '../../lib/hooks/useUserArticlesTableData/useUserArticlesTableData';
import { LoadingTableSkeleton } from '../LoadingTableSkeleton/LoadingTableSkeleton';

import { useManageUserArticlesTableRow } from '../../lib/hooks/useManageUserArticlesTableRow/useManageUserArticlesTableRow';
import { Each } from '@/shared/lib/components/Each/Each';
import { TableActionBar } from '../TableActionBar/TableActionBar';
import { useUserArticlesTableConfig } from '../../lib/hooks/useUserArticlesTableConfig/useUserArticlesTableConfig';
import { toggleFeatures } from '@/shared/lib/features';

interface UserArticlesTableProps {
    onDeleteArticle: (articleId: string) => Promise<string | null>;
}

export const UserArticlesTable = memo(
    ({ onDeleteArticle }: UserArticlesTableProps) => {
        const { t } = useTranslation('articleDetails');

        const {
            handleDeleteClick,
            handleEditClick,
            handleNavigateToArticle,
            confirmDelete,
            articleTitle,
            isLoading,
            data,
            deleteArticleModal,
        } = useManageUserArticlesTableRow(onDeleteArticle);

        const {
            columns,
            headerOptionsMapping,
            globalFilter,
            setGlobalFilter,
            columnFilters,
            setColumnFilters,
        } = useUserArticlesTableData({
            data: data || [],
            deleteRow: handleDeleteClick,
            editRow: handleEditClick,
            navigateToArticle: handleNavigateToArticle,
        });

        const table = useUserArticlesTableConfig({
            data: data || [],
            columns,
            globalFilter,
            columnFilters,
        });

        const isFilteredEmpty = table.getRowModel().rows.length === 0;

        if (isLoading) {
            return <LoadingTableSkeleton />;
        }
        if (data?.length === 0) {
            return (
                <EmptyTableState message={t('Не створено жодної статті')}>
                    <AddNewEntityButton entityType="article" />
                </EmptyTableState>
            );
        }

        const tableClass = toggleFeatures({
            name: 'isAppRedesigned',
            on: () => cls.tableRedesigned,
            off: () => cls.tableDeprecated,
        });

        return (
            <VStack gap="24" max>
                <TableActionBar
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
                {isFilteredEmpty ? (
                    <EmptyTableState
                        message={t('Не знайдено статей за Вашим запитом')}
                    />
                ) : (
                    <VStack
                        gap="16"
                        className={cls.tableWrap}
                        data-testid="table"
                    >
                        <Box className={tableClass}>
                            <TableHeader<UserArticlesTableInfo>
                                headerGroups={table.getHeaderGroups()}
                                setColumnFilters={setColumnFilters}
                                headerOptionsMapping={headerOptionsMapping}
                                columnFilters={columnFilters}
                                withResizer={false}
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
                )}

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
