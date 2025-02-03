import { useState } from 'react';

import { useGetHeaderOptionsWithTranslation } from '../useGetHeaderOptionsWithTranslation/useGetHeaderOptionsWithTranslation';
import { useTableColumns } from '../useTableColumns/useTableColumns';
import { UserArticlesTableInfo } from '../../../model/types/userArticlesTableInfo';
import { CommonFilterType } from '@/features/Table';

interface UserArticlesTableDataProps {
    data: UserArticlesTableInfo[];
    deleteRow: (rowIndex: string) => void;
    editRow: (rowIndex: string) => void;
}

export const useUserArticlesTableData = (props: UserArticlesTableDataProps) => {
    const { data, deleteRow, editRow } = props;

    const [columnFilters, setColumnFilters] = useState<CommonFilterType>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const headerOptionsMapping = useGetHeaderOptionsWithTranslation(data);
    const columns = useTableColumns({ deleteRow, editRow });

    return {
        columns,
        headerOptionsMapping,
        globalFilter,
        setGlobalFilter,
        columnFilters,
        setColumnFilters,
    };
};
