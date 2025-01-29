import { useTranslation } from 'react-i18next';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { UserArticlesTableInfo } from '../../../model/types/userArticlesTableInfo';
import { createStaticTextColumn } from '../../helpers/columnCreators/createStaticColumn/createStaticTextColumn';
import { HStack } from '@/shared/ui/common/Stack';
import DeleteIcon from '@/shared/assets/icons/delete.svg';
import EditIcon from '@/shared/assets/icons/edit.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';

const columnHelper = createColumnHelper<UserArticlesTableInfo>();

interface useTableColumnProps {
    deleteRow: (rowIndex: string) => void;
}

const createUserTextCol = createStaticTextColumn<UserArticlesTableInfo>();

export const useTableColumns = (props: useTableColumnProps) => {
    const { t } = useTranslation('articleDetails');
    const { deleteRow } = props;

    return useMemo(() => {
        return [
            columnHelper.accessor(
                'title',
                createUserTextCol({
                    id: t('Заголовок статті'),
                    size: 230,
                    sortable: true,
                }),
            ),
            columnHelper.accessor(
                'createdAt',
                createUserTextCol({
                    id: t('Дата створення'),
                    size: 110,
                    sortable: true,
                }),
            ),
            columnHelper.accessor(
                'categories',
                createUserTextCol({
                    id: t('Категорії'),

                    size: 185,
                    sortable: true,
                    filterable: true,
                }),
            ),
            columnHelper.accessor(
                'views',
                createUserTextCol({
                    id: t('Перегляди'),
                    size: 110,
                    sortable: true,
                }),
            ),
            columnHelper.accessor(
                'commentsQuantity',
                createUserTextCol({
                    id: t('Коментарі'),
                    size: 110,
                    sortable: true,
                }),
            ),
            columnHelper.accessor(
                'averageRating',
                createUserTextCol({
                    id: t('Середній рейтинг'),
                    size: 110,
                    sortable: true,
                    filterable: true,
                }),
            ),
            columnHelper.display({
                id: 'action',
                header: () => t('Дія'),
                cell: ({ row }) => (
                    <HStack justify="center" gap="16">
                        <Icon
                            Svg={DeleteIcon}
                            width={18}
                            variant="error"
                            clickable
                            onClick={() => deleteRow(row.original.id)}
                        />
                        <Icon Svg={EditIcon} width={18} />
                    </HStack>
                ),
            }),
        ];
    }, [t]);
};
