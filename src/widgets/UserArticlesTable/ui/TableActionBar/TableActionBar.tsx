import React, { memo } from 'react';

import { AddNewArticleButton } from '@/shared/ui/common/AddNewArticleButton';
import { HStack } from '@/shared/ui/common/Stack';
import { SearchInput } from '@/features/Table';

interface TableActionBarProps {
    globalFilter: string;
    setGlobalFilter: (filterValue: string) => void;
}

export const TableActionBar = memo((props: TableActionBarProps) => {
    return (
        <HStack justify="between" max>
            <SearchInput {...props} />
            <AddNewArticleButton />
        </HStack>
    );
});
