import { useState } from 'react';
import { UsersTableInfo } from '../../../model/types/usersTableInfo';

import { useUsersFullInfoTableColumns } from '../useUsersFullInfoTableColumns/useUsersFullInfoTableColumns';
import { useGetHeaderOptionsWithTranslation } from '../useGetHeaderOptionsWithTranslation/useGetHeaderOptionsWithTranslation';
import { CommonFilterType } from '@/features/Table';
import { UserRole } from '@/entities/User';

interface UsersFullInfoTableDataProps {
    data: UsersTableInfo[];
    deleteRow?: (rowIndex: string) => void;
    editRow: (rowIndex: string) => void;
    isEditRoleMode: boolean;
    updateRow: (rowId: string, columnId: string, value: UserRole) => void;
}

export const useUsersFullInfoTableData = (
    props: UsersFullInfoTableDataProps,
) => {
    const { data, deleteRow, editRow, isEditRoleMode, updateRow } = props;

    const [columnFilters, setColumnFilters] = useState<CommonFilterType>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const headerOptionsMapping = useGetHeaderOptionsWithTranslation(data);

    const columns = useUsersFullInfoTableColumns({
        editRow,
        isEditRoleMode,
        updateRow,
    });

    return {
        columns,
        headerOptionsMapping,
        globalFilter,
        setGlobalFilter,
        columnFilters,
        setColumnFilters,
    };
};
