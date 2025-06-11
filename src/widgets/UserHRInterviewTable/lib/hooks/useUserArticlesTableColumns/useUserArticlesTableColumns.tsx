import { useTranslation } from 'react-i18next';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { UserArticlesTableInfo } from '../../../model/types/userArticlesTableInfo';
import {
    createStaticTextColumn,
    useCreateActionColumn,
    useFlexColumnWidth,
} from '@/features/Table';
import {
    FIXED_COLUMNS_WIDTH,
    MINIMUM_TITLE_WIDTH,
} from '../../../model/consts/fixedColumnsWidth';

interface useTableColumnProps {
    deleteRow: (rowIndex: string) => void;
    editRow: (rowIndex: string) => void;
    navigateToArticle: (id: string) => void;
}

export const useUserArticlesTableColumns = (props: useTableColumnProps) => {
    const { t } = useTranslation('articleDetails');
    const { deleteRow, editRow, navigateToArticle } = props;
    const createUserTextCol = createStaticTextColumn<UserArticlesTableInfo>();
    const columnHelper = createColumnHelper<UserArticlesTableInfo>();
    const actionColumn = useCreateActionColumn<UserArticlesTableInfo>({
        deleteRow,
        editRow,
        width: FIXED_COLUMNS_WIDTH.action,
    });
    const titleColumnWidth = useFlexColumnWidth(
        FIXED_COLUMNS_WIDTH,
        MINIMUM_TITLE_WIDTH,
    );

    return useMemo(() => {
        return [
            columnHelper.accessor(
                'title',
                createUserTextCol({
                    id: t('Заголовок статті'),
                    size: titleColumnWidth,
                    sortable: true,
                    link: true,
                    navigateTo: navigateToArticle,
                }),
            ),
            columnHelper.accessor(
                'createdAt',
                createUserTextCol({
                    id: t('Дата створення'),
                    size: FIXED_COLUMNS_WIDTH.createdAt,
                    sortable: true,
                }),
            ),
            columnHelper.accessor(
                'categories',
                createUserTextCol({
                    id: t('Категорії'),
                    size: FIXED_COLUMNS_WIDTH.categories,
                    sortable: true,
                    filterable: true,
                }),
            ),

            actionColumn,
        ];
    }, [
        actionColumn,
        columnHelper,
        createUserTextCol,
        navigateToArticle,
        t,
        titleColumnWidth,
    ]);
};
