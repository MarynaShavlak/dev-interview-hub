import { useState } from 'react';
import { UsersTableInfo } from '../../../model/types/usersTableInfo';

import { useUsersFullInfoTableColumns } from '../useUsersFullInfoTableColumns/useUsersFullInfoTableColumns';
import { useGetHeaderOptionsWithTranslation } from '../useGetHeaderOptionsWithTranslation/useGetHeaderOptionsWithTranslation';
import { CommonFilterType } from '@/features/Table';

interface UsersFullInfoTableDataProps {
    data: UsersTableInfo[];
    deleteRow?: (rowIndex: string) => void;
    editRow: (rowIndex: string) => void;
}

export const useUsersFullInfoTableData = (
    props: UsersFullInfoTableDataProps,
) => {
    const { data, deleteRow, editRow } = props;

    const [columnFilters, setColumnFilters] = useState<CommonFilterType>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const headerOptionsMapping = useGetHeaderOptionsWithTranslation(data);

    const columns = useUsersFullInfoTableColumns({
        editRow,
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
