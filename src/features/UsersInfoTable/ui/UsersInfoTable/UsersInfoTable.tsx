import React from 'react';
import { useUsersFullData } from '../../lib/hooks/useUsersFullData';
import { generateTableColumnsData } from '../../lib/helpers/generateTableColumnsData/generateTableColumnsData';
import { Table } from '@/shared/ui/common/Table/Table';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { VStack } from '@/shared/ui/common/Stack';

export const UsersInfoTable = () => {
    const { users, isLoading } = useUsersFullData();
    const columns = generateTableColumnsData(users);
    if (isLoading) {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<Skeleton width="100%" height={400} />}
                off={<SkeletonDeprecated width="100%" height={400} />}
            />
        );
    }
    const d = [...users, ...users, ...users];
    const c = generateTableColumnsData(d);

    return (
        <VStack>
            <Table data={d} columns={c} />
        </VStack>
    );
};
