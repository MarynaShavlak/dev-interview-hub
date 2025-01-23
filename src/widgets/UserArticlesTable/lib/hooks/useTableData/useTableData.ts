import { useState } from 'react';
import { CommonFilterType } from '../../../model/types/types';
import { useGetHeaderOptionsWithTranslation } from '../useGetHeaderOptionsWithTranslation/useGetHeaderOptionsWithTranslation';
import { useTableColumns } from '../useTableColumns/useTableColumns';
import { UserArticlesTableInfo } from '../../../model/types/userArticlesTableInfo';

export const useTableData = (data: UserArticlesTableInfo[]) => {
    const [columnFilters, setColumnFilters] = useState<CommonFilterType>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const headerOptionsMapping = useGetHeaderOptionsWithTranslation(data);
    const columns = useTableColumns();

    return {
        columns,
        headerOptionsMapping,
        globalFilter,
        setGlobalFilter,
        columnFilters,
        setColumnFilters,
    };
};
