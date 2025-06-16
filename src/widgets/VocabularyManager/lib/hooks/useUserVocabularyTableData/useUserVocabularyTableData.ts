import { useState } from 'react';
import { useGetHeaderOptionsWithTranslation } from '../useGetHeaderOptionsWithTranslation/useGetHeaderOptionsWithTranslation';
import { useUserVocabularyTableColumns } from '../useUserVocabularyTableColumns/useUserVocabularyTableColumns';

import { CommonFilterType } from '@/features/Table';
import { Vocabulary } from '@/entities/Vocabulary';

interface UserVocabularyTableDataProps {
    data: Vocabulary[];
    deleteRow: (rowIndex: string) => void;
}

export const useUserVocabularyTableData = (
    props: UserVocabularyTableDataProps,
) => {
    const { data, deleteRow } = props;

    const [columnFilters, setColumnFilters] = useState<CommonFilterType>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const headerOptionsMapping = useGetHeaderOptionsWithTranslation(data);
    const columns = useUserVocabularyTableColumns({
        deleteRow,
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
