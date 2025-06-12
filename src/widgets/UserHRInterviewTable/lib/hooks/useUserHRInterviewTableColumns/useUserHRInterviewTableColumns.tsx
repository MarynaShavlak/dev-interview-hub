import { useTranslation } from 'react-i18next';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';

import {
    createStaticTextColumn,
    useCreateActionColumn,
    useFlexColumnWidth,
} from '@/features/Table';
import {
    FIXED_COLUMNS_WIDTH,
    MINIMUM_TITLE_WIDTH,
} from '../../../model/consts/fixedColumnsWidth';
import { HRInterviewQA } from '@/entities/HRInterviewQA';

interface useTableColumnProps {
    deleteRow: (rowIndex: string) => void;
    editRow: (rowIndex: string) => void;
}

export const useUserHRInterviewTableColumns = (props: useTableColumnProps) => {
    const { t } = useTranslation('articleDetails');
    const { deleteRow, editRow } = props;
    const createUserTextCol = createStaticTextColumn<HRInterviewQA>();
    const columnHelper = createColumnHelper<HRInterviewQA>();
    const actionColumn = useCreateActionColumn<HRInterviewQA>({
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
                'category',
                createUserTextCol({
                    id: t('Категорії'),
                    size: FIXED_COLUMNS_WIDTH.categories,
                    sortable: true,
                    filterable: true,
                }),
            ),

            actionColumn,
        ];
    }, [actionColumn, columnHelper, createUserTextCol, t, titleColumnWidth]);
};
