import { useState } from 'react';
import { CommonFilterType } from '../../../model/types/types';
import { useGetHeaderOptionsWithTranslation } from '../useGetHeaderOptionsWithTranslation/useGetHeaderOptionsWithTranslation';
import { useTableColumns } from '../useTableColumns/useTableColumns';
import { UserArticlesTableInfo } from '../../../model/types/userArticlesTableInfo';

interface UserArticlesTableDataProps {
    data: UserArticlesTableInfo[];
    deleteRow: (rowIndex: string) => void;
}

export const useTableData = (props: UserArticlesTableDataProps) => {
    const { data, deleteRow } = props;

    const [columnFilters, setColumnFilters] = useState<CommonFilterType>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const headerOptionsMapping = useGetHeaderOptionsWithTranslation(data);
    const columns = useTableColumns({ deleteRow });

    return {
        columns,
        headerOptionsMapping,
        globalFilter,
        setGlobalFilter,
        columnFilters,
        setColumnFilters,
    };
};
