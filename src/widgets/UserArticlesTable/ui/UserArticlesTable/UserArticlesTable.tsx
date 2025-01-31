import React, { memo, useCallback, useEffect, useState } from 'react';
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { Box } from '@/shared/ui/common/Box';
import cls from './UserArticlesTable.module.scss';
import { TablePagination } from '../TablePagination/TablePagination';
import { TableRow } from '../TableRow/TableRow';
import { Each } from '@/shared/lib/components/Each/Each';
import { useArticlesByUserData } from '../../lib/hooks/useArticlesByUserData/useArticlesByUserData';
import { VStack } from '@/shared/ui/common/Stack';
import { UserArticlesTableInfo } from '../../model/types/userArticlesTableInfo';
import { useTableData } from '../../lib/hooks/useTableData/useTableData';
import { useArticleNavigation } from '@/entities/Article';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { ConfirmDeleteModal } from '@/features/ConfirmDeleteModal';
import { LoadingTableSkeleton } from '../LoadingTableSkeleton/LoadingTableSkeleton';
import { EmptyTableState } from '../EmptyTableState/EmptyTableState';
import { TableActionBar } from '../TableActionBar/TableActionBar';
import { TableHeader } from '../TableHeader/TableHeader';

interface UserArticlesTableProps {
    onDeleteArticle: (articleId: string) => Promise<string | null>;
}

export const UserArticlesTable = memo(
    ({ onDeleteArticle }: UserArticlesTableProps) => {
        const { articles, isLoading } = useArticlesByUserData();

        const { t } = useTranslation('articleDetails');
        const [data, setData] = useState<UserArticlesTableInfo[]>([]);
        const { navigateToArticle } = useArticleNavigation();

        const [selectedArticle, setSelectedArticle] = useState<{
            id: string;
            title: string;
        } | null>(null);

        useEffect(() => {
            if (!isLoading && articles.length !== data.length) {
                setData(articles);
            }
        }, [articles, isLoading, data.length, setData]);

        const deleteArticleModal = useToggleVisibility();

        const deleteTableRow = useCallback(
            async (articleId: string) => {
                if (!articleId) {
                    console.error(
                        'Article ID is required to delete the article.',
                    );
                    return null;
                }

                try {
                    const deletedArticleId = await onDeleteArticle(articleId);
                    setData((prevData) =>
                        prevData.filter((row, index) => row.id !== articleId),
                    );

                    return deletedArticleId;
                } catch (error: any) {
                    console.error('Error deleting article:', error);

                    return null;
                }
            },
            [onDeleteArticle],
        );

        // const handleDeleteConfirm = useCallback(async (): Promise<void> => {
        //     if (selectedArticleId) {
        //         await deleteTableRow(selectedArticleId);
        //         deleteArticleModal.hide();
        //         setSelectedArticleId(null);
        //         setSelectedArticleTitle('');
        //     }
        // }, [selectedArticleId, deleteTableRow, deleteArticleModal]);

        const handleDeleteConfirm = useCallback(async () => {
            if (selectedArticle) {
                await deleteTableRow(selectedArticle.id);
                deleteArticleModal.hide();
                setSelectedArticle(null);
            }
        }, [selectedArticle, deleteTableRow, deleteArticleModal]);

        const handleDeleteClick = useCallback(
            (articleId: string) => {
                const article = data.find((item) => item.id === articleId);
                if (article) {
                    setSelectedArticle({
                        id: articleId,
                        title: article?.title || '',
                    });
                }

                // setSelectedArticleId(articleId);
                // setSelectedArticleTitle(article?.title || '');
                deleteArticleModal.show();
            },
            [data, deleteArticleModal],
        );

        const handleEditClick = useCallback(
            (articleId: string) => {
                if (articleId) {
                    navigateToArticle(articleId);
                }
            },
            [navigateToArticle],
        );

        const {
            columns,
            headerOptionsMapping,
            globalFilter,
            setGlobalFilter,
            columnFilters,
            setColumnFilters,
        } = useTableData({
            data,
            deleteRow: handleDeleteClick,
            editRow: handleEditClick,
        });

        const modalText = selectedArticle?.title
            ? `"${selectedArticle.title}"`
            : '';

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
            // meta: { updateData },
        });

        if (isLoading) {
            return <LoadingTableSkeleton />;
        }
        if (data.length === 0) {
            return <EmptyTableState />;
        }

        return (
            <VStack gap="16" max>
                <TableActionBar
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />

                <VStack gap="16" className={cls.tableWrap} data-testid="table">
                    <Box className={cls.table} width={table.getTotalSize()}>
                        <TableHeader
                            headerGroups={table.getHeaderGroups()}
                            setColumnFilters={setColumnFilters}
                            headerOptionsMapping={headerOptionsMapping}
                            columnFilters={columnFilters}
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
                {deleteArticleModal.isVisible && (
                    <ConfirmDeleteModal
                        isOpen={deleteArticleModal.isVisible}
                        onCancel={deleteArticleModal.hide}
                        text={`${t('статтю')} ${modalText}`}
                        onConfirm={handleDeleteConfirm}
                    />
                )}
            </VStack>
        );
    },
);
