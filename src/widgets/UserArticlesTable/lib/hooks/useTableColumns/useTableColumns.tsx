import { useTranslation } from 'react-i18next';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { UserArticlesTableInfo } from '../../../model/types/userArticlesTableInfo';
import {
    createStaticTextColumn,
    useCreateActionColumn,
} from '@/features/Table';
import { useTitleColumnWidth } from '../useTitleColumnWidth/useTitleColumnWidth';
import { FIXED_COLUMNS_WIDTH } from '../../../model/consts/fixedColumnsWidth';

interface useTableColumnProps {
    deleteRow: (rowIndex: string) => void;
    editRow: (rowIndex: string) => void;
}

const createUserTextCol = createStaticTextColumn<UserArticlesTableInfo>();

export const useTableColumns = (props: useTableColumnProps) => {
    const { t } = useTranslation('articleDetails');
    const { deleteRow, editRow } = props;
    const columnHelper = createColumnHelper<UserArticlesTableInfo>();
    const actionColumn = useCreateActionColumn<UserArticlesTableInfo>(
        deleteRow,
        editRow,
        FIXED_COLUMNS_WIDTH.action,
    );
    const titleColumnWidth = useTitleColumnWidth();

    return useMemo(() => {
        return [
            columnHelper.accessor(
                'title',
                createUserTextCol({
                    id: t('Заголовок статті'),
                    size: titleColumnWidth,
                    sortable: true,
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
            columnHelper.accessor(
                'views',
                createUserTextCol({
                    id: t('Перегляди'),
                    size: FIXED_COLUMNS_WIDTH.views,
                    sortable: true,
                }),
            ),
            columnHelper.accessor(
                'commentsQuantity',
                createUserTextCol({
                    id: t('Коментарі'),
                    size: FIXED_COLUMNS_WIDTH.commentsQuantity,
                    sortable: true,
                }),
            ),
            columnHelper.accessor(
                'averageRating',
                createUserTextCol({
                    id: t('Середній рейтинг'),
                    size: FIXED_COLUMNS_WIDTH.averageRating,
                    sortable: true,
                    filterable: true,
                }),
            ),
            actionColumn,
        ];
    }, [actionColumn, columnHelper, t, titleColumnWidth]);
};
