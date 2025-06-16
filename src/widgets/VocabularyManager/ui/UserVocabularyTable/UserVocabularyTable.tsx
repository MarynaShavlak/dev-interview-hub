import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';
import { ConfirmDeleteModal } from '@/shared/ui/common/ConfirmDeleteModal';
import { Box } from '@/shared/ui/common/Box';
import cls from './UserVocabularyTable.module.scss';
import {
    TablePagination,
    TableHeader,
    TableRow,
    EmptyTableState,
} from '@/features/Table';
import { VStack } from '@/shared/ui/common/Stack';

import { LoadingTableSkeleton } from '../LoadingTableSkeleton/LoadingTableSkeleton';

import { Each } from '@/shared/lib/components/Each/Each';
import { TableActionBar } from '../TableActionBar/TableActionBar';
import { useUserVocabularyTableConfig } from '../../lib/hooks/useUserVocabularyTableConfig/useUserVocabularyTableConfig';
import { toggleFeatures } from '@/shared/lib/features';
import { Vocabulary } from '@/entities/Vocabulary';
import { useManageUserVocabularyTableRow } from '../../lib/hooks/useManageUserVocabularyTableRow/useManageUserVocabularyTableRow';
import { useUserVocabularyTableData } from '../../lib/hooks/useUserVocabularyTableData/useUserVocabularyTableData';
import { useFieldKey } from '../../lib/hooks/useFieldKey/useFieldKey';
import { updateVocabularyThunk } from '../../model/services/updateVocabularyThunk/updateVocabularyThunk';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface UserVocabularyTableProps {
    onDeleteVocabulary: (articleId: string) => Promise<string | null>;
}

export const UserVocabularyTable = memo(
    ({ onDeleteVocabulary }: UserVocabularyTableProps) => {
        const { t } = useTranslation('english');
        const { getFieldKey } = useFieldKey();
        const dispatch = useAppDispatch();
        const {
            handleDeleteClick,
            confirmDelete,
            articleTitle,
            isLoading,
            data,
            deleteArticleModal,
        } = useManageUserVocabularyTableRow(onDeleteVocabulary);

        const {
            columns,
            headerOptionsMapping,
            globalFilter,
            setGlobalFilter,
            columnFilters,
            setColumnFilters,
        } = useUserVocabularyTableData({
            data: data || [],
            deleteRow: handleDeleteClick,
        });

        const handleUpdateVocabulary = async (vocab: Vocabulary) => {
            try {
                const updated = await dispatch(
                    updateVocabularyThunk(vocab),
                ).unwrap();
                return updated;
            } catch (error) {
                console.error('Error updating vocabulary:', error);
                return null;
            }
        };

        const table = useUserVocabularyTableConfig({
            data: data || [],
            columns,
            globalFilter,
            columnFilters,
            editRow: (rowIndex, newValue, columnId) => {
                const edittedObj = data?.[rowIndex] as Vocabulary;
                const edittedField = getFieldKey(columnId);

                handleUpdateVocabulary({
                    ...edittedObj,
                    [edittedField]: newValue,
                });
            },
        });

        const isFilteredEmpty = table.getRowModel().rows.length === 0;

        if (isLoading) {
            return <LoadingTableSkeleton />;
        }
        if (data?.length === 0) {
            return <EmptyTableState message={t('Не додано жодної ідіоми')} />;
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
                        message={t('Не знайдено ідіом за Вашим запитом')}
                    />
                ) : (
                    <VStack
                        gap="16"
                        className={cls.tableWrap}
                        data-testid="table"
                    >
                        <Box className={tableClass}>
                            <TableHeader<Vocabulary>
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
                        text={`${t('ідіому')} ${articleTitle}`}
                        onConfirm={confirmDelete}
                    />
                )}
            </VStack>
        );
    },
);
