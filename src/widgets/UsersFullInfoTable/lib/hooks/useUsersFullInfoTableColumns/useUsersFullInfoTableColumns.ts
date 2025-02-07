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
    useFlexColumnWidth,
} from '@/features/Table';

import {
    FIXED_COLUMNS_WIDTH,
    MAX_COLUMN_CHARACTERS,
    MINIMUM_EMAIL_WIDTH,
} from '../../../model/consts/fixedColumnsWidth';
import { useSidebarCollapseState } from '../useSidebarCollapseState/useSidebarCollapseState';

interface useUsersFullInfoTableColumnsProps {
    deleteRow?: (rowIndex: string) => void;
    editRow: (rowIndex: string) => void;
    isEditRoleMode: boolean;
}

export const useUsersFullInfoTableColumns = (
    props: useUsersFullInfoTableColumnsProps,
) => {
    const { t } = useTranslation('profile');
    const { deleteRow, editRow, isEditRoleMode } = props;
    const isCollapsed = useSidebarCollapseState();

    const createUserTextCol = createStaticTextColumn<UsersTableInfo>();
    const createUserTrimmedTextCol = createStaticTextColumn<UsersTableInfo>(
        MAX_COLUMN_CHARACTERS,
    );
    const createUserEditableCol = createEditableColumn<UsersTableInfo>();
    const createUserOptionCol =
        createOptionColumn<UsersTableInfo>(isEditRoleMode);
    const createUserAvatarCol = createImageColumn<UsersTableInfo>();

    const columnHelper = createColumnHelper<UsersTableInfo>();
    const actionColumn = useCreateActionColumn<UsersTableInfo>({
        deleteRow,
        editRow,
        width: FIXED_COLUMNS_WIDTH.action,
    });

    const emailColumnWidth = useFlexColumnWidth(
        FIXED_COLUMNS_WIDTH,
        MINIMUM_EMAIL_WIDTH,
    );

    const usernameCol = isCollapsed
        ? createUserTextCol({
              id: t("Ім'я користувача"),
              size: FIXED_COLUMNS_WIDTH.username,
              filterable: true,
          })
        : createUserTrimmedTextCol({
              id: t("Ім'я користувача"),
              size: FIXED_COLUMNS_WIDTH.username,
              filterable: true,
          });

    const emailCol = isCollapsed
        ? createUserTextCol({
              id: t('Email'),
              size: emailColumnWidth,
              filterable: true,
          })
        : createUserTrimmedTextCol({
              id: t('Email'),
              size: emailColumnWidth,
              filterable: true,
          });

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
            columnHelper.accessor('username', usernameCol),
            columnHelper.accessor('email', emailCol),
            columnHelper.accessor(
                'firstname',
                createUserTextCol({
                    id: t("Ім'я"),
                    size: FIXED_COLUMNS_WIDTH.firstname,
                }),
            ),
            columnHelper.accessor(
                'lastname',
                createUserTextCol({
                    id: t('Прізвище'),
                    size: FIXED_COLUMNS_WIDTH.lastname,
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
