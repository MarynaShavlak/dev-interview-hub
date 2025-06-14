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
import { Vocabulary } from '@/entities/Vocabulary';

interface useTableColumnProps {
    deleteRow: (rowIndex: string) => void;
    editRow: (rowIndex: string) => void;
}

export const useUserVocabularyTableColumns = (props: useTableColumnProps) => {
    const { t } = useTranslation('english');
    const { deleteRow, editRow } = props;
    const createUserTextCol = createStaticTextColumn<Vocabulary>();
    const columnHelper = createColumnHelper<Vocabulary>();
    const actionColumn = useCreateActionColumn<Vocabulary>({
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
                'text',
                createUserTextCol({
                    id: t('Ідіома'),
                    size: titleColumnWidth,
                    sortable: true,
                    link: true,
                }),
            ),
            columnHelper.accessor(
                'meaning',
                createUserTextCol({
                    id: t('Пояснення'),
                    size: FIXED_COLUMNS_WIDTH.meaning,
                    sortable: true,
                }),
            ),
            columnHelper.accessor(
                'translation',
                createUserTextCol({
                    id: t('Переклад'),
                    size: FIXED_COLUMNS_WIDTH.translation,
                    sortable: true,
                    filterable: true,
                }),
            ),

            actionColumn,
        ];
    }, [actionColumn, columnHelper, createUserTextCol, t, titleColumnWidth]);
};
