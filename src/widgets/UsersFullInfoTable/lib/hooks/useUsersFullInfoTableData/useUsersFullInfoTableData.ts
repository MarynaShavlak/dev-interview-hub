import { useState } from 'react';
import { UsersTableInfo } from '../../../model/types/usersTableInfo';
import { CommonFilterType } from '../../../model/types/types';
import { useUsersFullInfoTableColumns } from '../useUsersFullInfoTableColumns/useUsersFullInfoTableColumns';
import { useGetHeaderOptionsWithTranslation } from '@/widgets/UserArticlesTable';

interface UsersFullInfoTableDataProps {
    data: UsersTableInfo[];
    deleteRow: (rowIndex: string) => void;
    editRow: (rowIndex: string) => void;
}

export const useUsersFullInfoTableData = (
    props: UsersFullInfoTableDataProps,
) => {
    const { data, deleteRow, editRow } = props;
    const [columnFilters, setColumnFilters] = useState<CommonFilterType>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const headerOptionsMapping = useGetHeaderOptionsWithTranslation(data);
    const columns = useUsersFullInfoTableColumns({ deleteRow, editRow });
};
