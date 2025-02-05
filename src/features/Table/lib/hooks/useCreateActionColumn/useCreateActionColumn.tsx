import { useTranslation } from 'react-i18next';
import { createColumnHelper } from '@tanstack/react-table';
import { HStack } from '@/shared/ui/common/Stack';
import DeleteIcon from '@/shared/assets/icons/delete.svg';
import EditIcon from '@/shared/assets/icons/edit.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';

export const useCreateActionColumn = <T extends { id: string }>(
    deleteRow: (id: string) => void,
    editRow: (id: string) => void,
    width?: number,
) => {
    const { t } = useTranslation('articleDetails');
    const columnHelper = createColumnHelper<T>();
    return columnHelper.display({
        id: 'action',
        header: () => t('Дія'),
        size: width || 50,
        cell: ({ row }) => (
            <HStack justify="center" gap="8">
                <Icon
                    Svg={DeleteIcon}
                    width={18}
                    variant="error"
                    clickable
                    onClick={() => deleteRow(row.original.id)}
                />
                <Icon
                    Svg={EditIcon}
                    width={18}
                    clickable
                    onClick={() => editRow(row.original.id)}
                />
            </HStack>
        ),
    });
};
