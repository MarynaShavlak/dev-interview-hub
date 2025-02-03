import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import cls from '../../../ui/UsersFullInfoTable/UsersFullInfoTable.module.scss';
import { USER_ROLE_OPTIONS } from '../../../ui/data';
import { UsersTableInfo } from '../../../model/types/usersTableInfo';

import { createEditableColumn } from '../../helpers/columnCreators/createEditableColumn/createEditableColumn';
import {
    createOptionColumn,
    createImageColumn,
    createStaticTextColumn,
    useCreateActionColumn,
} from '@/features/Table';

import { FIXED_COLUMNS_WIDTH } from '../../../model/consts/fixedColumnsWidth';

interface useUsersFullInfoTableColumnsProps {
    deleteRow: (rowIndex: string) => void;
    editRow: (rowIndex: string) => void;
}

const columnHelper = createColumnHelper<UsersTableInfo>();

const createUserTextCol = createStaticTextColumn<UsersTableInfo>();
const createUserEditableCol = createEditableColumn<UsersTableInfo>();
const createUserOptionCol = createOptionColumn<UsersTableInfo>();
const createUserAvatarCol = createImageColumn<UsersTableInfo>();

export const useUsersFullInfoTableColumns = (
    props: useUsersFullInfoTableColumnsProps,
) => {
    const { t } = useTranslation('profile');
    const { deleteRow, editRow } = props;
    const actionColumn = useCreateActionColumn(
        deleteRow,
        editRow,
        FIXED_COLUMNS_WIDTH.action,
    );

    return useMemo(() => {
        return [
            columnHelper.accessor(
                'avatar',
                createUserAvatarCol({
                    id: t('Аватар'),
                    size: FIXED_COLUMNS_WIDTH.avatar,
                    className: cls.tableAvatar,
                }),
            ),
            columnHelper.accessor(
                'username',
                createUserEditableCol({
                    id: t("Ім'я користувача"),
                    size: FIXED_COLUMNS_WIDTH.username,
                }),
            ),
            columnHelper.accessor(
                'email',
                createUserEditableCol({
                    id: t('Email'),
                    size: FIXED_COLUMNS_WIDTH.email,
                }),
            ),
            columnHelper.accessor(
                'firstname',
                createUserEditableCol({
                    id: t("Ім'я"),
                    size: FIXED_COLUMNS_WIDTH.firstname,
                }),
            ),
            columnHelper.accessor(
                'lastname',
                createUserEditableCol({
                    id: t('Прізвище'),
                    size: FIXED_COLUMNS_WIDTH.lastname,
                }),
            ),

            columnHelper.accessor(
                'age',
                createUserTextCol({
                    id: t('Вік'),
                    size: FIXED_COLUMNS_WIDTH.age,
                    sortable: true,
                }),
            ),
            columnHelper.accessor(
                'city',
                createUserEditableCol({
                    id: t('Місто'),
                    size: FIXED_COLUMNS_WIDTH.city,
                    sortable: false,
                }),
            ),
            columnHelper.accessor(
                'country',
                createUserOptionCol({
                    id: t('Країна'),
                    size: FIXED_COLUMNS_WIDTH.country,
                    options: ['Ukraine', 'Poland', 'Germany'],
                    sortable: false,
                }),
            ),

            columnHelper.accessor(
                'articlesQuantity',
                createUserTextCol({
                    id: t('Кількість статей'),
                    size: FIXED_COLUMNS_WIDTH.articlesQuantity,
                    sortable: true,
                }),
            ),

            columnHelper.accessor(
                'features',
                createUserTextCol({ id: t('Доступні фічі'), size: 200 }),
            ),
            columnHelper.accessor(
                'role',
                createUserOptionCol({
                    id: t('Роль'),
                    size: FIXED_COLUMNS_WIDTH.role,
                    options: USER_ROLE_OPTIONS,
                    sortable: false,
                }),
            ),
            actionColumn,
        ];
    }, [actionColumn, t]);
};
