import { useTranslation } from 'react-i18next';
import { CellContext, createColumnHelper } from '@tanstack/react-table';
import { ActionCellsList } from '../../../ui/ActionCellsList/ActionCellsList';

interface UseCreateActionColumnParams {
    editRow: (id: string) => void;
    deleteRow?: (id: string) => void;
    width?: number;
}

export const useCreateActionColumn = <T extends { id: string }>(
    params: UseCreateActionColumnParams,
) => {
    const { width, editRow, deleteRow } = params;
    const { t } = useTranslation('articleDetails');
    const columnHelper = createColumnHelper<T>();
    return columnHelper.display({
        id: 'action',
        header: () => t('Дія'),
        size: width || 50,
        cell: (props: CellContext<T, any>) =>
            ActionCellsList({
                ...props,
                editRow,
                deleteRow,
            }),
    });
};
