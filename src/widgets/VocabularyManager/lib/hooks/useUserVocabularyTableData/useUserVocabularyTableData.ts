import { useState } from 'react';
import { useGetHeaderOptionsWithTranslation } from '../useGetHeaderOptionsWithTranslation/useGetHeaderOptionsWithTranslation';
import { useUserVocabularyTableColumns } from '../useUserVocabularyTableColumns/useUserVocabularyTableColumns';

import { CommonFilterType } from '@/features/Table';
import { Vocabulary } from '@/entities/Vocabulary';

interface UserVocabularyTableDataProps {
    data: Vocabulary[];
    deleteRow: (rowIndex: string) => void;
    editRow: (rowIndex: string) => void;
}

export const useUserVocabularyTableData = (
    props: UserVocabularyTableDataProps,
) => {
    const { data, deleteRow, editRow } = props;

    const [columnFilters, setColumnFilters] = useState<CommonFilterType>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const headerOptionsMapping = useGetHeaderOptionsWithTranslation(data);
    const columns = useUserVocabularyTableColumns({
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
