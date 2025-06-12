import { useState } from 'react';
import { useGetHeaderOptionsWithTranslation } from '../useGetHeaderOptionsWithTranslation/useGetHeaderOptionsWithTranslation';
import { useUserHRInterviewTableColumns } from '../useUserHRInterviewTableColumns/useUserHRInterviewTableColumns';

import { CommonFilterType } from '@/features/Table';
import { HRInterviewQA } from '@/entities/HRInterviewQA';

interface UserHRInterviewTableDataProps {
    data: HRInterviewQA[];
    deleteRow: (rowIndex: string) => void;
    editRow: (rowIndex: string) => void;
}

export const useUserHRInterviewTableData = (
    props: UserHRInterviewTableDataProps,
) => {
    const { data, deleteRow, editRow } = props;

    const [columnFilters, setColumnFilters] = useState<CommonFilterType>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const headerOptionsMapping = useGetHeaderOptionsWithTranslation(data);
    const columns = useUserHRInterviewTableColumns({
        deleteRow,
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
