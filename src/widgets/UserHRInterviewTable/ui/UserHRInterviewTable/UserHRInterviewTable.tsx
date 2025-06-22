import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';
import { AddNewEntityButton } from '@/shared/ui/common/AddNewEntityButton';
import { ConfirmDeleteModal } from '@/shared/ui/common/ConfirmDeleteModal';
import { Box } from '@/shared/ui/common/Box';
import cls from './UserHRInterviewTable.module.scss';
import {
    TablePagination,
    TableHeader,
    TableRow,
    EmptyTableState,
} from '@/features/Table';
import { HStack, VStack } from '@/shared/ui/common/Stack';

import { useUserHRInterviewTableData } from '../../lib/hooks/useUserHRInterviewTableData/useUserHRInterviewTableData';
import { LoadingTableSkeleton } from '../LoadingTableSkeleton/LoadingTableSkeleton';

import { useManageUserHRInterviewTableRow } from '../../lib/hooks/useManageUserHRInterviewTableRow/useManageUserHRInterviewTableRow';
import { Each } from '@/shared/lib/components/Each/Each';
import { useUserHRInterviewTableConfig } from '../../lib/hooks/useUserHRInterviewTableConfig/useUserHRInterviewTableConfig';
import { toggleFeatures } from '@/shared/lib/features';
import { HRInterviewQA } from '@/entities/HRInterviewQA';
import { TableActionBar } from '../TableActionBar/TableActionBar';

interface UserHRInterviewTableProps {
    onDeleteArticle: (articleId: string) => Promise<string | null>;
}

export const UserHRInterviewTable = memo(
    ({ onDeleteArticle }: UserHRInterviewTableProps) => {
        const { t } = useTranslation('hrInterviewQA');

        const {
            handleDeleteClick,
            handleEditClick,
            confirmDelete,
            articleTitle,
            isLoading,
            data,
            deleteArticleModal,
        } = useManageUserHRInterviewTableRow(onDeleteArticle);

        const {
            columns,
            headerOptionsMapping,
            globalFilter,
            setGlobalFilter,
            columnFilters,
            setColumnFilters,
        } = useUserHRInterviewTableData({
            data: data || [],
            deleteRow: handleDeleteClick,
            editRow: handleEditClick,
        });

        const table = useUserHRInterviewTableConfig({
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
                <EmptyTableState
                    message={t(
                        'Не створено жодної відповіді на питання HR співбесіди',
                    )}
                >
                    <AddNewEntityButton entityType="hrInterviewQA" />
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
                <HStack justify="between" max>
                    <TableActionBar
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                    <AddNewEntityButton entityType="hrInterviewQA" />
                </HStack>

                {isFilteredEmpty ? (
                    <EmptyTableState
                        message={t('Не знайдено питань за Вашим запитом')}
                    />
                ) : (
                    <VStack
                        gap="16"
                        className={cls.tableWrap}
                        data-testid="table"
                    >
                        <Box className={tableClass}>
                            <TableHeader<HRInterviewQA>
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
                        text={`${t('питання')} ${articleTitle}`}
                        onConfirm={confirmDelete}
                    />
                )}
            </VStack>
        );
    },
);
