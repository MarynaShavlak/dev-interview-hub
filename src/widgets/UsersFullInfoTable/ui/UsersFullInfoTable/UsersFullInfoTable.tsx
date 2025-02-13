import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@/shared/ui/common/Box';

import cls from './UsersFullInfoTable.module.scss';
import {
    TableHeader,
    TablePagination,
    TableRow,
    EmptyTableState,
} from '@/features/Table';

import { UsersTableInfo } from '../../model/types/usersTableInfo';
import { VStack } from '@/shared/ui/common/Stack';
import { useUsersFullInfoTableData } from '../../lib/hooks/useUsersFullInfoTableData/useUsersFullInfoTableData';
import { Each } from '@/shared/lib/components/Each/Each';

import { useManageUsersFullInfoTableRow } from '../../lib/hooks/useManageUsersFullInfoTableRow/useManageUsersFullInfoTableRow';
import { LoadingTableSkeleton } from '../LoadingTableSkeleton/LoadingTableSkeleton';
import { TableActionBar } from '../TableActionBar/TableActionBar';
import { useUsersFullInfoTableConfig } from '../../lib/hooks/useUsersFullInfoTableConfig/useUsersFullInfoTableConfig';
import { toggleFeatures } from '@/shared/lib/features';

export const UsersFullInfoTable = memo(() => {
    const { t } = useTranslation('admin');

    const [isEditRoleMode, setIsEditRoleMode] = useState(false);
    const toggleEditRoleMode = useCallback(() => {
        setIsEditRoleMode((prev) => !prev);
    }, []);

    const { handleEditRow, isLoading, data, handleUpdateRow } =
        useManageUsersFullInfoTableRow();

    const {
        columns,
        headerOptionsMapping,
        globalFilter,
        setGlobalFilter,
        columnFilters,
        setColumnFilters,
    } = useUsersFullInfoTableData({
        data,
        isEditRoleMode,
        editRow: handleEditRow,
        updateRow: handleUpdateRow,
    });

    const table = useUsersFullInfoTableConfig({
        data,
        columns,
        globalFilter,
        columnFilters,
    });
    const isFilteredEmpty = table.getRowModel().rows.length === 0;

    if (isLoading) {
        return <LoadingTableSkeleton />;
    }
    if (data.length === 0) {
        return (
            <EmptyTableState
                message={t('Не зареєстровано жодного користувача')}
            />
        );
    }

    const tableClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.tableRedesigned,
        off: () => cls.tableDeprecated,
    });

    return (
        <VStack gap="16">
            <TableActionBar
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                isEditRoleMode={isEditRoleMode}
                toggleEditRoleMode={toggleEditRoleMode}
                isToggleBtnShown={!isFilteredEmpty}
            />

            {isFilteredEmpty ? (
                <EmptyTableState
                    message={t('Не знайдено користувачів за Вашим запитом')}
                />
            ) : (
                <VStack gap="16" className={cls.tableWrap}>
                    <Box className={tableClass}>
                        <TableHeader<UsersTableInfo>
                            headerGroups={table.getHeaderGroups()}
                            setColumnFilters={setColumnFilters}
                            headerOptionsMapping={headerOptionsMapping}
                            columnFilters={columnFilters}
                            withResizer
                        />

                        <Each
                            of={table.getRowModel().rows}
                            render={(row) => (
                                <TableRow key={row.id} row={row} />
                            )}
                        />
                    </Box>
                    <TablePagination table={table} />
                </VStack>
            )}
        </VStack>
    );
});
