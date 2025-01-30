import { createColumnHelper } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/common/Stack';
import DeleteIcon from '@/shared/assets/icons/delete.svg';
import EditIcon from '@/shared/assets/icons/edit.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { UserArticlesTableInfo } from '../../../../model/types/userArticlesTableInfo';
import { FIXED_COLUMNS_WIDTH } from '../../../../model/consts/fixedColumnsWidth';

const columnHelper = createColumnHelper<UserArticlesTableInfo>();

export const useCreateActionColumn = (
    deleteRow: (id: string) => void,
    editRow: (id: string) => void,
) => {
    const { t } = useTranslation('articleDetails');
    return columnHelper.display({
        id: 'action',
        header: () => t('Дія'),
        size: FIXED_COLUMNS_WIDTH.action,
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
