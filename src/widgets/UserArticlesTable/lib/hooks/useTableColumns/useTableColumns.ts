import { useTranslation } from 'react-i18next';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { UserArticlesTableInfo } from '../../../model/types/userArticlesTableInfo';
import { createStaticTextColumn } from '../../helpers/columnCreators/createStaticColumn/createStaticTextColumn';

const columnHelper = createColumnHelper<UserArticlesTableInfo>();

const createUserTextCol = createStaticTextColumn<UserArticlesTableInfo>();
export const useTableColumns = () => {
    const { t } = useTranslation('articleDetails');

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
        ];
    }, [t]);
};
