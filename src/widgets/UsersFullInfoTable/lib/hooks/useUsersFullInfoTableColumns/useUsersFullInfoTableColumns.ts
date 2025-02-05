import { useTranslation } from 'react-i18next';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import cls from '../../../ui/UsersFullInfoTable/UsersFullInfoTable.module.scss';
import { USER_ROLE_OPTIONS } from '../../../ui/data';
import { UsersTableInfo } from '../../../model/types/usersTableInfo';

import {
    createEditableColumn,
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

export const useUsersFullInfoTableColumns = (
    props: useUsersFullInfoTableColumnsProps,
) => {
    const { t } = useTranslation('profile');

    const createUserTextCol = createStaticTextColumn<UsersTableInfo>();
    const createUserEditableCol = createEditableColumn<UsersTableInfo>();
    const createUserOptionCol = createOptionColumn<UsersTableInfo>();
    const createUserAvatarCol = createImageColumn<UsersTableInfo>();
    const { deleteRow, editRow } = props;
    const columnHelper = createColumnHelper<UsersTableInfo>();
    const actionColumn = useCreateActionColumn<UsersTableInfo>(
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
            //
            // columnHelper.accessor(
            //     'age',
            //     createUserTextCol({
            //         id: t('Вік'),
            //         size: FIXED_COLUMNS_WIDTH.age,
            //         sortable: true,
            //     }),
            // ),
            // columnHelper.accessor(
            //     'city',
            //     createUserEditableCol({
            //         id: t('Місто'),
            //         size: FIXED_COLUMNS_WIDTH.city,
            //         sortable: false,
            //     }),
            // ),
            // columnHelper.accessor(
            //     'country',
            //     createUserOptionCol({
            //         id: t('Країна'),
            //         size: FIXED_COLUMNS_WIDTH.country,
            //         options: translatedOptions,
            //         sortable: false,
            //     }),
            // ),

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
                createUserTextCol({
                    id: t('Доступні фічі'),
                    size: FIXED_COLUMNS_WIDTH.features,
                }),
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
    }, [
        actionColumn,
        columnHelper,
        createUserAvatarCol,
        createUserEditableCol,
        createUserOptionCol,
        createUserTextCol,
        t,
    ]);
};
