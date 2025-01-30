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
import { SearchInput } from '../SearchInput/SearchInput';
import { TablePagination } from '../TablePagination/TablePagination';
import { TableRow } from '../TableRow/TableRow';
import { Each } from '@/shared/lib/components/Each/Each';
import { TableHeader } from '../TableHeader/TableHeader';
import { useArticlesByUserData } from '../../lib/hooks/useArticlesByUserData/useArticlesByUserData';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { UserArticlesTableInfo } from '../../model/types/userArticlesTableInfo';
import { useTableData } from '../../lib/hooks/useTableData/useTableData';
import { deleteArticleThunk, useArticleNavigation } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { searchClient } from '@/shared/config/firebase/searchClient';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { ConfirmDeleteModal } from '@/features/ConfirmDeleteModal';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArticleCreateNavigationButton } from '@/features/ArticleCreateNavigationButton';

export const UserArticlesTable = memo(() => {
    const { articles, isLoading } = useArticlesByUserData();
    const dispatch = useAppDispatch();
    const { t } = useTranslation('articleDetails');
    const [data, setData] = useState<UserArticlesTableInfo[]>([]);
    const { navigateToArticle } = useArticleNavigation();
    const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
        null,
    );
    const [selectedArticleTitle, setSelectedArticleTitle] =
        useState<string>('');

    useEffect(() => {
        if (!isLoading && articles.length !== data.length) {
            setData(articles);
        }
    }, [articles, isLoading, data.length, setData]);

    const deleteArticleModal = useToggleVisibility();

    const deleteRow = useCallback(
        async (articleId: string) => {
            if (!articleId) {
                console.error('Article ID is required to delete the article.');
                return null;
            }
            console.log('articleIdx', articleId);
            try {
                const deletedArticleId = await dispatch(
                    deleteArticleThunk(articleId),
                ).unwrap();
                await searchClient.clearCache();
                setData((prevData) =>
                    prevData.filter((row, index) => row.id !== articleId),
                );
                console.log('data after update: ', data);
                return deletedArticleId;
            } catch (error: any) {
                console.error('Error deleting article:', error);

                return null;
            }
        },
        [data, dispatch],
    );

    const handleDeleteConfirm = useCallback(async (): Promise<void> => {
        if (selectedArticleId) {
            await deleteRow(selectedArticleId);
            deleteArticleModal.hide();
            setSelectedArticleId(null);
            setSelectedArticleTitle('');
        }
    }, [selectedArticleId, deleteRow, deleteArticleModal]);

    const handleDeleteClick = useCallback(
        (articleId: string) => {
            const article = data.find((item) => item.id === articleId);

            setSelectedArticleId(articleId);
            setSelectedArticleTitle(article?.title || '');
            deleteArticleModal.show();
        },
        [data, deleteArticleModal],
    );

    const handleEditClick = useCallback(
        (articleId: string) => {
            console.log('articleId', articleId);
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
    const modalText = `${selectedArticleTitle}`
        ? `"${selectedArticleTitle}"`
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
    const noArticlesText = t('Не створено жодної статті');
    if (data.length === 0) {
        return (
            <VStack gap="16" max align="center">
                <Text text={noArticlesText} />
                <ArticleCreateNavigationButton />
            </VStack>
        );
    }
    return (
        <VStack gap="16" max>
            <HStack justify="between" max>
                <SearchInput
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
                <ArticleCreateNavigationButton />
            </HStack>

            <VStack gap="16" className={cls.tableWrap} data-testid="table">
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
            {deleteArticleModal.isVisible && (
                <ConfirmDeleteModal
                    isOpen={deleteArticleModal.isVisible}
                    onCancel={deleteArticleModal.hide}
                    text={`${t('статтю')}${modalText}`}
                    onConfirm={handleDeleteConfirm}
                />
            )}
        </VStack>
    );
});
